import {
  ESourceType,
  EIndexType,
  TVec,
  TSearchParams,
  TMetaParams,
} from 'Types';

import { Parser } from './parser';
import SearchHandler from './searchHandler';
import MetaHandler from './metaHandler';
import { TIndexStructure } from 'Types/indexStructure';

export class FederIndex {
  private index: TIndexStructure;
  indexType: EIndexType;
  private parser: Parser;
  private searchHandler: SearchHandler;
  private metaHandler: MetaHandler;
  constructor(sourceType: ESourceType) {
    this.parser = new Parser(sourceType);
  }
  initByArrayBuffer(arrayBuffer: ArrayBuffer) {
    this.index = this.parser.parse(arrayBuffer);
    this.indexType = this.index.indexType;
    this.searchHandler = new SearchHandler(this.indexType);
    this.metaHandler = new MetaHandler(this.indexType);
  }
  async getIndexType() {
    return this.indexType;
  }
  async getIndexMeta(metaParams: TMetaParams = {}) {
    return this.metaHandler.getMeta(this.index, metaParams);
  }
  async getSearchRecords(target: TVec, searchParams: TSearchParams) {
    return this.searchHandler.search({
      index: this.index,
      target,
      searchParams: searchParams,
    });
  }
}
