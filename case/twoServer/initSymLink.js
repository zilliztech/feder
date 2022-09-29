import fs from 'fs';

// data
try {
  fs.accessSync('data');
} catch (e) {
  fs.symlinkSync('../../test/data', 'data', 'dir');
}
