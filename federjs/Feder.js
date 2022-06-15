import FederCore from './FederCore';
import FederView from './FederView';
export default class Feder {
  constructor({
    core = null,
    filePath = '',
    source = '',
    domSelector = null,
    viewParams = {},
  }) {
    this.federView = new FederView({ domSelector, viewParams });
    this.viewParams = viewParams;
    if (!core) {
      this.initCoreAndViewPromise = fetch(filePath)
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

  get node() {
    return this.federView.dom;
  }
  overview() {
    return this.federView.overview(this.initCoreAndViewPromise);
  }
  search(target = null, targetMediaUrl = null) {
    if (target) {
      const searchResPromise = this.initCoreAndViewPromise.then(() => {
        const searchRes = this.core.search(target);
        console.log(searchRes);
        this.searchRes = searchRes;
        this.targetMediaUrl = targetMediaUrl;
        return { searchRes, targetMediaUrl };
      });
      return this.federView.search({ searchResPromise });
    } else {
      if (!this.searchRes) {
        console.error('No target');
        return;
      }
      const searchRes = this.searchRes;
      const targetMediaUrl = this.targetMediaUrl;
      return this.federView.search({ searchRes, targetMediaUrl });
    }
  }
  searchById(testId) {
    const searchResPromise = this.initCoreAndViewPromise.then(() => {
      if (!(testId in this.core.id2vector)) {
        console.error('Invalid Id');
      } else {
        const testVec = this.core.id2vector[testId];
        const targetMediaUrl =
          this.viewParams && this.viewParams.mediaCallback
            ? this.viewParams.mediaCallback(testId)
            : null;
        const searchRes = this.core.search(testVec);
        console.log(searchRes);
        this.searchRes = searchRes;
        return { searchRes, targetMediaUrl };
      }
    });
    this.federView.search({ searchResPromise });

    return this.node;
  }
  searchRandTestVec() {
    const searchResPromise = this.initCoreAndViewPromise.then(() => {
      let [testId, testVec] = this.core.getTestIdAndVec();
      while (isNaN(testId)) {
        [testId, testVec] = this.core.getTestIdAndVec();
      }
      console.log('random test vector:', testId, testVec);
      const targetMediaUrl =
        this.viewParams && this.viewParams.mediaCallback
          ? this.viewParams.mediaCallback(testId)
          : null;
      const searchRes = this.core.search(testVec);
      console.log(searchRes);
      this.searchRes = searchRes;
      return { searchRes, targetMediaUrl };
    });

    this.federView.search({ searchResPromise });

    return this.node;
  }

  async setSearchParams(params) {
    this.initCoreAndViewPromise && (await this.initCoreAndViewPromise);
    if (!this.core) {
      console.error('No feder-core');
    } else {
      this.core.setSearchParams(params);
    }
  }
}
