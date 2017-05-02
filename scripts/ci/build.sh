#!/usr/bin/env bash
node --max-old-space-size=3000 node_modules/.bin/tsc -p packages/core/tsconfig-build.json