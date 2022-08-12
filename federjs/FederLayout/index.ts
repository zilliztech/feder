import { FederIndex } from "FederIndex";
import { EViewType, EActionType, EIndexType, TVec, TSearchParams } from "Types";
import { TVisDataAll, TAcitonData, TLayoutParams } from "Types/visData";
import FederLayoutHnsw from "./visDataHandler/hnsw";

const federLayoutHandlerMap = {
  [EIndexType.hnsw]: FederLayoutHnsw,
  // [EIndexType.ivfflat]: FederLayoutIVFFlat;
};

export class FederLayout {
  federIndex: FederIndex;
  indexType: EIndexType;
  federLayoutHandler: any;
  constructor(federIndex: FederIndex) {
    this.federIndex = federIndex;
    this.indexType = federIndex.indexType;
    this.federLayoutHandler = new federLayoutHandlerMap[federIndex.indexType]();
  }

  async getOverviewVisData(viewType: EViewType, layoutParams: any) {
    return {};
  }

  async getSearchViewVisData(
    actionData: TAcitonData,
    viewType: EViewType,
    layoutParams: any = {}
  ) {
    const searchRecords = this.federIndex.getSearchRecords(
      actionData.target,
      actionData.searchParams
    );
    console.log("searchRecords", searchRecords);
    return await this.federLayoutHandler.getSearchViewVisData(
      viewType,
      searchRecords,
      layoutParams
    );
  }

  async getVisData({
    actionType,
    actionData,
    viewType = EViewType.normal,
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
