export default class FileReader {
  data: ArrayBuffer;
  dataview: DataView;
  p: number;
  constructor(arrayBuffer: ArrayBuffer) {
    this.data = arrayBuffer;
    this.dataview = new DataView(arrayBuffer);

    this.p = 0;
  }
  get isEmpty() {
    return this.p >= this.data.byteLength;
  }
  readInt8() {
    const int8 = this.dataview.getInt8(this.p);
    this.p += 1;
    return int8;
  }
  readUint8() {
    const uint8 = this.dataview.getUint8(this.p);
    this.p += 1;
    return uint8;
  }
  readBool() {
    const int8 = this.readInt8();
    return Boolean(int8);
  }
  readUint16() {
    const uint16 = this.dataview.getUint16(this.p, true);
    this.p += 2;
    return uint16;
  }
  readInt32() {
    const int32 = this.dataview.getInt32(this.p, true);
    this.p += 4;
    return int32;
  }
  readUint32() {
    const uint32 = this.dataview.getUint32(this.p, true);
    this.p += 4;
    return uint32;
  }
  readUint64() {
    const left = this.readUint32();
    const right = this.readUint32();
    const int64 = left + Math.pow(2, 32) * right;
    if (!Number.isSafeInteger(int64))
      console.warn(int64, "Exceeds MAX_SAFE_INTEGER. Precision may be lost");
    return int64;
  }
  readFloat64() {
    const float64 = this.dataview.getFloat64(this.p, true);
    this.p += 8;
    return float64;
  }
  readDouble() {
    return this.readFloat64();
  }

  readUint32Array(n) {
    const res = Array(n)
      .fill(0)
      .map((_) => this.readUint32());
    return res;
  }
  readFloat32Array(n) {
    const res = new Float32Array(this.data.slice(this.p, this.p + n * 4));
    this.p += n * 4;
    return res;
  }
  readUint64Array(n) {
    const res = Array(n)
      .fill(0)
      .map((_) => this.readUint64());
    return res;
  }
}
