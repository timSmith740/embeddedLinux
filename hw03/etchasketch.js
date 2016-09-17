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
var button6 = 'P9_18';
var color = 0;
var xPos = 0;
var yPos = 0;
var width = 8;
var zero = 0x00;
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
b.pinMode(button6, b.INPUT, 7, 'pulldown');

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
b.attachInterrupt(button6, true,
	b.FALLING, switchColor);

/*Function for updating board*/
function updateLeft(x){
    if (x.attached === true){
        return;
    }
    console.log("left");
    if (xPos !== 0){
        xPos--;
        updateBoard();
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
    } else {
        yPos = 0;
    }
}

function updateBoard(){
    if (color === 0){
        placeGreen();
    }
    if (color === 1){
        placeRed();
    }
    if (color === 2){
        placeYellow();
    }
    wire.writeBytes(0x00,board, function(err){});
}
/*Function for clearing the board */
function reset(x){
    if (x.attached === true){
        return;
    }
    wire.writeBytes(0x00,clearBoard,function(err){});
    for(i=0; i<width; i++){
        board[i*2] = clearBoard[i*2];
        board[i*2+1] = clearBoard[i*2];
    }
    xPos = 0;
    yPos = 0;
}
function switchColor(x){
    if (x.attached === true){
        return;
    }
    color++;
    if (color > 2){
        color = 0;
    }
}
function placeRed(){
    if (yPos === 0){
        board[xPos*2] = board[xPos*2] | zero;
        board[xPos*2+1] = board[xPos*2+1] | one;
    }
    else if (yPos === 1){
        board[xPos*2] = board[xPos*2] | zero;
        board[xPos*2+1] = board[xPos*2+1] | two;
    }
    else if (yPos === 2){
        board[xPos*2] = board[xPos*2] | zero;
        board[xPos*2+1] = board[xPos*2+1] | three;
    }
    else if (yPos === 3){
        board[xPos*2] = board[xPos*2] | zero;
        board[xPos*2+1] = board[xPos*2+1] | four;
    }
    else if (yPos === 4){
        board[xPos*2] = board[xPos*2] | zero;
        board[xPos*2+1] = board[xPos*2+1] | five;
    }
    else if (yPos === 5){
        board[xPos*2] = board[xPos*2] | zero;
        board[xPos*2+1] = board[xPos*2+1] | six;
    }
    else if (yPos === 6){
        board[xPos*2] = board[xPos*2] | zero;
        board[xPos*2+1] = board[xPos*2+1] | seven;
    }
    else if (yPos === 7){
        board[xPos*2] = board[xPos*2] | zero;
        board[xPos*2+1] = board[xPos*2+1] | eight;
    }
}
function placeGreen(){
    if (yPos === 0){
        board[xPos*2+1] = board[xPos*2+1] | zero;
        board[xPos*2] = board[xPos*2] | one;
    }
    else if (yPos === 1){
        board[xPos*2] = board[xPos*2] | two;
        board[xPos*2+1] = board[xPos*2+1] | zero;
    }
    else if (yPos === 2){
        board[xPos*2] = board[xPos*2] | three;
        board[xPos*2+1] = board[xPos*2+1] | zero;
    }
    else if (yPos === 3){
        board[xPos*2] = board[xPos*2] | four;
        board[xPos*2+1] = board[xPos*2+1] | zero;
    }
    else if (yPos === 4){
        board[xPos*2] = board[xPos*2] | five;
        board[xPos*2+1] = board[xPos*2+1] | zero;
    }
    else if (yPos === 5){
        board[xPos*2] = board[xPos*2] | six;
        board[xPos*2+1] = board[xPos*2+1] | zero;
    }
    else if (yPos === 6){
        board[xPos*2] = board[xPos*2] | seven;
        board[xPos*2+1] = board[xPos*2+1] | zero;
    }
    else if (yPos === 7){
        board[xPos*2] = board[xPos*2] | eight;
        board[xPos*2+1] = board[xPos*2+1] | zero;
    }
}
function placeYellow(){
    if (yPos === 0){
        board[xPos*2+1] = board[xPos*2+1] | one;
        board[xPos*2] = board[xPos*2] | one;
    }
    else if (yPos === 1){
        board[xPos*2] = board[xPos*2] | two;
        board[xPos*2+1] = board[xPos*2+1] | two;
    }
    else if (yPos === 2){
        board[xPos*2] = board[xPos*2] | three;
        board[xPos*2+1] = board[xPos*2+1] | three;
    }
    else if (yPos === 3){
        board[xPos*2] = board[xPos*2] | four;
        board[xPos*2+1] = board[xPos*2+1] | four;
    }
    else if (yPos === 4){
        board[xPos*2] = board[xPos*2] | five;
        board[xPos*2+1] = board[xPos*2+1] | five;
    }
    else if (yPos === 5){
        board[xPos*2] = board[xPos*2] | six;
        board[xPos*2+1] = board[xPos*2+1] | six;
    }
    else if (yPos === 6){
        board[xPos*2] = board[xPos*2] | seven;
        board[xPos*2+1] = board[xPos*2+1] | seven;
    }
    else if (yPos === 7){
        board[xPos*2] = board[xPos*2] | eight;
        board[xPos*2+1] = board[xPos*2+1] | eight;
    }
}