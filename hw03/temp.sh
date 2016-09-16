#!/bin/bash
temp=$(i2cget -y 2 0x48 0)
echo $temp
temp2=$((($temp)*9))
temp3=$((($temp2)/5))
temp4=$((($temp3)+32))
echo $temp4