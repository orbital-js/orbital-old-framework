import * as cp from 'cp';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as shell from 'shelljs';
import * as ts from 'typescript';

let projectHome = path.join(process.cwd(), 'packages/');
let directories = fs.readdirSync(projectHome);

rimraf(path.join(process.cwd(), 'dist'), (err) => {
    fs.mkdirSync(path.join(process.cwd(), 'dist'));
    fs.mkdirSync(path.join(process.cwd(), 'dist/packages'));

    directories.forEach(directory => {
        let pack = path.join(projectHome, directory);
        let stat = fs.statSync(pack);
        if (stat && stat.isDirectory()) {

            let dest = path.join(process.cwd(), 'dist/packages', directory);
            fs.mkdirSync(dest);

            shell.exec(`node_modules/.bin/tsc -p ${path.join(pack, 'tsconfig-build.json')} --outDir ${dest}`);
            cp.sync(path.join(pack, 'package.json'), path.join(dest, 'package.json'));
            cp.sync(path.join(pack, 'package-lock.json'), path.join(dest, 'package-lock.json'));

            let readme: string = fs.readFileSync(path.join(process.cwd(), 'packages/README.md')).toString();
            readme = readme.replace(/PACKAGE_NAME/g, convertPackageName(directory));
            fs.writeFileSync(path.join(dest, 'README.md'), readme);

        }
    });
});

function convertPackageName(pack: string) {
    const arr = pack.split('-');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].substr(0, 1).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ');
}
