import { EViewType } from 'Types';
import { TIndexMetaIvfflat } from 'Types/indexMeta';
import { TSearchRecords } from 'Types/searchRecords';
import {
  TLayoutParamsIvfflat,
  TVisDataIvfflatOverview,
  TVisDataIvfflatOverviewCluster,
  TVisDataIvfflatSearchView,
} from 'Types/visData';
import { TFederLayoutHandler } from '../../FederLayoutHandler';
import { defaultLayoutParamsIvfflat } from './defaultLayoutParamsIvfflat';
import IvfflatOverviewLayout from './overview';
import IvfflatSearchViewLayout from './search';

const overviewLayoutFuncMap = {
  [EViewType.default]: IvfflatOverviewLayout,
};

const searchViewLayoutFuncMap = {
  [EViewType.default]: IvfflatSearchViewLayout,
};

export default class FederLayoutIvfflat implements TFederLayoutHandler {
  overviewLayoutParams: TLayoutParamsIvfflat = {};
  overviewClusters: TVisDataIvfflatOverviewCluster;
  async computeOverviewVisData(
    viewType: EViewType,
    indexMeta: TIndexMetaIvfflat,
    _layoutParams: TLayoutParamsIvfflat
  ): Promise<TVisDataIvfflatOverview> {
    const layoutParams = Object.assign(
      {},
      defaultLayoutParamsIvfflat,
      _layoutParams
    );
    this.overviewLayoutParams = layoutParams;
    const overviewLayoutFunc = overviewLayoutFuncMap[viewType];
    const overviewClusters = await overviewLayoutFunc(indexMeta, layoutParams);
    this.overviewClusters = overviewClusters;
    const { nlist, ntotal } = indexMeta;
    return { overviewClusters, nlist, ntotal };
  }
  async computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecords,
    _layoutParams: TLayoutParamsIvfflat,
    indexMeta: TIndexMetaIvfflat
  ): Promise<TVisDataIvfflatSearchView> {
    const layoutParams = Object.assign(
      {},
      defaultLayoutParamsIvfflat,
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
      ? (await this.computeOverviewVisData(viewType, indexMeta, layoutParams))
          .overviewClusters
      : this.overviewClusters;

    const searchRes = await searchViewLayoutFunc(
      overviewClusters,
      searchRecords,
      layoutParams
    );

    const { nlist, ntotal } = indexMeta;

    return Object.assign(searchRes, { nlist, ntotal });
  }
}
