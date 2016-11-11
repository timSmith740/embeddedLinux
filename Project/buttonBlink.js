//Joseph Militello
//9/9/16
//Simple button and blink program
var socket;
var firstconnect = true;
var faceValues = [];
var queryTracker = 0;


//320 240
function buttonMustache(){
	var facePicX = $(window).width()/2;
	var width = faceValues[2]*0.9;
	var height = faceValues[3]*0.5;
	var x = facePicX-(160-faceValues[0])+faceValues[2]*0.05;
	var y =$('.picture').offset().top+faceValues[1]+((faceValues[3])/2)-(height/6);
	console.log(x.toString()+"px");
	$('.location').append('<IMG  class="remove funFace" SRC="mustache.png" WIDTH='+width+' HEIGHT='+height+'>');
	$('.funFace').css("left",x.toString()+"px");
	$('.funFace').css("top",y.toString()+"px");
}

function buttonHat(){
	var facePicX = $(window).width()/2;
	var width = faceValues[2];
	var height = faceValues[3]*0.8;
	var x = facePicX-(160-faceValues[0]);
	var y =$('.picture').offset().top+faceValues[1]-(height/8)*7;
	console.log(x.toString()+"px");
	$('.location').append('<IMG  class="remove funFace2" SRC="hat.png" WIDTH='+width+' HEIGHT='+height+'>');
	$('.funFace2').css("left",x.toString()+"px");
	$('.funFace2').css("top",y.toString()+"px");
}

function buttonSunglasses(){
	var facePicX = $(window).width()/2;
	var width = faceValues[2]*0.8;
	var height = faceValues[3]*0.25;
	var x = facePicX-(160-faceValues[0])+faceValues[2]*0.1;
	var y =$('.picture').offset().top+faceValues[1]+((faceValues[3])/2)-height;
	console.log(x.toString()+"px");
	$('.location').append('<IMG  class="remove funFace3" SRC="sunglasses.png" WIDTH='+width+' HEIGHT='+height+'>');
	$('.funFace3').css("left",x.toString()+"px");
	$('.funFace3').css("top",y.toString()+"px");
}

function takePicture(){
	console.log("taking picture");
	socket.emit('picture');
}

function status_update(txt){
	$('#status').html(txt);
    }

function connect() {
      if(firstconnect) {
        socket = io.connect('http://192.168.7.2:9090');

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
        socket.on('send', function (data) {
        	interpret(data);
        	});

        firstconnect = false;
      }
      else {
        firstconnect = true;
        connect();
      }
    }
    
function interpret(data){
	$('.remove').remove();
	$('.location').append('<IMG  class="remove picture" SRC="./face.png?foo='+queryTracker+'"WIDTH=320 HEIGHT=240> ');
	queryTracker++;
	faceValues = [];
	var temp = "";
	for(var i = 0; i < data.length; i++){
		if(data[i] === "\n"){
			faceValues.push(parseInt(temp));
			temp = "";
		} else{
			temp += data[i];
		}
	}
	console.log(faceValues);
}

window.onload = connect();




