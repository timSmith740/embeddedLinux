#!/usr/bin/env node
var b = require('bonescript');
var button1 = 'P9_11';
var button2 = 'P9_13';
var button3 = 'P9_16';
var button4 = 'P9_17';
var button5 = 'P9_21';
var xPos = 0;
var yPos = 0;
var width = 5;
var board = [];

for(i = 0; i < width; i++){
    board[i]=[];
    for (j =0; j < width; j++){
        board[i][j]=0;
    }
}

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
	b.FALLING, clear);

function updateLeft(){
    console.log("left");
    if (xPos !== 0){
        xPos--;
        board[yPos][xPos] = 'X';
        updateBoard();
    } else {
        xPos = 0;
    }
}

function updateRight(){
    console.log("right");
    if (xPos !== width){
        xPos++;
        board[yPos][xPos] = 'X';
        updateBoard();
    } else {
        xPos = 0;
    }
}

function updateUp(){
    console.log("up");
    if (yPos !== 0){
        yPos--;
        board[yPos][xPos] = 'X';
        updateBoard();
    } else {
        yPos = 0;
    }
}

function updateDown(){
    console.log("down");
    if (yPos !== width){
        yPos++;
        board[yPos][xPos] = 'X';
        updateBoard();
    } else {
        yPos = 0;
    }
}

function updateBoard(){
    for(i = 0; i < width; i++){
        console.log(board[i]);
    }
}

function clear(){
    for(i = 0; i < width; i++){
        for(j = 0; j < width; j++){
            board[i][j] = 0;
        }
    }
    xPos = 0;
    yPos = 0;
    updateBoard();
}