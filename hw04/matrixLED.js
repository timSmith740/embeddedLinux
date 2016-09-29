    var socket;
    var firstconnect = true,
        i2cNum  = "0x70",
	dispred = [];
	dispgreen =[];
	var color = 0;
	var green = 0;
	var red = 1;
	var yellow = 2;

// Create a matrix of LEDs inside the <table> tags.
var matrixData;
for(var j=7; j>=0; j--) {
	matrixData += '<tr>';
	for(var i=0; i<8; i++) {
	    matrixData += '<td><div class="LED" id="id'+i+'_'+j+
		'" onclick="LEDclick('+i+','+j+')">'+
		i+','+j+'</div></td>';
	    }
	matrixData += '</tr>';
}
$('#matrixLED').append(matrixData);

// The slider controls the overall brightness
$("#slider1").slider({min:0, max:15, slide: function(event, ui) {
	socket.emit("i2cset",  {i2cNum: i2cNum, i: ui.value+0xe0, disp: 1});
    }});

// Send one column when LED is clicked.
function LEDclick(i, j) {
//	alert(i+","+j+" clicked");
    // checking which color has been selected
    if (color === green){
        dispgreen[i] ^= 0x1<<j;
          socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i, 
			     disp: '0x'+dispgreen[i].toString(16)}); 
    }
    if (color === red){
        dispred[i] ^= 0x1<<j;
        socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i+1, 
			     disp: '0x'+dispred[i].toString(16)});
    }
    if (color === yellow){
        dispred[i] ^= 0x1<<j;
        socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i+1, 
			     disp: '0x'+dispred[i].toString(16)});
		dispgreen[i] ^= 0x1<<j;
          socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i, 
			     disp: '0x'+dispgreen[i].toString(16)}); 
    }
//	socket.emit('i2c', i2cNum);
    // Toggle bit on display
    // Changing webpage for appropriate color change
    if (color === green){
        if(dispgreen[i]>>j&0x1 === 1) {
            $('#id'+i+'_'+j).addClass('green');
        } else {
            $('#id'+i+'_'+j).removeClass('green');
        }
    }
    if (color === red){
        if(dispred[i]>>j&0x1 === 1) {
            $('#id'+i+'_'+j).addClass('red');
        } else {
            $('#id'+i+'_'+j).removeClass('red');
        }
    }
    if (color === yellow){
        if(dispred[i]>>j&0x1 === 1) {
            $('#id'+i+'_'+j).addClass('yellow');
        } else {
            $('#id'+i+'_'+j).removeClass('yellow');
        }
    }
}

    function connect() {
      if(firstconnect) {
        socket = io.connect(null);

        // See https://github.com/LearnBoost/socket.io/wiki/Exposed-events
        // for Exposed events
        socket.on('message', function(data)
            { status_update("Received: message " + data);});
        socket.on('connect', function()
            { status_update("Connected to Server"); });
        socket.on('disconnect', function()
            { status_update("Disconnected from Server"); });
        socket.on('reconnect', function()
            { status_update("Reconnected to Server"); });
        socket.on('reconnecting', function( nextRetry )
            { status_update("Reconnecting in " + nextRetry/1000 + " s"); });
        socket.on('reconnect_failed', function()
            { message("Reconnect Failed"); });

        socket.on('matrix',  matrix);

    socket.emit('i2cset', {i2cNum: i2cNum, i: 0x21, disp: 1}); // Start oscillator (p10)
    socket.emit('i2cset', {i2cNum: i2cNum, i: 0x81, disp: 1}); // Disp on, blink off (p11)
    socket.emit('i2cset', {i2cNum: i2cNum, i: 0xe7, disp: 1}); // Full brightness (page 15)
    /*
	i2c_smbus_write_byte(file, 0x21); 
	i2c_smbus_write_byte(file, 0x81);
	i2c_smbus_write_byte(file, 0xe7);
    */
        // Read display for initial image.  Store in disp[]
        socket.emit("matrix", i2cNum);

        firstconnect = false;
      }
      else {
        socket.socket.reconnect();
      }
    }

    function disconnect() {
      socket.disconnect();
    }

    // When new data arrives, convert it and display it.
    // data is a string of 16 values, each a pair of hex digits.
    function matrix(data) {
        var i, j;
        disp = [];
        //        status_update("i2c: " + data);
        // Make data an array, each entry is a pair of digits
        data = data.split(" ");
        //        status_update("data: " + data);
        // Every other pair of digits are Green. The others are red.
        // Ignore the red.
        // Convert from hex.
        for (i = 0; i < data.length; i += 2) {
            disp[i / 2] = parseInt(data[i], 16);
        }
        //        status_update("disp: " + disp);
        // i cycles through each column
        for (i = 0; i < disp.length; i++) {
            // j cycles through each bit
            for (j = 0; j < 8; j++) {
                if (((disp[i] >> j) & 0x1) === 1) {
                    $('#id' + i + '_' + j).addClass('on');
                } else {
                    $('#id' + i + '_' + j).removeClass('on');
                }
            }
        }
    }

    function status_update(txt){
	$('#status').html(txt);
    }

    function updateFromLED(){
      socket.emit("matrix", i2cNum);    
    }

connect();

$(function () {
    // setup control widget
    $("#i2cNum").val(i2cNum).change(function () {
        i2cNum = $(this).val();
    });
});

/* Sets the color to be activated */
function setRed(){
    color = red;
}
function setGreen(){
    color = green;
}
function setYellow(){
    color = yellow;
}

/* Clears the matrix */
function erase(){
    for (i = 0; i < 8; i++) {
        // j cycles through each bit
        dispred[i] = 0;
        dispgreen[i] = 0;
        socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i+1, 
			     disp: '0x'+dispred[i].toString(16)});
        socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i, 
			     disp: '0x'+dispgreen[i].toString(16)}); 
        for (j = 0; j < 8; j++) {
            $('#id' + i + '_' + j).removeClass('red');
            $('#id' + i + '_' + j).removeClass('green');
            $('#id' + i + '_' + j).removeClass('yellow');
        }
    }
}

/* Displaying a A on the matrix */
function A(){
    erase();
    var arrayx = [1,1,1,1,1,2,2,3,3,4,4,5,5,5,5,5];
    var arrayy = [5,4,3,2,1,6,3,3,6,6,3,5,4,3,2,1];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }
}

/*Displaying a B on the matrix*/
function B(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,5];
    var arrayy = [6,5,4,3,2,1,0,6,3,0,6,3,0,6,3,0,5,4,2,1];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }
}

/*Displaying a C on the matrix*/
function C(){
    erase();
    var arrayx = [1,1,1,1,1,2,2,3,3,4,4,5,5];
    var arrayy = [5,4,3,2,1,6,0,6,0,6,0,5,1];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}

/*Displaying a D on the matrix*/
function D(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,2,3,3,4,4,5,5,5,5,5];
    var arrayy = [6,5,4,3,2,1,0,6,0,6,0,6,0,5,4,3,2,1];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}

/*Displaying a E on the matrix*/
function E(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,2,2,3,3,3,4,4,4,5,5];
    var arrayy = [6,5,4,3,2,1,0,6,3,0,6,3,0,6,3,0,6,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}

/*Displaying a F on the matrix*/
function F(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,2,3,3,4,4,5];
    var arrayy = [6,5,4,3,2,1,0,6,3,6,3,6,3,6];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}

/*Displaying a G on the matrix*/
function G(){
    erase();
    var arrayx = [1,1,1,1,1,2,2,3,3,3,4,4,4,5,5,5];
    var arrayy = [5,4,3,2,1,6,0,6,2,0,6,2,0,5,2,1];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}

/*Displaying a H on the matrix*/
function H(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,3,4,5,5,5,5,5,5,5];
    var arrayy = [6,5,4,3,2,1,0,3,3,3,6,5,4,3,2,1,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}

/*Displaying a I on the matrix*/
function I(){
    erase();
    var arrayx = [1,1,2,2,3,3,3,3,3,3,3,4,4,5,5];
    var arrayy = [6,0,6,0,6,5,4,3,2,1,0,6,0,6,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a J on the matrix*/
function J(){
    erase();
    var arrayx = [1,1,2,3,4,5,5,5,5,5,5];
    var arrayy = [2,1,0,0,0,1,2,3,4,5,6];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a K on the matrix*/
function K(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,3,3,4,4,5,5];
    var arrayy = [6,5,4,3,2,1,0,3,4,2,5,1,6,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a L on the matrix*/
function L(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,3,4,5];
    var arrayy = [6,5,4,3,2,1,0,0,0,0,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a M on the matrix*/
function M(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,3,4,5,5,5,5,5,5,5];
    var arrayy = [6,5,4,3,2,1,0,5,4,5,6,5,4,3,2,1,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a N on the matrix*/
function N(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,3,4,5,5,5,5,5,5,5];
    var arrayy = [6,5,4,3,2,1,0,4,3,2,6,5,4,3,2,1,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a O on the matrix*/
function O(){
    erase();
    var arrayx = [1,2,3,4,5,5,5,5,5,4,3,2,1,1,1,1];
    var arrayy = [5,6,6,6,5,4,3,2,1,0,0,0,1,2,3,4];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a P on the matrix*/
function P(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,3,4,5,5,5,4,3,2];
    var arrayy = [0,1,2,3,4,5,6,6,6,6,5,4,3,2,2,2];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a Q on the matrix*/
function Q(){
    erase();
    var arrayx = [1,1,1,1,1,2,3,4,5,5,5,5,5,4,3,2,3,4,5];
    var arrayy = [5,4,3,2,1,0,0,0,1,2,3,4,5,6,6,6,2,1,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a R on the matrix*/
function R(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,3,4,5,5,5,4,3,2,5,5];
    var arrayy = [0,1,2,3,4,5,6,6,6,6,5,4,3,2,2,2,1,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a S on the matrix*/
function S(){
    erase();
    var arrayx = [5,4,3,2,1,1,2,3,4,5,5,4,3,2,1];
    var arrayy = [5,6,6,6,5,4,3,3,3,2,1,0,0,0,1];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a T on the matrix*/
function T(){
    erase();
    var arrayx = [1,2,3,4,5,3,3,3,3,3,3];
    var arrayy = [6,6,6,6,6,5,4,3,2,1,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a U on the matrix*/
function U(){
    erase();
    var arrayx = [1,1,1,1,1,1,2,3,4,5,5,5,5,5,5];
    var arrayy = [6,5,4,3,2,1,0,0,0,1,2,3,4,5,6];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a V on the matrix*/
function V(){
    erase();
    var arrayx = [1,1,1,1,1,2,3,4,5,5,5,5,5];
    var arrayy = [6,5,4,3,2,1,0,1,2,3,4,5,6];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a W on the matrix*/
function W(){
    erase();
    var arrayx = [1,1,1,1,1,1,1,2,3,4,5,5,5,5,5,5,5];
    var arrayy = [6,5,4,3,2,1,0,1,2,1,0,1,2,3,4,5,6];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a X on the matrix*/
function X(){
    erase();
    var arrayx = [1,1,2,3,4,5,5,1,1,2,4,5,5];
    var arrayy = [6,5,4,3,2,1,0,0,1,2,4,5,6];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a Y on the matrix*/
function Y(){
    erase();
    var arrayx = [1,1,2,5,5,4,3,3,3,3];
    var arrayy = [6,5,4,6,5,4,3,2,1,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}
/*Displaying a W on the matrix*/
function Z(){
    erase();
    var arrayx = [1,2,3,4,5,5,4,3,2,1,1,2,3,4,5];
    var arrayy = [6,6,6,6,6,5,4,3,2,1,0,0,0,0,0];
    for(var i=0; i<arrayx.length; i++){
        LEDclick(arrayx[i], arrayy[i]);
    }

}