import { EActionType, EIndexType, EViewType, TSearchParams, TVec } from 'Types';

export type TVisData = any;
export interface TVisDataAll {
  indexType: EIndexType;
  actionType: EActionType;
  actionData?: TAcitonData;
  viewType: EViewType;
  visData: TVisData;
}

export interface TAcitonData {
  target: TVec;
  targetUrl?: string;
  searchParams: TSearchParams;
}
