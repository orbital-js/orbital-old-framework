#!/usr/bin/env bash

OLD_VERSION=$(npm show @boat/cli version)
VERSION=$(readJsonProp "package.json" "version")

if [[OLD_VERSION != VERSION]]; then
    IS_RELEASE=true
    VERSION_NAME=$(readJsonProp "package.json" "version")
else
    IS_RELEASE=false
    VERSION_NAME="nightly"
fi

if [[IS_RELEASE == "true"]]; then
    echo "RELEASE DETECTED"
    npm publish
else
    echo "PUBLISHING NIGHTLY"
    DATE=$(date +%Y%m%d%H%M%S)
    NEW_VERSION="$VERSION-$DATE"
    npm version $NEW_VERSION
    npm publish --tag nightly
fi