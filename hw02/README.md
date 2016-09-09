# embeddedLinux

For the buttons and LED interaction, my buttons are wired up to pins 11,13,16, and 17.
Pin 15 did not seem to work for me. It was not being registered.
My LEDs are hooked up to pins 21,23,26,27.
You can run the buttonLEDinteraction.js as a bonescript file, where a button controls a corrseponding LED. 

For my updated etch-a-sketch, you can change the size of the board by changing the variable width in the file.
It will print off some unimportant boards, but it will clear the board once set up is complete.

The up button is attached to pin 11. The right button attached to pin 13. The left button attached to pin 17. The down button attached to pin 15.
A clear button is attached to pin 21. 

You can run the etchasketch.js as a bonescript file.

For both of these cases, I was not able to run them with the ./(name here). I had to run the files as node (name of file)