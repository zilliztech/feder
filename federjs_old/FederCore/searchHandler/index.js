import hnswSearchHandler from './hnswSearch';
import ivfflatSearchHandler from './ivfflatSearch';
import { INDEX_TYPE } from 'Types';

const indexSearchHandlerMap = {
  [INDEX_TYPE.hnsw]: hnswSearchHandler,
  [INDEX_TYPE.ivf_flat]: ivfflatSearchHandler,
};

export const getIndexSearchHandler = (indexType) => {
  if (indexType in indexSearchHandlerMap) {
    return indexSearchHandlerMap[indexType];
  } else throw `No search handler for [${indexType}]`;
};

export default getIndexSearchHandler;

