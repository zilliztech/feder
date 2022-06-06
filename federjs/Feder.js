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

  get node() {
    return this.federView.dom;
  }
  overview() {
    this.federView.overview(this.initCorePromise);

    return this.node;
  }
  search(target = null, targetMediaUrl = null) {
    if (target) {
      const searchResPromise = this.initCorePromise.then(() => {
        const searchRes = this.core.search(target);
        console.log(searchRes);
        this.searchRes = searchRes;
        this.targetMediaUrl = targetMediaUrl;
        return { searchRes, targetMediaUrl };
      });
      this.federView.search({ searchResPromise });
    } else {
      if (!this.searchRes) {
        console.error('No target');
        return;
      }
      const searchRes = this.searchRes;
      const targetMediaUrl = this.targetMediaUrl;
      this.federView.search({ searchRes, targetMediaUrl });
    }

    return this.node;
  }
  searchById(testId) {
    const searchResPromise = this.initCorePromise.then(() => {
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
    const searchResPromise = this.initCorePromise.then(() => {
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
    this.initCorePromise && (await this.initCorePromise);
    if (!this.core) {
      console.error('No feder-core');
    } else {
      this.core.setSearchParams(params);
    }
  }
}
