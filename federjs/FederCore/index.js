import getIndexParser from './parser';
import getMetaHandler from './metaHandler';
import getIndexSearchHandler from './searchHandler';
import getPRojectorHandler from './projector';
import { INDEX_TYPE } from 'Types';
export default class FederCore {
  constructor({
    data, // arraybuffer
    source,
  }) {
    try {
      const index = this.parserIndex(data, source);
      this.index = index;
      this.indexType = index.indexType;

      const { indexMeta, id2vector } = this.extractMeta(index);
      this.indexMeta = indexMeta;
      this.id2vector = id2vector;

      this.indexSearchHandler = getIndexSearchHandler(index.indexType);
    } catch (e) {
      console.log(e);
    }
  }
  parserIndex(data, source) {
    const indexParser = getIndexParser(source);
    const index = indexParser(data);
    return index;
  }
  extractMeta(index) {
    const metaHandler = getMetaHandler(index.indexType);
    const meta = metaHandler(index);
    return meta;
  }
  getTestIdAndVec() {
    const ids = Object.keys(this.id2vector);
    const r = Math.floor(Math.random() * ids.length);
    const testId = ids[r];
    const testVec = this.id2vector[testId];
    return [testId, testVec];
  }

  setSearchParams(params) {
    const newSearchParams = Object.assign({}, this.searchParams, params);
    this.searchParams = newSearchParams;
  }
  search(target) {
    const searchRes = this.indexSearchHandler({
      index: this.index,
      params: this.searchParams,
      target,
    });

    if (this.index.indexType === INDEX_TYPE.ivf_flat) {
      const {
        fineSearchWithProjection = false,
        projectMethod,
        projectParams,
      } = this.searchParams;
      if (fineSearchWithProjection) {
        const ids = searchRes.fine.map((item) => item.id);
        this.initProjector({
          method: projectMethod,
          params: projectParams,
        });
        const projections = this.projectByIds(ids);
        searchRes.fine.map((item, i) => (item.projection = projections[i]));
      }
    }

    return searchRes;
  }

  // todo
  initProjector({ method, params = {} }) {
    this.project = getPRojectorHandler({ method, params });
  }
  projectByIds(ids) {
    const vectors = ids.map((id) => this.id2vector[id]);
    return this.project(vectors);
  }
}
