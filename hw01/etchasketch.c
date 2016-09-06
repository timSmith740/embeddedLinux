/* Etch a sketch
	By: Tim Smith */

/* Includes */
#include <stdio.h>

/* Definitions */
#define left 'l';
#define right 'r';
#define up 'u';
#define down 'd';
#define quit 'q';

int boardSize = 0;

void main(int size){
	char  direction;

	boardSize = size;

	direction = getchar();
	printf("%c\n", direction);
}