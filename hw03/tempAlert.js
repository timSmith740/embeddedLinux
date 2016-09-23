#!/usr/bin/env node
/* Variable declarations */
var b = require('bonescript');
var i2c = require('i2c');
var alert1 = 'P9_12';
var alert2 = 'P9_14';
var temp1 = new i2c(0x48, {device: '/dev/i2c-2'});
var temp2 = new i2c(0x49, {device: '/dev/i2c-2'});
var temp = 0;

b.pinMode(alert1, b.INPUT, 7, 'disabled');
b.pinMode(alert2, b.INPUT, 7, 'disabled');

b.attachInterrupt(alert1, true,
	b.FALLING, alertOne);
b.attachInterrupt(alert2, true,
	b.FALLING, alertTwo);
	
function alertOne(x){
    if (x.attached === true){
        return;
    }
    console.log("alert1");
    temp = temp1.readByte(function(err, data){});
    console.log(((temp*9)/5)+32);
}
function alertTwo(x){
    if (x.attached === true){
        return;
    }
    console.log("alert2");
    temp = temp2.readByte(function(err){});
    console.log(((temp*9)/5)+32);
}