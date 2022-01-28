import Projector from '../Utils/projector/index.js';
import faissIndexParser from './faissIndexParser.js';
import faissIVFFlatSearch from './faissIVFFlatSearch.js';
import { IndexType } from '../Utils/config.js';
import { ProjectMethod } from '../Utils/projector/index.js';

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
    this.setIndexSearchHandler();
    this.updateId2Vec();

    this.initProjector(projectMethod, projectParams);

    // need parsed_index and projector.
    this.updateIndexMeta();
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
    this.indexSearchHandler = null;
    if (this.index) {
      if (this.indexSource === 'faiss') {
        if (this.index.indexType === IndexType.IVFFlat) {
          this.indexSearchHandler = faissIVFFlatSearch;
        }
        if (this.index.indexType === IndexType.HNSW) {
          // todo - search for faiss-hnsw
        }
      } else if (this.source === 'hnswlib') {
        if (this.index.indexType === IndexType.HNSW) {
          // todo - search for hnswlib-hnsw
        }
      } else {
        console.error('Unknown index source');
      }
    } else {
      console.error('Unknown index');
    }
  }

  updateId2Vec() {
    const id2vector = {};
    if (this.index) {
      if (this.index.indexType === IndexType.IVFFlat) {
        const inv = this.index.invlists;
        for (let list_no = 0; list_no < inv.nlist; list_no++) {
          inv.data[list_no].ids.forEach((id, ofs) => {
            id2vector[id] = inv.data[list_no].vectors[ofs];
          });
        }
      }
      if (this.index.indexType === IndexType.HNSW) {
        // todo
      }
    }
    this.id2vector = id2vector;
  }
  updateIndexMeta() {
    const indexMeta = {};
    if (this.index) {
      if (this.index.indexType === IndexType.IVFFlat) {
        indexMeta.ntotal = this.index.ntotal;
        indexMeta.nlist = this.index.nlist;
        // indexMeta.listCentroidVectors = this.index.childIndex.vectors;
        indexMeta.listCentroidProjections = this.project(
          this.index.childIndex.vectors
        );
        indexMeta.listIds = this.index.invlists.data.map((d) => d.ids);
      }
      if (this.index.indexType === IndexType.HNSW) {
        // todo
      }
    }
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
    } else {
      return null;
    }
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

  initProjector(projectMethod, projectParams = {}) {
    this.projector = new Projector(projectMethod, projectParams);
  }
  setProjectParams(projectMethod, projectParams = {}) {
    if (this.projector) {
      this.projector.setProjectParams(projectMethod, projectParams);
      this.updateIndexMeta();
    }
  }
  project(vectors) {
    return this.projector.project(vectors);
  }
}
