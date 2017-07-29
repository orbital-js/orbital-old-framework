#!/usr/bin/env node

const npm = require('npm');
const config = require('../../package.json');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

npm.load({}, () => {
  npm.commands.show(['@boat/core'], (err, old) => {
    detectRelease(err, old);
  });
});

function detectRelease (err, old) {
  let oldversion = Object.keys(old)[0];
  console.log(oldversion);

  const version = config.version;
  console.log(version);

  let is_release;
  let versioncode;
  if (oldversion !== version) {
    is_release = true;
    versioncode = config.version;
  } else {
    is_release = false;
    versioncode = 'nightly';
  }

  if (is_release == true) {
    console.log('RELEASE DETECTED');
    process.chdir(path.join(process.cwd(), 'dist/packages/core'));
    fs.readFile('package.json', 'utf-8', (err, data) => {
      const res = data.replace('0.0.0-PLACEHOLDER', versioncode);
      fs.writeFile('package.json', res, 'utf-8', () => {
        npm.commands.publish();
      });
    });
  } else {
    console.log('NIGHTLY DETECTED');
    const now = new Date();
    const datecode = now.getFullYear().toString() + now.getMonth().toString() + now.getDate().toString() + now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
    let ver = config.version + '-' + datecode;
    process.chdir(path.join(process.cwd(), 'dist/packages/core'));
    fs.readFile('package.json', 'utf-8', (err, data) => {
      console.log(ver);
      const res = data.replace('0.0.0-PLACEHOLDER', ver);
      fs.writeFile('package.json', res, 'utf-8', () => {
        shell.exec('npm publish --tag nightly');
      });
    });
  }
}
