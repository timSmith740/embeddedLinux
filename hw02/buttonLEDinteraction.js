#!/usr/bin/env node
var b = require('bonescript');
var button1 = 'P9_11';
var button2 = 'P9_13';
var button3 = 'P9_15';
var button4 = 'P9_17';
var LED1 = 'P9_21'
var LED2 = 'P9_23'
var LED3 = 'P9_25'
var LED4 = 'P9_27'
var state1 = b.LOW
var state2 = b.LOW
var state3 = b.LOW
var state4 = b.LOW
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
	b.CHANGE, flash, one);
b.attachInterrupt(button2, true,
	b.CHANGE, flash, two);
b.attachInterrupt(button3, true,
	b.CHANGE, flash), three;
b.attachInterrupt(button4, true,
	b.CHANGE, flash, four);

function flash(led){
	if (led === one){
		b.digitalWrite(LED1, state1);
		if(state1 === b.HIGH) {
			state1 = b.LOW;
		} else {
			state1 = b.HIGH
		}
	}
	if (led === two){
		b.digitalWrite(LED2, state2);
		if(state2 === b.HIGH) {
			state2 = b.LOW;
		} else {
			state2 = b.HIGH
		}
	}
	if (led === three){
		b.digitalWrite(LED3, state3);
		if(state3 === b.HIGH) {
			state3 = b.LOW;
		} else {
			state3 = b.HIGH
		}
	}
	if (led === four){
		b.digitalWrite(LED4, state4);
		if(state4 === b.HIGH) {
			state4 = b.LOW;
		} else {
			state4 = b.HIGH
		}
	}
}