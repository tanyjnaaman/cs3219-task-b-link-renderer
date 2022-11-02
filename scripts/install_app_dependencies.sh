#!/bin/bash
sudo pip3 install virtualenv
cd /home/ubuntu/cs3219-task-b-link-renderer
virtualenv environment
source environment/bin/activate
sudo pip3 install -r requirements.txt