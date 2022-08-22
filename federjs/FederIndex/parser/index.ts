import { TIndexStructureHnsw, hnswlibIndexParser } from './hnswlibParser';
import { faissIndexParser } from './faissParser';
import { ESourceType } from 'Types';
import { TIndexStructure } from 'FederIndex/Types';

const parserMap = {
  [ESourceType.hnswlib]: hnswlibIndexParser,
  [ESourceType.faiss]: faissIndexParser,
};

export type TIndexParseFunc = (arrayBuffer: ArrayBuffer) => TIndexStructure;

export class Parser {
  parse: TIndexParseFunc;
  constructor(indexType: ESourceType) {
    this.parse = parserMap[indexType];
  }
}
