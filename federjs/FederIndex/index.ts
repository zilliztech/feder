import { EIndexType, TVec, TSearchParams } from "Types";

import { Parser } from "./parser";
import { SearchHandler } from "./searchHandler";

export class FederIndex {
  index: any;
  indexType: EIndexType;
  parser: Parser;
  searchHandler: SearchHandler;
  constructor(indexType: EIndexType) {
    this.indexType = indexType;
    this.parser = new Parser(indexType);
    this.searchHandler = new SearchHandler(indexType);
  }
  initByArrayBuffer(arrayBuffer: ArrayBuffer) {
    this.index = this.parser.parse(arrayBuffer);
  }
  getIndexMeta() {
    return "";
  }
  getSearchRecords(target: TVec, searchParams: TSearchParams) {
    return this.searchHandler.search({
      index: this.index,
      target,
      params: searchParams,
    });
  }
}
