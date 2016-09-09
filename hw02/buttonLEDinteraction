#!/ysr/bin/env node
var b = require('bonescript');
var button = 'P9_11';
var LED = 'P9_21'
var state = b.HIGH

b.pinMode(button, b.INPUT, 7, 'pulldown');
b.pinMode(LED, b.OUTPUT);

b.attachInterrupt(button, true,
	b.CHANGE, flash);

function flash(){
	b.digitalWrite(LED, state);
	if(state === b.HIGH) {
		state = b.LOW;
	} else {
		state = b.HIGH
	}
}