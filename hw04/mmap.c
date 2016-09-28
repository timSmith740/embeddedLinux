#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include"beaglebone_gpio.h"

int main(int argc, char *argv[]){
    volatile void *gpio_addr3;
    volatile void *gpio_addr1;
    volatile unsigned int *gpio_setdataout_addr;
    volatile unsigned int *gpio_cleardataout_addr;
    volatile unsigned int *gpio_datain3;
    volatile unsigned int *gpio_datain1;
    int fd = open("/dev/mem", O_RDWR);
    int i =0;
    gpio_addr1 = mmap(0, GPIO1_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO1_START_ADDR);
    gpio_addr3 = mmap(0, GPIO3_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO3_START_ADDR);
    
    gpio_setdataout_addr = gpio_addr1 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr = gpio_addr1 + GPIO_CLEARDATAOUT;
    gpio_datain1            = gpio_addr1 + GPIO_DATAIN;
    gpio_datain3            = gpio_addr3 + GPIO_DATAIN;
    
    *gpio_setdataout_addr = USR3;
    sleep(2);
    *gpio_cleardataout_addr = USR3;
    sleep(1);
    *gpio_setdataout_addr = USR2;
    sleep(2);
    *gpio_cleardataout_addr = USR2;
    sleep(1);
    printf("Entering loop\n");
    while(1){
        if(*gpio_datain1 & GPIO_19) {
            printf("GPIO 19 is pressed\n");
            printf("Going to exit now\n");
            break;
    	}
    	if(*gpio_datain3 & GPIO_16) {
            printf("GPIO 16 is pressed\n");
    	}
    }
    
    close(fd);
}