import { ESourceType, EIndexType, TVec, TSearchParams } from 'Types';

import { Parser } from './parser';
import { SearchHandler } from './searchHandler';

export class FederIndex {
  private index: any;
  indexType: EIndexType;
  private parser: Parser;
  private searchHandler: SearchHandler;
  constructor(sourceType: ESourceType) {
    this.parser = new Parser(sourceType);
  }
  initByArrayBuffer(arrayBuffer: ArrayBuffer) {
    this.index = this.parser.parse(arrayBuffer);
    this.indexType = this.index.indexType;
    this.searchHandler = new SearchHandler(this.indexType);
  }
  async getIndexType() {
    return this.indexType;
  }
  async getIndexMeta() {
    return '';
  }
  async getSearchRecords(target: TVec, searchParams: TSearchParams) {
    return this.searchHandler.search({
      index: this.index,
      target,
      params: searchParams,
    });
  }
}
