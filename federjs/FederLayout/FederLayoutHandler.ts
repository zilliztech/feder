import { EViewType, TLayoutParams } from 'Types';
import { TIndexMeta } from 'Types/indexMeta';
import { TSearchRecords } from 'Types/searchRecords';
import { TVisData } from 'Types/visData';

export interface TFederLayoutHandler {
  computeOverviewVisData(
    viewType: EViewType,
    indexMeta: TIndexMeta,
    layoutParams: TLayoutParams
  ): Promise<TVisData>;
  computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecords,
    layoutParams: TLayoutParams,
    indexMeta: TIndexMeta,
  ): Promise<TVisData>;
}
