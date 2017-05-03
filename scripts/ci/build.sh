#!/usr/bin/env bash

#BUILD CORE
node --max-old-space-size=3000 node_modules/.bin/tsc -p packages/core/tsconfig-build.json
cp packages/core/package.json dist/packages/core/package.json