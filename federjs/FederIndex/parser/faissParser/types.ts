export enum EDirectMapType {
  NoMap = 0, // default
  Array, // sequential ids (only for add, no add_with_ids)
  Hashtable, // arbitrary ids
}

export interface TDirectMap {
  dmType: EDirectMapType;
  size: number;
}
