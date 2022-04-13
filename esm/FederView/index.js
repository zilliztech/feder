import { INDEX_TYPE, VIEW_TYPE } from '../Utils/config.js';
import IVFFlatView from './IVFFlatView.js';
import HnswView from './HnswView.js';

const viewMap = {
  [INDEX_TYPE.IVFFlat]: IVFFlatView,
  [INDEX_TYPE.HNSW]: HnswView,
};

export default class FederView {
  constructor({
    indexType,
    indexMeta,
    getVectorById,
    dom,
    width = 800,
    height = 600,
    ...viewParams
  }) {
    this.indexType = null;
    this.view = null;

    this.dom = dom;
    this.indexMeta = indexMeta;

    this.initView({ indexType, width, height, getVectorById, ...viewParams });
    this.computeIndexOverview({ indexMeta });
  }
  initView({ indexType, width, height, ...viewParams }) {
    if (!viewMap[indexType]) {
      console.error('Illegal INDEX_TYPE -', indexType);
      return;
    }
    if (indexType !== this.indexType) {
      this.view = new viewMap[indexType]({ width, height, ...viewParams });
      this.setViewType(VIEW_TYPE.Overview);
    }
  }
  setViewType(viewType) {
    if (!this.view) {
      console.error('View Not Found.');
      return;
    }
    // if (!VIEW_TYPE[viewType]) {
    //   console.error('Illegal ViewType -', viewType);
    //   return;
    // }
    if (viewType !== this.viewType) {
      this.viewType = viewType;
    }
  }

  computeIndexOverview({ indexMeta }) {
    this.view.computeIndexOverview({ indexMeta });
  }

  search({ searchRes }) {
    this.view.search({ searchRes, dom: this.dom });
  }

  overview() {
    this.view.overview({ dom: this.dom });
  }
  resetOverview() {
    this.computeIndexOverview({ indexMeta: this.indexMeta });
    this.overview();
  }
  switchStep(...params) {
    if (this.view.supportSwitchStep) {
      this.view.switchStep(...params);
    } else {
      console.error(`No Steps - ${this.indexType}`);
    }
  }
}
