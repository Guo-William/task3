#!/bin/bash

export PORT=5105

cd ~/www/task3
./bin/task3 stop || true
./bin/task3 start
