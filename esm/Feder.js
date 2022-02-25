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
    // this.setViewParams(viewParams);
  }
  update() {
    // update core

    // render
    this._render();
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
  setViewParams(viewParams) {
    this.fenderView = new FederView({
      indexType: this.core.indexType,
      indexMeta: this.core.indexMeta,
      dom: this.dom,
      ...viewParams,
    });
  }

  overview() {
    this.fenderView.overview();
  }
  resetOverview() {
    this.fenderView.resetOverview();
  }
  search(target) {
    const searchRes = this.core.search(target);
    this.searchRes = searchRes;
    console.log('search res', searchRes);
    this.fenderView.search({ searchRes });
    return searchRes;
  }
  switchStep(step, stepType = null) {
    this.fenderView.switchStep(step, stepType);
  }
  coarseSearch() {
    this.fenderView.switchStep(STEP.CoarseSearch);
  }
  fineSearch(stepType) {
    if (!STEP_TYPE[stepType] || STEP_TYPE[stepType] === STEP_TYPE.Init) {
      stepType = STEP_TYPE.Polar;
      console.log('Illegal Step_Type, default Polar');
    }
    this.fenderView.switchStep(STEP.FineSearch, stepType);
  }
}

/* Feder

let feder = new Feder(data, dom);

feder.setProjectParams(params);
feder.setViewParams(params);
feder.setSearchParams(params);

Feder.overview();

Feder.search(target);

*/
