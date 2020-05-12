#!/bin/bash

# Sample usage: sh naive.sh localhost:8080/password

set -xeu

ADDR=$1

while true
do
    for n in $(shuf -i 0-10)
    do
        N=$n
        while [ $N -gt 0 ]
        do
            curl $ADDR
            let "N--"
        done
        break
    done
    sleep 0.5
done
