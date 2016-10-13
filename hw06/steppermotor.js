#!/usr/bin/env node
var b = require('bonescript');


// Motor is attached here
var button = "P9_12";
var sensor1 = 'P9_39';
var sensor2 = 'P9_40';
var controller = ["P9_11", "P9_13", "P9_15", "P9_16"]; 
var states = [[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]];
//var statesHiTorque = [[1,1,0,0], [0,1,1,0], [0,0,1,1], [1,0,0,1]];
//var statesHalfStep = [[1,0,0,0], [1,1,0,0], [0,1,0,0], [0,1,1,0],
             //         [0,0,1,0], [0,0,1,1], [0,0,0,1], [1,0,0,1]];

var curState = 0;   // Current state
var ms = 100,       // Time between steps, in ms
    max = 20,       // Number of steps to turn before turning around
    min = 0;        // Minimum step to turn back around on

var CW  =  1,       // Clockwise
    CCW = -1,
    pos = 0,        // current position and direction
    direction = CW;
var timer;
var sensorReading1 = 0;
var sensorReading2 = 0;
var averageReading;
var minPosition = 0;
var minValue = 2;
var readingsList = [];
    
b.pinMode(button, b.INPUT, 7, 'pulldown');
b.attachInterrupt(button, true, b.FALLING, startMoving);

// Initialize motor control pins to be OUTPUTs
var i;
for(i=0; i<controller.length; i++) {
    b.pinMode(controller[i], b.OUTPUT);
}

console.log("Ready for button");
function startMoving(x){
    if (x.attached === true){
        return;
    }
    pos = 0;
// Put the motor into a known state
    updateState(states[0]);
    rotate(direction);

    timer = setInterval(move, ms);
}

// Rotate back and forth once
function move() {
    pos += direction;
    //console.log("pos: " + pos);
    sensorReading1 = b.analogRead(sensor1);
    sensorReading2 = b.analogRead(sensor2);
    averageReading = (sensorReading1 + sensorReading2) / 2;
    averageReading = ((averageReading * 18) / 10).toFixed(3);
    if (parseInt(averageReading, 10) < minValue){
        
        minPosition = pos;
        minValue = averageReading;
    }
    readingsList[pos] = averageReading;
    //console.log(averageReading);
    // Switch directions if at end.
    if (pos >= max) {
        clearInterval(timer);
        direction *= -1;
        timer = setInterval(returnToLowest, ms);
        console.log(minPosition);
        return;
        
    }
    rotate(direction);
}

function returnToLowest(){
    console.log("Returning" + pos.toString());
    rotate(direction);
    pos--;
    if (pos < minPosition){
        clearInterval(timer);
        setTimeout(trackingMode, 1000);
    }
}

function trackingMode(){
    console.log("Turing on the Beagle!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    setInterval(track, ms);
}
function track(){
    sensorReading1 = b.analogRead(sensor1) * 18 / 10;
    sensorReading2 = b.analogRead(sensor2) * 18 / 10;
    if (sensorReading1 < sensorReading2){
        direction = CW;
    } else {
        direction = CCW;
    }
    rotate(direction);
}

// This is the general rotate
function rotate(direction) {
	// console.log("rotate(%d)", direction);
    // Rotate the state acording to the direction of rotation
	curState +=  direction;
	if(curState >= states.length) {
	    curState = 0;
	} else if(curState<0) {
		    curState = states.length-1;
	}
	updateState(states[curState]);
}

// Write the current input state to the controller
function updateState(state) {
    console.log("state: " + state);
	for (i=0; i<controller.length; i++) {
		b.digitalWrite(controller[i], state[i]);
	}
}

process.on('exit', function() {
    updateState([0,0,0,0]);    // Turn motor off
});