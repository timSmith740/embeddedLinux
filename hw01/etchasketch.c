/* Etch a sketch
	By: Tim Smith */

/* Includes */
#include <stdio.h>

/* Definitions */
char left  = 'l';
char right ='r';
char up    ='u';
char down  ='d';
char quit  = 'q';
int boardSize = 0;

void main(int size){
	char  direction;

	boardSize = size;
	while(1) {
		direction = getchar();
		if (direction == left) {
			printf("left!\n");
		} else if (direction == right) {
			printf("right!\n");
		}
		else if (direction == up) {
			printf("up!\n");
		}
		else if (direction == down) {
			printf("down!\n");
		}
		else if (direction == quit) {
			printf("quit!\n");
			break;
		}
	}	
}