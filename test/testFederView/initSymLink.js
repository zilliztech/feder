import fs from 'fs';

// feder.js
try {
  fs.accessSync('lib');
} catch (e) {
  fs.symlinkSync('../../dist', 'lib', 'dir');
}

// data
try {
  fs.accessSync('data');
} catch (e) {
  fs.symlinkSync('../output', 'data', 'dir');
}
