import { EViewType, TLayoutParams } from 'Types';
import { TSearchRecords } from 'Types/searchRecords';
import { TAcitonData, TVisDataAll } from 'Types/visData';

export interface TFederLayoutHandler {
  computeOverviewVisData(): TVisDataAll;
  computeSearchViewVisData(
    viewType: EViewType,
    searchRecords: TSearchRecords,
    layoutParams: TLayoutParams
  ): TVisDataAll;
}
