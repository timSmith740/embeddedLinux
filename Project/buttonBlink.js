//Joseph Militello
//9/9/16
//Simple button and blink program
var socket;
var firstconnect = true;

//320 240
function buttonAdd(){
	var facePicX = $(window).width()/2;
	//var facePicY = $(window).height();
	var x = facePicX-50;
	var y =210;
	console.log(x.toString()+"px");
	$('.location').append('<IMG  class="funFace" SRC="mustache.png" WIDTH=100 HEIGHT=100>');
	$('.funFace').css("left",x.toString()+"px");
	$('.funFace').css("top",y.toString()+"px");
}

function buttonHat(){
	var facePicX = $(window).width()/2;
	//var facePicY = $(window).height();
	var x = facePicX-75;
	var y =110;
	console.log(x.toString()+"px");
	$('.location').append('<IMG  class="funFace2" SRC="hat.png" WIDTH=150 HEIGHT=100>');
	$('.funFace2').css("left",x.toString()+"px");
	$('.funFace2').css("top",y.toString()+"px");
}

function buttonSunglasses(){
	var facePicX = $(window).width()/2;
	//var facePicY = $(window).height();
	var x = facePicX-75;
	var y =200;
	console.log(x.toString()+"px");
	$('.location').append('<IMG  class="funFace3" SRC="sunglasses.png" WIDTH=150 HEIGHT=50>');
	$('.funFace3').css("left",x.toString()+"px");
	$('.funFace3').css("top",y.toString()+"px");
}

function takePicture(){
	console.log("taking picture");
	socket.emit('picture');
}

// function picture(){
// 	var y=200;
// 	$('.picture').css("top", y.toString()+"px");
// }


function hello(){
	console.log('Hello World');
}
hello();

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
            console.log("test");

    /*
	i2c_smbus_write_byte(file, 0x21); 
	i2c_smbus_write_byte(file, 0x81);
	i2c_smbus_write_byte(file, 0xe7);
    */
        // Read display for initial image.  Store in disp[]

        firstconnect = false;
      }
      else {
        firstconnect = true;
        connect();
      }
    }

window.onload = connect();



