# embeddedLinux
I have written a c program called mmap.c which when compiled with turn on USR3 LED wait for 2 seconds, then turn it off.
It then turns on USR2 LED waits for 2 seconds, then turn off. It then enters a loop where by pressing a button connected
to P9_30 will print a message that it has been pressed. When you press a button connected P9_16, it will print that it was
pressed and exit the program.

I then modified gpioThru.c. If you press a button connected to P9_16 it will turn on USR3 LED.

My LED matrix.js has three buttons to change to color to red, green, or yellow. If you click on the box it will
light up in the browser and the appropriate LED in the LED matrix with the appropriate color. If you click again with
the same color on it will turn it off. 

I might try to add some more buttons to add letters to show up on the matrix.