import { TVisDataAll } from 'Types/visData';
import { TViewParams, EIndexType, EActionType, EViewType } from 'Types';

import HnswSearchHnsw3dView from './hnswView/HnswSearchHnsw3dView';
import HnswSearchView from './hnswView/HnswSearchView';
import IvfflatSearchView from './ivfflatView/IvfflatSearchView';
import ViewHandler from './types';

const viewMap = {
  [EIndexType.hnsw + EActionType.search + EViewType.hnsw3d]:
    HnswSearchHnsw3dView,
  [EIndexType.hnsw + EActionType.search + EViewType.default]: HnswSearchView,
  [EIndexType.ivfflat + EActionType.search + EViewType.default]:
    IvfflatSearchView,
};
export class FederView {
  view: ViewHandler;
  constructor(
    { indexType, actionType, viewType, visData }: TVisDataAll,
    viewParams: TViewParams
  ) {
    this.view = new viewMap[indexType + actionType + viewType](
      visData,
      viewParams
    );
  }
  get node() {
    return this.view.node;
  }

  render() {
    this.view.render();
  }
}
