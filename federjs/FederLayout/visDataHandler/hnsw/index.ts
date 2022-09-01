import { TFederLayoutHandler } from 'FederLayout/FederLayoutHandler';
import { TVec, TSearchParams, EViewType, TLayoutParams } from 'Types';
import { TSearchRecords, TSearchRecordsHnsw } from 'Types/searchRecords';
import { TLayoutParamsHnsw, TVisData } from 'Types/visData';
import defaultHnswLayoutParams from './defaultLayoutParamsHnsw';

import { searchViewLayoutHandler } from './search';
import { searchViewLayoutHandler3d } from './search/hnsw3d';

const searchViewLayoutHandlerMap = {
  [EViewType.default]: searchViewLayoutHandler,
  [EViewType.hnsw3d]: searchViewLayoutHandler,
  // [EViewType.hnsw3d]: searchViewLayoutHandler3d,
};

export default class FederLayoutHnsw implements TFederLayoutHandler {
  constructor() {}

  computeOverviewVisData() {
    return {} as TVisData;
  }

  computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecordsHnsw,
    layoutParams: TLayoutParamsHnsw
  ) {
    const searchViewLayoutHandler = searchViewLayoutHandlerMap[viewType];

    return searchViewLayoutHandler(
      searchRecords,
      Object.assign({}, defaultHnswLayoutParams, layoutParams)
    ) as TVisData;
  }
}
