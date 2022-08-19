import { TIndexStructureHnsw, hnswlibIndexParser } from './hnswlibParser';
import { faissIndexParser } from './faissParser';
import { ESourceType } from 'Types';

const parserMap = {
  [ESourceType.hnswlib]: hnswlibIndexParser,
  [ESourceType.faiss]: faissIndexParser,
  // [ESourceType.milvus]: ,
};

export type TIndexParseFunc = (arrayBuffer: ArrayBuffer) => TIndexStructureHnsw;

export class Parser {
  parse: TIndexParseFunc;
  constructor(indexType: ESourceType) {
    this.parse = parserMap[indexType];
  }
}
