import FederCore from './FederCore';
import FederView from './FederView';
import { FEDER_CORE_REQUEST } from 'federCoreServer/config.js';

export default class Feder {
  constructor({
    coreUrl = null,
    filePath = '',
    source = '',
    domSelector = null,
    viewParams = {},
  }) {
    this.federView = new FederView({ domSelector, viewParams });
    this.viewParams = viewParams;
    if (!coreUrl) {
      this.initCoreAndViewPromise = fetch(filePath, { mode: 'cors' })
        .then((res) => res.arrayBuffer())
        .then((data) => {
          const core = new FederCore({ data, source, viewParams });
          this.core = core;
          const indexType = core.indexType;
          const indexMeta = core.indexMeta;
          const getVectorById = (id) =>
            id in core.id2vector ? core.id2vector[id] : null;
          this.core.getVectorById = getVectorById;
          this.federView.initView({
            indexType,
            indexMeta,
            getVectorById,
          });
        });
    } else {
      const getUrl = (path) => `${coreUrl}/${path}?`;

      const requestData = (path, params = {}) =>
        fetch(getUrl(path) + new URLSearchParams(params), {
          mode: 'cors',
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.message === 'succeed') return res.data;
            else throw new Error(res);
          });

      this.initCoreAndViewPromise = new Promise(async (resolve) => {
        const indexType = await requestData(FEDER_CORE_REQUEST.get_index_type);
        const indexMeta = await requestData(FEDER_CORE_REQUEST.get_index_meta);
        const getVectorById = (id) =>
          requestData(FEDER_CORE_REQUEST.get_vector_by_id, { id });
        this.core = {
          indexType,
          indexMeta,
          getVectorById,
          getTestIdAndVec: () =>
            requestData(FEDER_CORE_REQUEST.get_test_id_and_vector),
          search: (target) =>
            requestData(FEDER_CORE_REQUEST.search, { target }),
          setSearchParams: (params) =>
            requestData(FEDER_CORE_REQUEST.set_search_params, params),
        };
        this.federView.initView({ indexType, indexMeta, getVectorById });
        resolve();
      });
    }

    this.setSearchParamsPromise = null;
  }

  overview() {
    return this.federView.overview(this.initCoreAndViewPromise);
  }
  search(target = null, targetMediaUrl = null) {
    if (target) {
      const searchResPromise = Promise.all([
        this.initCoreAndViewPromise,
        this.setSearchParamsPromise,
      ]).then(async () => {
        const searchRes = await this.core.search(target);
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
    const searchResPromise = this.initCoreAndViewPromise.then(async () => {
      const testVec = await this.core.getVectorById(testId);
      const targetMediaUrl =
        this.viewParams && this.viewParams.mediaCallback
          ? this.viewParams.mediaCallback(testId)
          : null;
      const searchRes = await this.core.search(testVec);
      console.log(searchRes);
      this.searchRes = searchRes;
      return { searchRes, targetMediaUrl };
    });
    return this.federView.search({ searchResPromise });
  }
  searchRandTestVec() {
    const searchResPromise = new Promise(async (resolve) => {
      this.initCoreAndViewPromise && (await this.initCoreAndViewPromise);
      let { testId, testVec } = await this.core.getTestIdAndVec();
      while (isNaN(testId)) {
        [testId, testVec] = await this.core.getTestIdAndVec();
      }
      console.log('random test vector:', testId, testVec);
      const targetMediaUrl =
        this.viewParams && this.viewParams.mediaCallback
          ? this.viewParams.mediaCallback(testId)
          : null;
      const searchRes = await this.core.search(testVec);
      console.log(searchRes);
      this.searchRes = searchRes;
      resolve({ searchRes, targetMediaUrl });
    });

    return this.federView.search({ searchResPromise });
  }

  setSearchParams(params) {
    this.setSearchParamsPromise = new Promise(async (resolve) => {
      this.initCoreAndViewPromise && (await this.initCoreAndViewPromise);
      if (!this.core) {
        console.error('No feder-core');
      } else {
        await this.core.setSearchParams(params);
      }
      resolve();
    });
    return this;
  }
}
