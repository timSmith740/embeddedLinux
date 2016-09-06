/* Etch a sketch
	By: Tim Smith */

/* Includes */
#include <stdio.h>

/* Definitions */
#define boardSize 6
char left  = 'l';
char right ='r';
char up    ='u';
char down  ='d';
char quit  = 'q';
char clear = 'c';
char board[boardSize][boardSize];

/* Prototypes */
void printBoard(char board[boardSize][boardSize]);

void main(int size){
	char direction;
	int  x_pos = 0;
	int  y_pos = 0;

	printBoard(board);
	while(1) {
		direction = getchar();
		if (direction == left) {
			if (x_pos != 0){
				x_pos--;
				board[x_pos][y_pos] = 'X';
				printBoard(board);
			}
		} else if (direction == right) {
			if (x_pos != boardSize - 1){
				x_pos++;
				board[x_pos][y_pos] = 'X';
				printBoard(board);
			}
		}
		else if (direction == up) {
			if (y_pos != 0){
				y_pos--;
				board[x_pos][y_pos] = 'X';
				printBoard(board);
			}
		}
		else if (direction == down) {
			if (y_pos != boardSize - 1){
				y_pos++;
				board[x_pos][y_pos] = 'X';
				printBoard(board);
			}
		}
		else if (direction == clear) {
			printf("clear!\n");
		}
		else if (direction == quit) {
			printf("quit!\n");
			break;
		}
	}	
}

/* A function that prints the etch a sketch board */
void printBoard(char board[boardSize][boardSize]){
	int x =0;
	int y =0;
	for (y = 0; y<boardSize; y++){
		for (x = 0; x<boardSize; x++){
			if (board[x][y] == 'X'){
				printf("%c", board[x][y]);
			} else {
				printf("0");
			}
		}
		printf("\n");
	}
}