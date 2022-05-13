import { INDEX_TYPE } from 'Types';
import getHnswMeta from './hnswMeta';
import getIvfflatMeta from './ivfflatMeta';


const metaHandlerMap = {
  [INDEX_TYPE.hnsw]: getHnswMeta,
  [INDEX_TYPE.ivf_flat]: getIvfflatMeta,
};

export const getMetaHandler = (indexType) => {
  if (indexType in metaHandlerMap) {
    return metaHandlerMap[indexType];
  } else throw `No meta handler for [${indexType}]`;
};

export default getMetaHandler;
