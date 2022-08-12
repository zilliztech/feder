import { TId } from "Types";

export type TSearchRecordsHnswLayerItem = [TId, TId, number];

export type TSearchRecordsHnswLayer = TSearchRecordsHnswLayerItem[];

export interface TSearchRecordsHnswTopkResultItem {
  id: TId;
  distance: number;
}

export interface TSearchRecordsHnsw {
  searchRecords: TSearchRecordsHnswLayer[];
  topkResults: TSearchRecordsHnswTopkResultItem[];
  searchParams: any;
}
