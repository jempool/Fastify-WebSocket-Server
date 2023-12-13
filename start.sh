#!/bin/bash

echo -e "\033[0;32m\nRemoving build folder\033[0m"
rm -rf ./build

echo -e "\033[0;32m\nRunning build\033[0m"
npm run build
if [ $? -eq 0 ]; then
    echo -e "\033[0;32mRunning dev server\033[0m"
    npm run dev
else
    echo -e "\033[0;31mBuild failed, not starting the application\033[0m"
fi
