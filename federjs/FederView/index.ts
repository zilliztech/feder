import { TVisDataAll } from 'Types/visData';
import { TViewParams, EIndexType, EActionType, EViewType } from 'Types';

import HnswSearchHnsw3dView from './hnswView/HnswSearchHnsw3dView';
import HnswSearchView from './hnswView/HnswSearchView';
import HnswOverview from './hnswView/HnswOverview';
import IvfflatSearchView from './ivfflatView/IvfflatSearchView';
import IvfflatOverview from './ivfflatView/IvfflatOverview';
import ViewHandler from './types';

const viewMap = {
  [EIndexType.hnsw + EActionType.search + EViewType.hnsw3d]:
    HnswSearchHnsw3dView,
  [EIndexType.hnsw + EActionType.search + EViewType.default]: HnswSearchView,
  [EIndexType.hnsw + EActionType.overview + EViewType.default]: HnswOverview,
  [EIndexType.ivfflat + EActionType.search + EViewType.default]:
    IvfflatSearchView,
  [EIndexType.ivfflat + EActionType.overview + EViewType.default]:
    IvfflatOverview,
};
export class FederView {
  view: ViewHandler;
  constructor(
    { indexType, actionType, viewType, visData, actionData }: TVisDataAll,
    viewParams: any
  ) {
    this.view = new viewMap[indexType + actionType + viewType](
      visData,
      viewParams,
      actionData
    );
  }
  get node() {
    return this.view.node;
  }

  render() {
    this.view.render();
  }
}
