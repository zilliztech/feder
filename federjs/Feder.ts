import * as d3 from 'd3';
import {
  EActionType,
  EIndexType,
  ESourceType,
  EViewType,
  TId,
  TSearchParams,
  TVec,
} from 'Types';
import { TAcitonData } from 'Types/visData';
import { finishLoading, renderLoading, initLoadingStyle } from 'Utils/loading';
import { FederIndex, FederLayout, FederView } from '.';

export class Feder {
  domSelector: string;
  initFederPromise: Promise<void>;
  federIndex: FederIndex;
  viewParams: any;
  federLayout: FederLayout;
  indexType: EIndexType;
  viewType: EViewType;
  searchParams: TSearchParams;
  constructor({
    source,
    filePath,
    domSelector,
    viewParams = {},
  }: {
    filePath: string;
    source: ESourceType;
    domSelector?: string;
    viewType?: EViewType;
    viewParams?: any;
  }) {
    this.domSelector = domSelector;
    const { viewType = EViewType.default } = viewParams;
    this.viewType = viewType;

    if (!viewParams.mediaContent && !!viewParams.mediaCallback)
      viewParams.mediaContent = viewParams.mediaCallback;
    this.viewParams = viewParams;

    this.searchParams = {};

    this.initFederPromise = new Promise(async (resolve) => {
      const arrayBuffer = await fetch(filePath).then((res) =>
        res.arrayBuffer()
      );
      this.federIndex = new FederIndex(source, arrayBuffer);
      this.indexType = await this.federIndex.getIndexType();
      this.federLayout = new FederLayout(this.federIndex);
      resolve();
    });

    initLoadingStyle();
  }
  initDom() {
    const { width = 800, height = 480 } = this.viewParams;
    const node = d3
      .create('div')
      .style('position', 'relative')
      .style('width', width + 'px')
      .style('height', height + 'px')
      .node();
    renderLoading(node, width, height);
    return node;
  }
  overview() {
    const node = this.initDom();

    this.executeAction(node, EActionType.overview);

    return node;
  }
  search(target: TVec = null, targetMedia: string = null) {
    const node = this.initDom();

    this.executeAction(node, EActionType.search, {
      target,
      targetMedia,
      searchParams: this.searchParams,
    });

    return node;
  }

  executeAction(
    node: HTMLElement,
    actionType: EActionType,
    actionData: TAcitonData = null
  ) {
    new Promise<void>(async (resolve) => {
      await this.initFederPromise;
      const visData = await this.federLayout.getVisData({
        actionType,
        actionData,
        viewType: this.viewType,
        layoutParams: this.viewParams,
      });
      const federView = new FederView(visData, this.viewParams);
      (node as any).federView = federView;
      finishLoading(node);
      node.appendChild(federView.node);
      federView.render();

      resolve();
    });

    if (this.domSelector) {
      const container = d3.select(this.domSelector);
      // container.selectAll('*').remove();
      (container.node() as HTMLElement).appendChild(node);
    }
  }
  searchById(id: TId) {
    const node = this.initDom();

    new Promise(async () => {
      await this.initFederPromise;
      const target = await this.federIndex.getVectorById(id);
      const targetMedia = this.viewParams.mediaContent(id);
      this.executeAction(node, EActionType.search, {
        target,
        targetMedia,
        searchParams: this.searchParams,
      });
    });

    return node;
  }
  searchByRandTestVec() {
    const node = this.initDom();

    new Promise(async () => {
      await this.initFederPromise;
      const idCount = await this.federIndex.getVectorsCount();
      const id = Math.floor(Math.random() * idCount);
      const target = await this.federIndex.getVectorById(id);
      const targetMedia = this.viewParams.mediaContent(id);
      this.executeAction(node, EActionType.search, {
        target,
        targetMedia,
        searchParams: this.searchParams,
      });
    });

    return node;
  }
  setSearchParams(params: TSearchParams) {
    this.searchParams = Object.assign({}, this.searchParams, params);
    return this;
  }
}

export default Feder;
