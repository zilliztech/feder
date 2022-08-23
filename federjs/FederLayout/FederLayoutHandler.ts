import { EViewType, TLayoutParams } from 'Types';
import { TIndexMeta } from 'Types/indexMeta';
import { TSearchRecords } from 'Types/searchRecords';
import { TVisDataAll } from 'Types/visData';

export interface TFederLayoutHandler {
  computeOverviewVisData(
    viewType: EViewType,
    indexMeta: TIndexMeta,
    layoutParams: TLayoutParams
  ): TVisDataAll;
  computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecords,
    layoutParams: TLayoutParams
  ): TVisDataAll;
}
