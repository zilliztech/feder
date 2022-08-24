import { EViewType } from 'Types';
import { TIndexMeta } from 'Types/indexMeta';
import { TSearchRecords } from 'Types/searchRecords';
import {
  TLayoutParamsIvfflat,
  TVisData,
  TVisDataIvfflatOverviewCluster,
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

export default class FederLayoutIvfflat implements TFederLayoutHandler {
  indexMeta: TIndexMeta;
  overviewLayoutParams: TLayoutParamsIvfflat;
  overviewClusters: TVisDataIvfflatOverviewCluster;
  async computeOverviewVisData(
    viewType: EViewType,
    indexMeta: TIndexMeta,
    layoutParams: TLayoutParamsIvfflat
  ): Promise<TVisDataIvfflatOverviewCluster> {
    this.indexMeta = indexMeta;
    const overviewLayoutFunc = overviewLayoutFuncMap[viewType];
    const overviewClusters = await overviewLayoutFunc(indexMeta, layoutParams);
    this.overviewClusters = overviewClusters;
    return overviewClusters;
  }
  async computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecords,
    layoutParams: TLayoutParamsIvfflat
  ): Promise<TVisData> {
    const searchViewLayoutFunc = searchViewLayoutFuncMap[viewType];

    let isSameLayoutParams = true;
    for (let paramKey in this.overviewLayoutParams) {
      if (this.overviewLayoutParams[paramKey] !== layoutParams[paramKey]) {
        isSameLayoutParams = false;
        console.log('paramKey');
        break;
      }
    }

    const overviewClusters = isSameLayoutParams
      ? this.overviewClusters
      : await this.computeOverviewVisData(
          viewType,
          this.indexMeta,
          layoutParams
        );

    return searchViewLayoutFunc(overviewClusters, searchRecords, layoutParams);
  }
}
