import * as Utils from './Utils.js';

/* Feder core class */
export default class Feder_core {
  constructor({ file, type, project_params }) {
    console.info('feder-core initialized');
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
    Utils.project(...arguments);
  }
  setProjectParams() {}
  _parseFaissIVFFlat() {
    this.index = index;
  }
  _parseHNSWlibHNSW() {
    this.index = index;
  }
}
