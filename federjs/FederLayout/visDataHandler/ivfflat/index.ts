import { EViewType } from 'Types';
import { TIndexMeta } from 'Types/indexMeta';
import { TSearchRecords } from 'Types/searchRecords';
import { TVisDataAll } from 'Types/visData';
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
  computeOverviewVisData(
    viewType: EViewType,
    indexMeta: TIndexMeta,
    layoutParams: any
  ): TVisDataAll {
    const overviewLayoutFunc = overviewLayoutFuncMap[viewType];
    return overviewLayoutFunc(indexMeta, layoutParams);
  }
  computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecords,
    layoutParams: any
  ): TVisDataAll {
    const searchViewLayoutFunc = searchViewLayoutFuncMap[viewType];
    return searchViewLayoutFunc(searchRecords, layoutParams);
  }
}
