import {
  EActionType,
  EIndexType,
  EViewType,
  TMetaParams,
  TSearchParams,
  TVec,
} from 'Types';

export * from './visDataIvfflat';

export * from './visDataHnswDefault';

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
  targetMedia?: string;
  searchParams?: TSearchParams;
  metaParams?: TMetaParams;
}
