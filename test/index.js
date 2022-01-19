import { Feder } from '../esm/index.js';

let feder = new Feder();

console.assert(feder instanceof Feder, {
  errorMsg: 'should be instanceof Feder',
});
