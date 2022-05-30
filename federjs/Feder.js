import FederCore from './FederCore';
import FederView from './FederView';
export default class Feder {
  constructor({
    core = null,
    filePath = '',
    source = '',
    domSelector,
    viewParams = {},
  }) {
    this.federView = new FederView({ domSelector, viewParams });
    this.viewParams = viewParams;
    if (!core) {
      this.initCorePromise = fetch(filePath)
        .then((res) => res.arrayBuffer())
        .then((data) => {
          core = new FederCore({ data, source, viewParams });
          this.core = core;
          const indexType = core.indexType;
          const indexMeta = core.indexMeta;
          const getVectorById = (id) =>
            id in core.id2vector ? core.id2vector[id] : null;
          this.federView.initView({
            indexType,
            indexMeta,
            getVectorById,
          });
        });
    } else {
      // todo
    }
  }

  async overview() {
    this.initCorePromise && (await this.initCorePromise);
    this.federView.overview();
  }
  async search(target = null, targetMediaUrl = null) {
    this.initCorePromise && (await this.initCorePromise);
    if (target) {
      const searchRes = this.core.search(target);
      console.log(searchRes);
      this.searchRes = searchRes;
      this.federView.search({ searchRes, targetMediaUrl });
    } else {
      if (!this.searchRes) {
        console.error('No target');
        return;
      }
      const searchRes = this.searchRes;
      const targetMediaUrl = this.targetMediaUrl;
      this.federView.search({ searchRes, targetMediaUrl });
    }
  }
  async searchById(testId = null) {
    this.initCorePromise && (await this.initCorePromise);
    if (!(testId in this.core.id2vector)) {
      console.log('Invalid Id');
    } else {
      const testVec = this.core.id2vector[testId];
      const targetMediaUrl =
        this.viewParams && this.viewParams.mediaCallback
          ? this.viewParams.mediaCallback(testId)
          : null;
      this.search(testVec, targetMediaUrl);
    }
  }
  async searchRandTestVec() {
    this.initCorePromise && (await this.initCorePromise);
    let [testId, testVec] = await this.core.getTestIdAndVec();
    while (isNaN(testId)) {
      [testId, testVec] = await this.core.getTestIdAndVec();
    }
    console.log('random test vector:', testId, testVec);
    const targetMediaUrl =
      this.viewParams && this.viewParams.mediaCallback
        ? this.viewParams.mediaCallback(testId)
        : null;
    this.search(testVec, targetMediaUrl);
  }

  async setSearchParams(params) {
    this.initCorePromise && (await this.initCorePromise);
    if (!this.core) {
      console.error('No feder-core');
    } else {
      this.core.setSearchParams(params);
    }
  }
}
