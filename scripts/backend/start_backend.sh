#!/bin/bash
cd /home/ubuntu/cs3219-task-b-link-renderer/
rm -
sudo docker stop $(sudo docker ps -a -q)
sudo docker rm $(sudo docker ps -a -q)
sudo docker-compose up --build backend