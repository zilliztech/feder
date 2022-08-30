import { EProjectMethod, EViewType } from 'Types';
import { TIndexMeta } from 'Types/indexMeta';
import { TSearchRecords } from 'Types/searchRecords';
import {
  TLayoutParamsIvfflat,
  TVisData,
  TVisDataIvfflatOverviewCluster,
  TVisDataIvfflatSearchView,
} from 'Types/visData';
import { TFederLayoutHandler } from '../../FederLayoutHandler';
import IvfflatOverviewLayout from './overview';
import IvfflatSearchViewLayout from './search';

const overviewLayoutFuncMap = {
  [EViewType.default]: IvfflatOverviewLayout,
};

const searchViewLayoutFuncMap = {
  [EViewType.default]: IvfflatSearchViewLayout,
};

const layoutParamsIvfflatDefault = {
  numForceIterations: 100,
  width: 800,
  height: 480,
  canvasScale: 2,
  coarseSearchWithProjection: true,
  fineSearchWithProjection: true,
  projectMethod: EProjectMethod.umap,
  projectParams: {},
  polarOriginBias: 0.15,
  nonTopkNodeR: 3,
  minVoronoiRadius: 5,
  projectPadding: [20, 30, 20, 30],
};
export default class FederLayoutIvfflat implements TFederLayoutHandler {
  overviewLayoutParams: TLayoutParamsIvfflat = {};
  overviewClusters: TVisDataIvfflatOverviewCluster;
  async computeOverviewVisData(
    viewType: EViewType,
    indexMeta: TIndexMeta,
    _layoutParams: TLayoutParamsIvfflat
  ): Promise<TVisDataIvfflatOverviewCluster> {
    const layoutParams = Object.assign(
      {},
      layoutParamsIvfflatDefault,
      _layoutParams
    );
    this.overviewLayoutParams = layoutParams;
    const overviewLayoutFunc = overviewLayoutFuncMap[viewType];
    const overviewClusters = await overviewLayoutFunc(indexMeta, layoutParams);
    this.overviewClusters = overviewClusters;
    return overviewClusters;
  }
  async computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecords,
    _layoutParams: TLayoutParamsIvfflat,
    indexMeta: TIndexMeta
  ): Promise<TVisDataIvfflatSearchView> {
    const layoutParams = Object.assign(
      {},
      layoutParamsIvfflatDefault,
      _layoutParams
    );
    const searchViewLayoutFunc = searchViewLayoutFuncMap[viewType];

    let isSameLayoutParams = true;
    if (
      Object.keys(this.overviewLayoutParams).length !==
      Object.keys(layoutParams).length
    ) {
      isSameLayoutParams = false;
    } else {
      for (let paramKey in this.overviewLayoutParams) {
        if (this.overviewLayoutParams[paramKey] !== layoutParams[paramKey]) {
          isSameLayoutParams = false;
          console.log('paramKey');
          break;
        }
      }
    }
    const shouldUpdateOverviewVisData =
      !this.overviewClusters || !isSameLayoutParams;

    const overviewClusters = shouldUpdateOverviewVisData
      ? await this.computeOverviewVisData(viewType, indexMeta, layoutParams)
      : this.overviewClusters;

    return searchViewLayoutFunc(overviewClusters, searchRecords, layoutParams);
  }
}
