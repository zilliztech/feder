import { hnswlibHNSWSearch } from './hnswSearch';
import { faissIVFFlatSearch } from './ivfflatSearch';
import { EIndexType, TVec, TSearchParams } from 'Types';
import { TSearchRecords } from 'Types/searchRecords';

const searchFuncMap = {
  [EIndexType.hnsw]: hnswlibHNSWSearch,
  [EIndexType.ivfflat]: faissIVFFlatSearch,
};

export interface TSearchVectorAndParams {
  index: any;
  target: TVec;
  params: TSearchParams;
}

export type TSearchFunc = (
  searchParams: TSearchVectorAndParams
) => TSearchRecords;

export class SearchHandler {
  search: TSearchFunc;
  constructor(indexType: EIndexType) {
    this.search = searchFuncMap[indexType];
  }
}
