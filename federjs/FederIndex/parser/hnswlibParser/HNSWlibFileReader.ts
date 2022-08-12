import FileReader from "../FileReader";

export default class HNSWlibFileReader extends FileReader {
  constructor(arrayBuffer: ArrayBuffer) {
    super(arrayBuffer);
  }
  readIsDeleted() {
    return this.readUint8();
  }
  readIsReused() {
    return this.readUint8();
  }
  readLevelOCount() {
    return this.readUint16();
  }
}
