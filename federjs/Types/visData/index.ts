import {
  EActionType,
  EIndexType,
  EViewType,
  TMetaParams,
  TSearchParams,
  TVec,
} from 'Types';

export * from './visDataIvfflat';

export * from './visDataHnsw';

export type TVisData = any;
export interface TVisDataAll {
  indexType: EIndexType;
  actionType: EActionType;
  actionData?: TAcitonData;
  viewType: EViewType;
  visData: TVisData;
}

export interface TAcitonData {
  target?: TVec;
  targetUrl?: string;
  searchParams?: TSearchParams;
  metaParams?: TMetaParams;
}
