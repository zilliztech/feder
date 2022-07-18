export const FEDER_CORE_REQUEST = {
  get_index_type: 'get_index_type',
  get_index_meta: 'get_index_meta',
  get_test_id_and_vector: 'get_test_id_and_vector',
  get_vector_by_id: 'get_vector_by_id',
  search: 'search',
  set_search_params: 'set_search_params',
};

export const coreNodePort = 1332;

const ivfflatSource = 'faiss';
const ivfflatIndexFilePath =
  'https://assets.zilliz.com/faiss_ivf_flat_voc_17k_ab112eec72.index';

const hnswSource = 'hnswlib';
const hnswIndexFilePath =
  'https://assets.zilliz.com/hnswlib_hnsw_voc_17k_1f1dfd63a9.index';

export const filePath = hnswIndexFilePath;
export const source = hnswSource;
