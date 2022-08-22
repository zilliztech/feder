import { TIndexStructure } from 'Types/indexStructure';
import { EIndexType, TMetaParams } from 'Types';
import { TIndexMeta } from 'Types/indexMeta';
import getIvfflatIndexMeta from './ivfflatMeta';
import getHnswIndexMeta from './hnswMeta';

const metaFuncMap = {
  [EIndexType.hnsw]: getHnswIndexMeta,
  [EIndexType.ivfflat]: getIvfflatIndexMeta,
} as { [indexType: string]: TMetaFunc };

export type TMetaFunc = (
  index: TIndexStructure,
  metaParams: TMetaParams
) => TIndexMeta;

export default class MetaHandler {
  metaFunc: TMetaFunc;
  constructor(indexType: EIndexType) {
    this.metaFunc = metaFuncMap[indexType];
  }
  getMeta(index: TIndexStructure, metaParams: TMetaParams = {}) {
    return this.metaFunc(index, metaParams);
  }
}
