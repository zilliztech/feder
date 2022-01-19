import { Feder } from '../esm/index.js';

let feder = new Feder();

console.assert(feder instanceof Feder, {
  errorMsg: 'should be instanceof Feder',
});

console.assert(typeof feder.update === 'function', {
  errorMsg: 'feder should have an update method',
});

console.assert(typeof feder.update === 'function', {
  errorMsg: 'feder should have an update method',
});

console.assert(typeof feder.search === 'function', {
  errorMsg: 'feder should have an search method',
});

console.assert(typeof feder.reset === 'function', {
  errorMsg: 'feder should have an reset method',
});
