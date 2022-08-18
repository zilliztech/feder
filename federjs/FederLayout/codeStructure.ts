// service

import { EActionType, EViewType, EIndexType, TLayoutParams } from 'Types';
import { TVisDataAll, TAcitonData } from 'Types/visData';
import { FederIndex } from 'FederIndex';

export class FederLayout {
  indexType: EIndexType;
  federIndex: FederIndex;
  constructor(federIndex: FederIndex) {
    this.federIndex = federIndex;
    this.indexType = this.federIndex.indexType;
  }

  async getVisData({
    actionType,
    actionData,
    viewType,
    layoutParams,
  }: {
    actionType: EActionType;
    actionData: TAcitonData;
    viewType: EViewType;
    layoutParams: TLayoutParams;
  }): Promise<TVisDataAll> {
    const visData =
      actionType === EActionType.search
        ? await this.getSearchViewVisData({
            actionData,
            viewType,
            layoutParams,
          })
        : await this.getOverviewVisData({ viewType, layoutParams });

    return {
      indexType: this.indexType,
      actionType,
      actionData,
      viewType,
      visData,
    };
  }

  async getSearchViewVisData({
    actionData,
    viewType,
    layoutParams,
  }: {
    actionData: TAcitonData;
    viewType: EViewType;
    layoutParams: TLayoutParams;
  }) {}

  async getOverviewVisData({
    viewType,
    layoutParams,
  }: {
    viewType: EViewType;
    layoutParams: TLayoutParams;
  }) {}
}

export class FederLayoutHnsw extends FederLayout {
  getSearchViewVisData;
}
