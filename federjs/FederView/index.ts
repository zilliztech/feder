import { TVisDataAll } from 'Types/visData';
import { TViewParams, EIndexType, EActionType, EViewType } from 'Types';

import HnswSearchHnsw3dView from './hnswView/HnswSearchHnsw3dView';
import HnswSearchView from './hnswView/HnswSearchView';
import ViewHandler from './ViewHandler';

const viewMap = {
  [EIndexType.hnsw + EActionType.search + EViewType.hnsw3d]:
    HnswSearchHnsw3dView,
  [EIndexType.hnsw + EActionType.search + EViewType.default]:
    HnswSearchView,
};
export class FederView {
  node: HTMLElement;
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

  render() {
    this.view.render();
  }
}
