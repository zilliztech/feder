import { TVisDataAll } from 'Types/visData';
import { TViewParams, EIndexType, EActionType, EViewType } from 'Types';

import HnswSearchHnsw3dViewHandler from './hnswView/HnswSearchHnsw3dViewHandler';
import HnswSearchViewHandler from './hnswView/HnswSearchViewHandler';
import ViewHandler from './ViewHandler';

const viewHandlerMap = {
  [EIndexType.hnsw + EActionType.search + EViewType.hnsw3d]:
    HnswSearchHnsw3dViewHandler,
  [EIndexType.hnsw + EActionType.search + EViewType.default]:
    HnswSearchViewHandler,
};
export class FederView {
  node: HTMLElement;
  view: ViewHandler;
  constructor(
    { indexType, actionType, viewType, visData }: TVisDataAll,
    viewParams: TViewParams
  ) {
    this.view = new viewHandlerMap[indexType + actionType + viewType](
      visData,
      viewParams
    );
  }

  render() {
    this.view.render();
  }
}
