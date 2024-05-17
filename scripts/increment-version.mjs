import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const oldVersion = packageJson.version;
const versionArray = oldVersion.split('.');
versionArray[versionArray.length - 1] = (
  parseInt(versionArray[versionArray.length - 1]) + 1
).toString();
const newVersion = versionArray.join('.');
packageJson.version = newVersion;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log(
  `Incremented version in package.json from ${oldVersion} to ${newVersion}`
);
