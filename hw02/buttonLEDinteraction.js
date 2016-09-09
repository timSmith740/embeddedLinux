#!/usr/bin/env node
var b = require('bonescript');
var button1 = 'P9_11';
var button2 = 'P9_13';
var button3 = 'P9_16';
var button4 = 'P9_17';
var LED1 = 'P9_21'
var LED2 = 'P9_23'
var LED3 = 'P9_26'
var LED4 = 'P9_27'
var state1 = b.HIGH
var state2 = b.HIGH
var state3 = b.HIGH
var state4 = b.HIGH
var one = 1;
var two = 2;
var three = 3;
var four = 4;

b.pinMode(button1, b.INPUT, 7, 'pulldown');
b.pinMode(button2, b.INPUT, 7, 'pulldown');
b.pinMode(button3, b.INPUT, 7, 'pulldown');
b.pinMode(button4, b.INPUT, 7, 'pulldown');
b.pinMode(LED1, b.OUTPUT);
b.pinMode(LED2, b.OUTPUT);
b.pinMode(LED3, b.OUTPUT);
b.pinMode(LED4, b.OUTPUT);

b.attachInterrupt(button1, true,
	b.CHANGE, flash1);
b.attachInterrupt(button2, true,
	b.CHANGE, flash2);
b.attachInterrupt(button3, true,
	b.CHANGE, flash3);
b.attachInterrupt(button4, true,
	b.CHANGE, flash4);

function flash1(){
	b.digitalWrite(LED1, state1);
	if(state1 === b.HIGH) {
		state1 = b.LOW;
	} else {
		state1 = b.HIGH
	}
}
function flash2(){
	b.digitalWrite(LED2, state2);
	if(state2 === b.HIGH) {
		state2 = b.LOW;
	} else {
		state2 = b.HIGH
	}
}
function flash3(){
	b.digitalWrite(LED3, state3);
	if(state3 === b.HIGH) {
		state3 = b.LOW;
	} else {
		state3 = b.HIGH
	}
}
function flash4(){
	b.digitalWrite(LED4, state4);
	if(state4 === b.HIGH) {
		state4 = b.LOW;
	} else {
		state4 = b.HIGH
	}
}