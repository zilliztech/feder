import { EActionType, EIndexType, EViewType, TSearchParams, TVec } from "Types";

export interface TVisDataAll {
  indexType: EIndexType;
  actionType: EActionType;
  actionData?: TAcitonData;
  viewType: EViewType;
  visData: any;
}

export interface TAcitonData {
  target: TVec;
  targetUrl?: string;
  searchParams: TSearchParams;
}

export type TLayoutParams = any;
