import { test_federIndex_hnswlib_hnsw } from './test_federIndex_hnswlib_hnsw.js';
import { test_federIndex_faiss_ivfflat } from './test_federIndex_faiss_ivfflat.js';
import { test_federLayout_ivfflat } from './test_federLayout_ivfflat.js';

// await test_federIndex_hnswlib_hnsw();
// await test_federIndex_faiss_ivfflat();

await test_federLayout_ivfflat();
