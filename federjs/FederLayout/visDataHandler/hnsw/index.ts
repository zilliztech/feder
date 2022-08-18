import { TFederLayoutHandler } from 'FederLayout/FederLayoutHandler';
import { TVec, TSearchParams, EViewType, TLayoutParams } from 'Types';
import { TSearchRecords, TSearchRecordsHnsw } from 'Types/searchRecords';
import { TVisData } from 'Types/visData';

import { searchViewLayoutHandler } from './search';
import { searchViewLayoutHandler3d } from './search/hnsw3d';

const searchViewLayoutHandlerMap = {
  [EViewType.default]: searchViewLayoutHandler,
  [EViewType.hnsw3d]: searchViewLayoutHandler,
  // [EViewType.hnsw3d]: searchViewLayoutHandler3d,
};

const defaultHnswLayoutParams = {
  padding: [80, 200, 60, 220],
  forceTime: 3000,
  layerDotNum: 20,
  shortenLineD: 8,
  overviewLinkLineWidth: 2,
  reachableLineWidth: 3,
  shortestPathLineWidth: 4,
  ellipseRation: 1.4,
  shadowBlur: 4,
  mouse2nodeBias: 3,
  highlightRadiusExt: 0.5,
  targetR: 3,
  searchViewNodeBasicR: 1.5,
  searchInterLevelTime: 300,
  searchIntraLevelTime: 100,
  HoveredPanelLine_1_x: 15,
  HoveredPanelLine_1_y: -25,
  HoveredPanelLine_2_x: 30,
  hoveredPanelLineWidth: 2,
  forceIterations: 100,
  targetOrigin: [0, 0],
};

export default class FederLayoutHnsw implements TFederLayoutHandler {
  constructor() {}

  computeOverviewVisData() {
    return {} as TVisData;
  }

  computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecordsHnsw,
    layoutParams: TLayoutParams
  ) {
    const searchViewLayoutHandler = searchViewLayoutHandlerMap[viewType];

    return searchViewLayoutHandler(
      searchRecords,
      Object.assign({}, defaultHnswLayoutParams, layoutParams)
    ) as TVisData;
  }
}
