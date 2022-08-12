import { INDEX_TYPE } from 'Types';
import { initLoadingStyle, renderLoading } from './loading';
import HnswView from './HnswView';
import IvfflatView from './IvfflatView';

const viewHandlerMap = {
  [INDEX_TYPE.hnsw]: HnswView,
  [INDEX_TYPE.ivf_flat]: IvfflatView,
};

const defaultViewParams = {
  width: 1000,
  height: 600,
  canvasScale: 3,
};

export default class FederView {
  constructor({ domSelector, viewParams }) {
    this.domSelector = domSelector;
    this.viewParams = Object.assign({}, defaultViewParams, viewParams);

    this.viewHandler = null;

    // this.initDom();
    initLoadingStyle();
  }
  initDom() {
    const dom = document.createElement('div');
    dom.id = `feder-dom-${Math.floor(Math.random() * 100000)}`;
    const { width, height } = this.viewParams;
    const domStyle = {
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      // boxShadow: '0 0 5px #ccc',
      // borderRadius: '10px',
    };
    Object.assign(dom.style, domStyle);
    renderLoading(dom, width, height);

    if (this.domSelector) {
      const domContainer = document.querySelector(this.domSelector);
      domContainer.innerHTML = '';
      domContainer.appendChild(dom);
    }

    return dom;
  }
  initView({ indexType, indexMeta, getVectorById }) {
    if (indexType in viewHandlerMap) {
      this.view = new viewHandlerMap[indexType]({
        indexMeta,
        viewParams: this.viewParams,
        getVectorById,
      });
    } else throw `No view handler for ${indexType}`;
  }
  overview(initCoreAndViewPromise) {
    const dom = this.initDom();
    initCoreAndViewPromise.then(() => {
      this.view.overview(dom);
    });

    return dom;
  }
  search({
    searchRes = null,
    targetMediaUrl = null,
    searchResPromise = null,
  } = {}) {
    const dom = this.initDom();

    if (searchResPromise) {
      searchResPromise.then(({ searchRes, targetMediaUrl }) => {
        this.view.search(dom, {
          searchRes,
          targetMediaUrl,
        });
      });
    } else {
      this.view.search(dom, {
        searchRes,
        targetMediaUrl,
      });
    }

    return dom;
  }

  switchSearchView(searchViewType) {
    try {
      this.view.switchSearchView(searchViewType);
    } catch (e) {
      console.log('Not Support', e);
    }
  }
}
