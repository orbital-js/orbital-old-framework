import * as async from 'async';
import * as fs from 'fs';
import * as moment from 'moment';
import * as npm from 'npm';
import * as path from 'path';
import * as shell from 'shelljs';
const config = require('../../package.json');

let projectHome: string;
npm.load(() => {
  npm.commands.show(['@orbital/core'], (err: Error, old: any) => {
    if (err) {
      throw err;
    } else {
      detectRelease(err, Object.keys(old)[0]);
    }
  });
});

function detectRelease(err: Error, old: string) {
  console.log(old);

  const version = config.version;
  console.log(version);

  let is_release: boolean;
  let versioncode: string;
  if (old !== version) {
    is_release = true;
    versioncode = config.version;
  } else {
    is_release = false;
    versioncode = 'nightly';
  }
  projectHome = path.join(process.cwd(), 'dist/packages/');

  let dirs = fs.readdirSync(projectHome);
  (<any>async).eachSeries(dirs, async (directory: any, callback: any) => {
    await cycleOverPackages(is_release, versioncode, directory);
    callback();
  });
}

async function cycleOverPackages(release: boolean, version: string, directory: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let pack = path.join(projectHome, directory);
    let stat = fs.statSync(pack);
    if (stat && stat.isDirectory()) {
      process.chdir(pack);
      console.log(pack);

      fs.readFile('package.json', 'utf-8', (err, data) => {

        if (release) {
          console.log('RELEASE DETECTED');

          const res = data.replace('0.0.0-PLACEHOLDER', version);

          fs.writeFile('package.json', res, 'utf-8', () => {
            shell.exec('npm publish --access public');
            resolve();
          });

        } else {

          console.log('NIGHTLY DETECTED');
          const datecode = moment().format('YYYYMMDDhhmmss');
          let ver = `${config.version}-${datecode}`;


          const res = data.replace('0.0.0-PLACEHOLDER', ver);
          fs.writeFile('package.json', res, () => {
            shell.exec('npm publish --tag nightly --access public');
            resolve();
          });
        }
      });
    } else {
      resolve();
    }
  });
}