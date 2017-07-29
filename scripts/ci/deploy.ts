import * as fs from 'fs';
import * as moment from 'moment';
import * as npm from 'npm';
import * as path from 'path';
import * as shell from 'shelljs';
const config = require('../../package.json');


npm.load(() => {
  npm.commands.show(['@boat/core'], (err: Error, old: any) => {
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

  let is_release;
  let versioncode: string;
  if (old !== version) {
    is_release = true;
    versioncode = config.version;
  } else {
    is_release = false;
    versioncode = 'nightly';
  }

  cycleOverPackages(is_release, versioncode);
}

function cycleOverPackages(release: boolean, version: string) {
  let projectHome = path.join(process.cwd(), 'dist/packages/');

  fs.readdirSync(projectHome).forEach(directory => {
    let pack = path.join(projectHome, directory);
    let stat = fs.statSync(pack);
    process.chdir(pack);
    if (stat && stat.isDirectory()) {
      fs.readFile('package.json', 'utf-8', (err, data) => {

        if (release) {
          console.log('RELEASE DETECTED');

          const res = data.replace(/0.0.0-PLACEHOLDER/g, version);

          fs.writeFile('package.json', res, 'utf-8', () => {
            shell.exec('npm publish --access public');
          });

        } else {

          console.log('NIGHTLY DETECTED');
          const datecode = moment().format('YYYYMMDDhhmmss');
          let ver = `${config.version}-${datecode}`;


          const res = data.replace(/0.0.0-PLACEHOLDER/g, ver);
          fs.writeFileSync('package.json', res, 'utf-8');
          shell.exec('npm publish --tag nightly --access public');
        }
      });
    }
  });
}