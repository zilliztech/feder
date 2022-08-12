import { TIndexStructureHnsw, hnswlibIndexParser } from "./hnswlibParser";
import { EIndexType } from "Types";

const parserMap = {
  [EIndexType.hnsw]: hnswlibIndexParser,
};

export type TIndexParseFunc = (arrayBuffer: ArrayBuffer) => TIndexStructureHnsw;

export class Parser {
  parse: TIndexParseFunc;
  constructor(indexType: EIndexType) {
    this.parse = parserMap[indexType];
  }
}
