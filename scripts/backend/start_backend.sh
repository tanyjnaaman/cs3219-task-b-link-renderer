#!/bin/bash
cd /home/ubuntu/cs3219-task-b-link-renderer/
sudo docker images -aq | xargs --no-run-if-empty sudo docker rmi
sudo docker ps -aq | xargs --no-run-if-empty sudo docker stop
sudo docker ps -aq | xargs --no-run-if-empty sudo docker rm
sudo docker-compose up --build --detach backend 
