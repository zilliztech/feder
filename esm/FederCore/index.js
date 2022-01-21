import { project } from '../Utils/index.js';
import faissIndexParser from './faissIndexParser.js';

/* Feder core class */
export default class FederCore {
  constructor({ data, source = 'faiss', projectParams = {} }) {
    this.data = data;
    this.setIndexSource(source);
    this.parseIndex();
  }
  setIndexSource(source) {
    this.indexParser = null;
    if (source === 'faiss') {
      this.indexParser = faissIndexParser;
    }
  }
  parseIndex() {
    if (this.indexParser) {
      this.index = this.indexParser(this.data);
      console.log('index', this.index);
    } else {
      console.error('no parser found');
    }
  }

  get meta() {
    // define ivf-meta
    // define hnsw-meta
  }
  get id2Vector() {
    // id to vector map
  }
  search() {
    // define ivf-vis_records
    // define hnsw-vis_records
  }
  project() {
    project(...arguments);
  }
  setProjectParams() {}
  _parseFaissIVFFlat() {
    this.index = index;
  }
  _parseHNSWlibHNSW() {
    this.index = index;
  }
}
