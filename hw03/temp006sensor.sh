#!/bin/bash
temp=$(i2cget -y 2 0x40 1 w)
temp2=$((($temp) >> 2))
echo $temp
echo $temp2
temp3=$((($temp2)*9))
temp4=$((($temp3)/5))
temp5=$((($temp4)+32))
echo $temp4