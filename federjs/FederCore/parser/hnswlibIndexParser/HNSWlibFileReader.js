import FileReader from '../FileReader.js';

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
    return this.readUint16();
  }
}
