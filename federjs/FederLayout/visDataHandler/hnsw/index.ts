import { TVec, TSearchParams, EViewType } from "Types";
import { TSearchRecords, TSearchRecordsHnsw } from "Types/searchRecords";

import { searchViewLayoutHandler } from "./search";
import { searchViewLayoutHandler3d } from "./search/hnsw3d";

const searchViewLayoutHandlerMap = {
  [EViewType.normal]: searchViewLayoutHandler,
  [EViewType.hnsw3d]: searchViewLayoutHandler3d,
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

export default class FederLayoutHnsw {
  constructor() {}
  getOverviewVisData() {}
  getSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecordsHnsw,
    layoutParams: any
  ) {
    const searchViewLayoutHandler = searchViewLayoutHandlerMap[viewType];

    return searchViewLayoutHandler(
      searchRecords,
      Object.assign({}, defaultHnswLayoutParams, layoutParams)
    );
  }
}
