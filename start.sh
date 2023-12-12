#!/bin/bash

npm run build
if [ $? -eq 0 ]; then
    npm run dev
else
    echo "Build failed, not starting the application"
fi
