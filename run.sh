#!/bin/bash

npm install
gnome-terminal -e "bash -c 'npx prisma studio; exec bash'" &
gnome-terminal -e "bash -c 'npm run dev; exec bash'" &
gnome-terminal -e "bash -c 'node ./src/app.ts; exec bash'" &

#necessary to run:
#sudo apt install ubuntu-gnome-desktop
