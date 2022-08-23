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
import FederLayoutIvfflat from './visDataHandler/ivfflat';

const federLayoutHandlerMap = {
  [EIndexType.hnsw]: FederLayoutHnsw,
  [EIndexType.ivfflat]: FederLayoutIvfflat,
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

  async getOverviewVisData({
    actionData = {},
    viewType,
    layoutParams = {},
  }: {
    actionData: TAcitonData;
    viewType: EViewType;
    layoutParams: TLayoutParams;
  }) {
    // [todo] cache
    const indexMeta = await this.federIndex.getIndexMeta(actionData.metaParams);
    return this.federLayoutHandler.computeOverviewVisData(
      viewType,
      indexMeta,
      layoutParams
    );
  }

  async getSearchViewVisData({
    actionData = {},
    viewType,
    layoutParams = {},
  }: {
    actionData: TAcitonData;
    viewType: EViewType;
    layoutParams: TLayoutParams;
  }) {
    const searchRecords = await this.federIndex.getSearchRecords(
      actionData.target,
      actionData.searchParams
    );
    console.log('searchRecords got!');
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
        ? await this.getSearchViewVisData({
            actionData,
            viewType,
            layoutParams,
          })
        : await this.getOverviewVisData({ actionData, viewType, layoutParams });
    return {
      indexType: this.indexType,
      actionType,
      actionData,
      viewType,
      visData,
    } as TVisDataAll;
  }
}
