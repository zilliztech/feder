import { FederIndex } from 'FederIndex';
import {
  EViewType,
  EActionType,
  EIndexType,
  TVec,
  TSearchParams,
  TLayoutParams,
} from 'Types';
import { TVisDataAll, TAcitonData } from 'Types/visData';
import { TFederLayoutHandler } from './FederLayoutHandler';
import FederLayoutHnsw from './visDataHandler/hnsw';

const federLayoutHandlerMap = {
  [EIndexType.hnsw]: FederLayoutHnsw,
  // [EIndexType.ivfflat]: FederLayoutIVFFlat;
};

export class FederLayout {
  private federIndex: FederIndex;
  indexType: EIndexType;
  private federLayoutHandler: TFederLayoutHandler;
  constructor(federIndex: FederIndex) {
    this.federIndex = federIndex;
    this.indexType = federIndex.indexType;
    this.federLayoutHandler = new federLayoutHandlerMap[federIndex.indexType]();
  }

  async getOverviewVisData(viewType: EViewType, layoutParams: TLayoutParams) {
    return {};
  }

  async getSearchViewVisData(
    actionData: TAcitonData,
    viewType: EViewType,
    layoutParams: TLayoutParams
  ) {
    const searchRecords = await this.federIndex.getSearchRecords(
      actionData.target,
      actionData.searchParams
    );
    console.log('searchRecords', searchRecords);
    return this.federLayoutHandler.computeSearchViewVisData(
      viewType,
      searchRecords,
      layoutParams
    );
  }

  async getVisData({
    actionType,
    actionData,
    viewType = EViewType.default,
    layoutParams = {},
  }: {
    actionType: EActionType;
    actionData?: TAcitonData;
    viewType?: EViewType;
    layoutParams?: TLayoutParams;
  }) {
    const visData =
      actionType === EActionType.search
        ? await this.getSearchViewVisData(actionData, viewType, layoutParams)
        : await this.getOverviewVisData(viewType, layoutParams);
    return {
      indexType: this.indexType,
      actionType,
      actionData,
      viewType,
      visData,
    } as TVisDataAll;
  }
}
