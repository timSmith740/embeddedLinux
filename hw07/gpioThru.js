#!/usr/bin/env node
var b = require('bonescript');
var button1 = 'P9_28';
var LED1 = 'P9_27';

var state1 = b.HIGH;

b.pinMode(button1, b.INPUT, 7, 'pulldown');
b.pinMode(LED1, b.OUTPUT);

b.attachInterrupt(button1, true,
	b.CHANGE, flash1);
	
console.log("Ready");
	
function flash1(x){
	if (x.attached === true){
        return;
    }
	b.digitalWrite(LED1, state1);
	if(state1 === b.HIGH) {
		state1 = b.LOW;
	} else {
		state1 = b.HIGH
	}
}