import FileReader from "../FileReader";
import { uint8toChars } from "FederIndex/Utils";

export default class FaissFileReader extends FileReader {
  constructor(arrayBuffer) {
    super(arrayBuffer);
  }
  readH() {
    const uint8Array = Array(4)
      .fill(0)
      .map((_) => this.readUint8());
    const h = uint8toChars(uint8Array);
    return h;
  }
  readDummy() {
    const dummy = this.readUint64();
    return dummy;
  }
}
