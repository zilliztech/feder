'use strict';
const FileReader = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./FileReader.js'))
const { uint8toChars, generateArray } = require('../Utils/index.js');

module.exports = class FaissFileReader extends FileReader {
  constructor(arrayBuffer) {
    super(arrayBuffer);
  }
  readH() {
    const uint8Array = generateArray(4).map((_) => this.readUint8());
    const h = uint8toChars(uint8Array);
    return h;
  }
  readDummy() {
    const dummy = this.readUint64();
    return dummy;
  }
}