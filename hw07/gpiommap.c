#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include"Beaglebone_gpio.h"

int main(int argc, char *argv[]){
    volatile void *gpio_addr3;
    volatile unsigned int *gpio_setdataout_addr;
    volatile unsigned int *gpio_cleardataout_addr;
    volatile unsigned int *gpio_datain3;
    int fd = open("/dev/mem", O_RDWR);
    int i =0;
    gpio_addr3 = mmap(0, GPIO3_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO3_START_ADDR);
    
    gpio_setdataout_addr = gpio_addr3 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr = gpio_addr3 + GPIO_CLEARDATAOUT;
    gpio_datain3            = gpio_addr3 + GPIO_DATAIN;
    
    printf("Entering loop\n");
    while(1){
        if(*gpio_datain3 & GPIO_28) {
            *gpio_setdataout_addr = GPIO_27;
    	} else {
    	    *gpio_cleardataout_addr = GPIO_27;
    	}
    }
    
    close(fd);
}