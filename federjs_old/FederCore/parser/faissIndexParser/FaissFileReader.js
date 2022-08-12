import FileReader from '../FileReader.js';
import { uint8toChars, generateArray } from 'Utils';

export default class FaissFileReader extends FileReader {
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
