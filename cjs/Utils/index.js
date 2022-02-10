'use strict';
const uint8toChars = (data) => {
  return String.fromCharCode(...data);
};
exports.uint8toChars = uint8toChars;

const generateArray = (num) => {
  return Array.from(new Array(num).keys());
};
exports.generateArray = generateArray;
