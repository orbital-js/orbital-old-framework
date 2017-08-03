#!/bin/bash

npm install
for i in packages/* ; do
  if [ -d "$i" ]; then
    cd packages/$(basename "$i")
    npm install
    cd ../../
  fi
done