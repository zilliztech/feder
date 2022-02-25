import FileReader from './FileReader.js';

export default class HNSWlibFileReader extends FileReader {
  constructor(arrayBuffer) {
    super(arrayBuffer);
  }
  readIsDeleted() {
    return this.readUint8()
  }
  readIsReused() {
    return this.readUint8()
  }
  readLevelOCount() {
    // const res = [this.readUint8(), this.readUint8()];
    // return res;
    return this.readUint16();
  }
}
