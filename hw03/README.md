# embeddedLinux
My etchasketch.js displays on the LED matrix. There are five buttons they are hooked up to 
pins 11,13,16,17,and 21. 11,13,16,17 move the cursor and 21 will clear the screen and 
put the cursor in the upper left corner.

You can run my temp.sh file and it will read a temp101 sensor at address 0x48.

If you run my tempSetup.sh file it will prepare temp101sensor on addresses 0x48 and 0x49.
It prints the temperature after getting an alert, but it does not work fully yet.