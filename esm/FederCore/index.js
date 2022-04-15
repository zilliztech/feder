import faissIndexParser from './faissIndexParser.js';
import hnswlibIndexParser from './hnswlibIndexParser.js';
import faissIVFFlatSearch from './faissIVFFlatSearch.js';
import hnswlibHNSWSearch from './hnswlibHNSWSearch.js';
import getHnswlibHNSWOverviewData from './getHnswlibHNSWOverviewData.js';
import {
  ProjectMethod,
  getProjectFunc,
  getProjectParamsGuide,
} from '../Utils/projector/index.js';
import { SOURCE_TYPE } from '../Utils/config.js';

const indexSearchHandlerMap = {
  faissIVFFlat: faissIVFFlatSearch,
  faissHNSW: null, // todo,
  hnswlibHNSW: hnswlibHNSWSearch,
};

const indexParserMap = {
  [SOURCE_TYPE.Faiss]: faissIndexParser,
  [SOURCE_TYPE.HNSWlib]: hnswlibIndexParser,
};

/* Feder core class */
export default class FederCore {
  constructor({
    data,
    source = SOURCE_TYPE.Faiss,
    projectMethod = ProjectMethod.UMAP,
    projectParams = {},
  }) {
    this.index = null;
    this.searchParams = {};
    this.meta = null;
    this.indexParser = null;
    this.indexSearchHandler = null;
    this.project = null;

    this.data = data;
    this.setIndexSource(source);
    this.parseIndex();

    console.log('index', this.index);

    if (this.index) {
      this.setIndexSearchHandler();
      this[`_updateId2Vec_${this.index.indexType}`]();
    }

    this.setProjectParams(projectMethod, projectParams);
  }
  get indexType() {
    return this.index.indexType || '';
  }
  setIndexSource(source) {
    this.indexParser = null;
    this.indexSource = source.toLowerCase();
    this.indexParser = indexParserMap[source];
  }
  parseIndex() {
    if (this.indexParser) {
      this.index = this.indexParser(this.data);
    } else {
      console.error('No parser found');
    }
  }
  setIndexSearchHandler() {
    console.log(this.indexSource + this.index.indexType);
    this.indexSearchHandler =
      indexSearchHandlerMap[this.indexSource + this.index.indexType];
    if (!this.indexSearchHandler) {
      console.error('indexSearchHandler not found');
    }
  }

  _updateId2Vec_IVFFlat() {
    const id2vector = {};
    const inv = this.index.invlists;
    for (let list_no = 0; list_no < inv.nlist; list_no++) {
      inv.data[list_no].ids.forEach((id, ofs) => {
        id2vector[id] = inv.data[list_no].vectors[ofs];
      });
    }
    this.id2vector = id2vector;
  }
  _updateId2Vec_HNSW() {
    const { labels, vectors } = this.index;

    const id2vector = {};
    const internalId2Label = {};
    labels.forEach((id, i) => {
      id2vector[id] = vectors[i];
      internalId2Label[i] = id;
    });

    this.id2vector = id2vector;
    this.internalId2Label = internalId2Label;
  }
  _updateIndexMeta_IVFFlat() {
    const indexMeta = {};
    indexMeta.ntotal = this.index.ntotal;
    indexMeta.nlist = this.index.nlist;
    // indexMeta.listCentroidVectors = this.index.childIndex.vectors;
    const { coarseWithProjection = false } = this.projectParams;
    if (coarseWithProjection) {
      indexMeta.listCentroidProjections = this.project(
        this.index.childIndex.vectors
      );
    }
    // indexMeta.listIds = this.index.invlists.data.map((d) => d.ids);
    indexMeta.listSizes = this.index.invlists.data.map((d) => d.ids.length);
    this.indexMeta = indexMeta;
  }
  _updateIndexMeta_HNSW() {
    const index = this.index;

    const visData = getHnswlibHNSWOverviewData({
      index,
      overviewLevel: 3,
    });
    const indexMeta = {
      visData,
      ntotal: index.ntotal,
      M: index.M,
      ef_construction: index.ef_construction,
      levelCount: index.maxLevel + 1,
    };
    this.indexMeta = indexMeta;
  }

  getTestIdAndVec() {
    if (!this.index) {
      return [null, null];
    }
    const ids = Object.keys(this.id2vector);
    const r = Math.floor(Math.random() * ids.length);
    const testId = ids[r];
    const testVec = this.id2vector[testId];
    return [testId, testVec];
  }

  getVectoreById(id) {
    return this.id2Vector[id] || null;
  }
  setSearchParams(params) {
    const newSearchParams = Object.assign(this.searchParams, params);
    this.searchParams = newSearchParams;
  }
  search(target) {
    const { fineWithProjection = false } = this.projectParams;
    const res = this.indexSearchHandler({
      index: this.index,
      target,
      params: this.searchParams,
      project: this.project,
      fineWithProjection,
    });
    return res;
  }

  setProjectParams(projectMethod, projectParams = {}) {
    this.projectMethod = projectMethod;
    this.projectParams = projectParams;
    this.project = getProjectFunc(projectMethod, projectParams);
    this.PROJECT_PARAMETERS = getProjectParamsGuide(projectMethod);
    this.index && this[`_updateIndexMeta_${this.index.indexType}`]();
  }
}
