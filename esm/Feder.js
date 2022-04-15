/* Feder class */

import FederCore from './FederCore/index.js';
import FederView from './FederView/index.js';
import { STEP, STEP_TYPE } from './Utils/config.js';

export default class Feder {
  constructor({
    core = null,
    data = '',
    source = '',
    projectParams = {},

    dom,
    viewParams = {},
  } = {}) {
    // console.info('feder initialized');
    if (!core) {
      console.log('no core found, create a new one');
      core = new FederCore({ data, source, projectParams });
    }
    this.core = core;
    this.dom = dom;
    this.viewParams = viewParams;
    this.initFederView();
  }
  getTestIdAndVec() {
    return this.core.getTestIdAndVec();
  }
  setSearchParams(params) {
    this.core.setSearchParams(params);
  }
  setProjectParams(params) {
    this.core.setProjectParams(params);
  }
  initFederView() {
    const getVectorById = (id) => {
      if (id in this.core.id2vector) {
        return [...this.core.id2vector[id]];
      } else return null;
    };
    this.federView = new FederView({
      indexType: this.core.indexType,
      indexMeta: this.core.indexMeta,
      dom: this.dom,
      getVectorById,
      ...this.viewParams,
    });
  }

  overview() {
    this.federView.overview();
  }
  resetOverview() {
    this.federView.resetOverview();
  }
  search(target = null) {
    if (target) {
      const searchRes = this.core.search(target);
      this.searchRes = searchRes;
      this.federView.search({ searchRes });
    } else {
      if (!this.searchRes) {
        console.error('No target');
        return;
      }
      const searchRes = this.searchRes;
      this.federView.search({ searchRes });
    }
  }
  switchStep(step, stepType = null) {
    this.federView.switchStep(step, stepType);
  }
  coarseSearch() {
    this.federView.switchStep(STEP.CoarseSearch);
  }
  fineSearch(stepType) {
    if (!STEP_TYPE[stepType] || STEP_TYPE[stepType] === STEP_TYPE.Init) {
      stepType = STEP_TYPE.Polar;
      console.log('Illegal Step_Type, default Polar');
    }
    this.federView.switchStep(STEP.FineSearch, stepType);
  }
}
