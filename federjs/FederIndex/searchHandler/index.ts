import { hnswlibHNSWSearch } from './hnswSearch';
import { faissIVFFlatSearch } from './ivfflatSearch';
import { EIndexType, TVec, TSearchParams } from 'Types';
import { TSearchRecords } from 'Types/searchRecords';
import { TIndexStructure } from 'Types/indexStructure';

const searchFuncMap = {
  [EIndexType.hnsw]: hnswlibHNSWSearch,
  [EIndexType.ivfflat]: faissIVFFlatSearch,
};

export interface TSearchVectorAndParams {
  index: TIndexStructure;
  target: TVec;
  searchParams: TSearchParams;
}

export type TSearchFunc = (
  searchVectorAndParams: TSearchVectorAndParams
) => TSearchRecords;

export default class SearchHandler {
  search: TSearchFunc;
  constructor(indexType: EIndexType) {
    this.search = searchFuncMap[indexType];
  }
}
