import Projector from '../Utils/projector/index.js';
import faissIndexParser from './faissIndexParser.js';
import faissIVFFlatSearch from './faissIVFFlatSearch.js';
import {
  ProjectMethod,
  getProjectFunc,
  getProjectParamsGuide,
} from '../Utils/projector/index.js';

const indexSearchHandlerMap = {
  faissIVFFlat: faissIVFFlatSearch,
  faissHNSW: null, // todo,
  hnswlibHNSW: null, // todo,
};
/* Feder core class */
export default class FederCore {
  constructor({
    data,
    source = 'faiss',
    projectMethod = ProjectMethod.UMAP,
    projectParams = {},
  }) {
    this.index = null;
    this.meta = null;
    this.indexParser = null;
    this.indexSearchHandler = null;
    this.projector = null;

    this.data = data;
    this.setIndexSource(source);
    this.parseIndex();

    if (this.index) {
      this.setIndexSearchHandler();
      this[`_updateId2Vec_${this.index.indexType}`]();
    }

    this.setProjectParams(projectMethod, projectParams);

    // need parsed_index and projector.
    this.index && this[`_updateIndexMeta_${this.index.indexType}`]();
  }
  setIndexSource(source) {
    this.indexParser = null;
    this.indexSource = source;
    if (source === 'faiss') {
      this.indexParser = faissIndexParser;
    }
  }
  parseIndex() {
    if (this.indexParser) {
      this.index = this.indexParser(this.data);
    } else {
      console.error('No parser found');
    }
  }
  setIndexSearchHandler() {
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
    const id2vector = {};
    // todo;
    this.id2vector = id2vector;
  }
  _updateIndexMeta_IVFFlat() {
    const indexMeta = {};
    indexMeta.ntotal = this.index.ntotal;
    indexMeta.nlist = this.index.nlist;
    // indexMeta.listCentroidVectors = this.index.childIndex.vectors;
    indexMeta.listCentroidProjections = this.project(
      this.index.childIndex.vectors
    );
    indexMeta.listIds = this.index.invlists.data.map((d) => d.ids);
    this.indexMeta = indexMeta;
  }
  _updateIndexMeta_HNSW() {
    const indexMeta = {};
    // todo
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
    return { testId, testVec };
  }

  getVectoreById(id) {
    if (id in this.id2Vector) {
      return this.id2Vector[id];
    }
    return null;
  }
  setSearchParams(params) {
    this.searchParams = Object.assign(this.searchParams, params);
  }
  search(target) {
    const res = this.indexSearchHandler({
      index: this.index,
      target,
      params: this.searchParams,
    });
    return res;
  }

  setProjectParams(projectMethod, projectParams = {}) {
    this.project = getProjectFunc(projectMethod, projectParams);
    this.PROJECT_PARAMETERS = getProjectParamsGuide(projectMethod);
  }
  project(vectors) {
    return this.projector.project(vectors);
  }
}
