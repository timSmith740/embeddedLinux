# embeddedLinux
My etchasketch.js displays on the LED matrix. There are five buttons they are hooked up to 
pins 11,13,16,17,and 21. 11,13,16,17 move the cursor and 21 will clear the screen and 
put the cursor in the upper left corner.

You can run my temp.sh file and it will read a temp101 sensor at address 0x48.

If you run my tempSetup.sh file it will prepare temp101sensor on addresses 0x48 and 0x49.
It prints the temperature after getting an alert, but it does at times stop reading.

You can run my temp006sensor.sh file and it will read and convert the temperature with the sensor on address 0x40.
Though it does not seem to be very accurate. 

==========
Comments from Prof. Mark A. Yoder
In etchasketch the if/else structures seem cumbersome.  You should be able to collasp that
into something simpler.
Code could also use some more documentation.

Grade:  10/10

