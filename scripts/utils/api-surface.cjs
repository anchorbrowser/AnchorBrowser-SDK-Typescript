#!/usr/bin/env node
// Snapshot / verify the full public type surface of the built package.
//
// Concatenates every .d.ts file under dist/ (sorted, with file headers) into
// etc/api-surface.d.ts.snapshot. The VERSION constant is normalized so
// version bumps don't churn the snapshot.
//
//   node scripts/utils/api-surface.cjs --update   regenerate the baseline
//   node scripts/utils/api-surface.cjs --check    fail if surface drifted
//
// Requires a fresh `yarn build` (reads from dist/).

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const distDir = path.join(root, 'dist');
const snapshotPath = path.join(root, 'etc', 'api-surface.d.ts.snapshot');

function collectDtsFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'src') continue;
      out.push(...collectDtsFiles(full));
    } else if (entry.name.endsWith('.d.ts')) {
      // .d.mts files mirror .d.ts content; snapshot the .d.ts variant only.
      out.push(full);
    }
  }
  return out.sort();
}

function buildSnapshot() {
  if (!fs.existsSync(distDir)) {
    console.error('dist/ not found — run `yarn build` first.');
    process.exit(1);
  }
  const parts = [];
  for (const file of collectDtsFiles(distDir)) {
    const rel = path.relative(distDir, file);
    let content = fs.readFileSync(file, 'utf8');
    // Normalize the package version so releases don't churn the snapshot.
    content = content.replace(/VERSION = "[^"]+"/g, 'VERSION = "<version>"');
    parts.push(`// ===== ${rel} =====\n${content}`);
  }
  return parts.join('\n');
}

const mode = process.argv[2];
const snapshot = buildSnapshot();

if (mode === '--update') {
  fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
  fs.writeFileSync(snapshotPath, snapshot);
  console.log(`api-surface: baseline written to ${path.relative(root, snapshotPath)}`);
} else if (mode === '--check') {
  if (!fs.existsSync(snapshotPath)) {
    console.error('api-surface: baseline missing — run `yarn api:update` first.');
    process.exit(1);
  }
  const baseline = fs.readFileSync(snapshotPath, 'utf8');
  if (baseline === snapshot) {
    console.log('api-surface: OK — public type surface matches the baseline.');
  } else {
    const tmp = path.join(root, 'tmp', 'api-surface.actual.d.ts');
    fs.mkdirSync(path.dirname(tmp), { recursive: true });
    fs.writeFileSync(tmp, snapshot);
    console.error('api-surface: FAILED — public type surface drifted from the baseline.');
    console.error(`  diff ${path.relative(root, snapshotPath)} ${path.relative(root, tmp)}`);
    console.error('  If the change is intentional, run `yarn api:update` and commit.');
    process.exit(1);
  }
} else {
  console.error('usage: api-surface.cjs --update | --check');
  process.exit(1);
}
