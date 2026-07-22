#!/usr/bin/env node
// Sync src/version.ts from package.json (runs as part of scripts/build).
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const { version } = require(path.join(root, 'package.json'));
if (!version || typeof version !== 'string') throw new Error('package.json version missing');

const versionFile = path.join(root, 'src', 'version.ts');
const contents = fs.readFileSync(versionFile, 'utf8');
const updated = contents.replace(/(export const VERSION = ')([^']*)(')/, `$1${version}$3`);
if (updated !== contents) {
  fs.writeFileSync(versionFile, updated);
  console.log(`sync-version: src/version.ts -> ${version}`);
}
