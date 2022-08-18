import { TIndexStructureHnsw, hnswlibIndexParser } from './hnswlibParser';
import { ESourceType } from 'Types';

const parserMap = {
  [ESourceType.hnswlib]: hnswlibIndexParser,
  // [ESourceType.faiss]: ,
  // [ESourceType.milvus]: ,
};

export type TIndexParseFunc = (arrayBuffer: ArrayBuffer) => TIndexStructureHnsw;

export class Parser {
  parse: TIndexParseFunc;
  constructor(indexType: ESourceType) {
    this.parse = parserMap[indexType];
  }
}
