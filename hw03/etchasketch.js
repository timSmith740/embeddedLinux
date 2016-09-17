#!/usr/bin/env node
/* Variable declarations */
var b = require('bonescript');
var i2c = require('i2c');
var util = require('util');
var button1 = 'P9_11';
var button2 = 'P9_13';
var button3 = 'P9_16';
var button4 = 'P9_17';
var button5 = 'P9_21';
var xPos = 0;
var yPos = 0;
var width = 8;
var one = 0x80;
var two = 0x40;
var three = 0x20;
var four = 0x10;
var five = 0x08;
var six = 0x04;
var seven = 0x02
var eight = 0x01;
var board = [0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
var clearBoard = [0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    
var wire = new i2c(0x70, {device: '/dev/i2c-2'});
wire.writeByte(0x21, function(err){});
wire.writeByte(0x81, function(err){});
wire.writeByte(0xe7, function(err){});

/* Initializing buttons */
b.pinMode(button1, b.INPUT, 7, 'pulldown');
b.pinMode(button2, b.INPUT, 7, 'pulldown');
b.pinMode(button3, b.INPUT, 7, 'pulldown');
b.pinMode(button4, b.INPUT, 7, 'pulldown');
b.pinMode(button5, b.INPUT, 7, 'pulldown');

b.attachInterrupt(button1, true,
	b.FALLING, updateUp);
b.attachInterrupt(button2, true,
	b.FALLING, updateRight);
b.attachInterrupt(button3, true,
	b.FALLING, updateDown);
b.attachInterrupt(button4, true,
	b.FALLING, updateLeft);
b.attachInterrupt(button5, true,
	b.FALLING, reset);

/*Function for updating board*/
function updateLeft(x){
    if (x.attached === true){
        return;
    }
    console.log("left");
    if (xPos !== 0){
        xPos--;
        updateBoard();
        wire.writeBytes(0x00,board, function(err){});
    } else {
        xPos = 0;
    }
}

function updateRight(x){
    if (x.attached === true){
        return;
    }
    console.log("right");
    if (xPos !== width){
        xPos++;
        updateBoard();
        wire.writeBytes(0x00,board, function(err){});
    } else {
        xPos = 0;
    }
}

function updateUp(x){
    if (x.attached === true){
        return;
    }
    console.log("up");
    if (yPos !== 0){
        yPos--;
        updateBoard();
        wire.writeBytes(0x00,board, function(err){});
    } else {
        yPos = 0;
    }
}

function updateDown(x){
    if (x.attached === true){
        return;
    }
    console.log("down");
    if (yPos !== width){
        yPos++;
        updateBoard();
        wire.writeBytes(0x00,board, function(err){});
    } else {
        yPos = 0;
    }
}

function updateBoard(){
    if (yPos === 0){
        board[xPos*2] = board[xPos*2] | one;
    }
    else if (yPos === 1){
        board[xPos*2] = board[xPos*2] | two;
    }
    else if (yPos === 2){
        board[xPos*2] = board[xPos*2] | three;
    }
    else if (yPos === 3){
        board[xPos*2] = board[xPos*2] | four;
    }
    else if (yPos === 4){
        board[xPos*2] = board[xPos*2] | five;
    }
    else if (yPos === 5){
        board[xPos*2] = board[xPos*2] | six;
    }
    else if (yPos === 6){
        board[xPos*2] = board[xPos*2] | seven;
    }
    else if (yPos === 7){
        board[xPos*2] = board[xPos*2] | eight;
    }
}
/*Function for clearing the board */
function reset(x){
    if (x.attached === true){
        return;
    }
    wire.writeBytes(0x00,clearBoard,function(err){});
    for(i=0; i<width; i++){
        board[i*2] = clearBoard[i*2];
    }
    xPos = 0;
    yPos = 0;
}