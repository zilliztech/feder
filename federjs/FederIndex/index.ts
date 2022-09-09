import {
  ESourceType,
  EIndexType,
  TVec,
  TSearchParams,
  TMetaParams,
  TId,
} from 'Types';

import { Parser } from './parser';
import SearchHandler from './searchHandler';
import MetaHandler from './metaHandler';
import { TIndexStructure } from 'Types/indexStructure';
import id2VectorHandler from './id2VectorHandler';

export class FederIndex {
  private index: TIndexStructure;
  indexType: EIndexType;
  private parser: Parser;
  private searchHandler: SearchHandler;
  private metaHandler: MetaHandler;
  private id2vector: { [id: TId]: TVec };
  constructor(sourceType: ESourceType, arrayBuffer: ArrayBuffer = null) {
    this.parser = new Parser(sourceType);
    if (!!arrayBuffer) {
      this.initByArrayBuffer(arrayBuffer);
    }
  }
  initByArrayBuffer(arrayBuffer: ArrayBuffer) {
    this.index = this.parser.parse(arrayBuffer);
    this.indexType = this.index.indexType;
    this.searchHandler = new SearchHandler(this.indexType);
    this.metaHandler = new MetaHandler(this.indexType);
    this.id2vector = id2VectorHandler(this.index);
  }
  async getIndexType() {
    return this.indexType;
  }
  async getIndexMeta(metaParams: TMetaParams = {}) {
    return this.metaHandler.getMeta(this.index, metaParams);
  }
  async getSearchRecords(target: TVec, searchParams: TSearchParams = {}) {
    return this.searchHandler.search({
      index: this.index,
      target,
      searchParams: searchParams,
    });
  }
  async getVectorById(id: TId) {
    return Array.from(this.id2vector[id]);
  }
}
