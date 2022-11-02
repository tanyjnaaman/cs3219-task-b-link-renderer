#!/bin/bash
cd /home/ubuntu/cs3219-task-b-link-renderer/
sudo docker stop $(docker ps -a -q)
sudo docker rm $(docker ps -a -q)
sudo docker-compose up --build backend