#!/bin/bash

docker compose down --rmi all
docker compose up --force-recreate -d