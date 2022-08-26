import * as d3 from 'd3';
import { TCoord, TId, TVec } from 'Types';
import { TSearchRecordsIvfflat } from 'Types/searchRecords';
import {
  TLayoutParamsIvfflat,
  TVisDataIvfflatOverviewCluster,
  TVisDataIvfflatSearchViewCluster,
  TVisDataIvfflatSearchViewNode,
  TVisDataIvfflatSearchViewTargetNode,
} from 'Types/visData';
import ivfflatSearchViewLayoutCoarseVoronoi from './coarseVoronoi';
import ivfflatSearchViewLayoutFinePolar from './finePolar';
import { getProjector } from 'FederLayout/projector';

export const IvfflatSearchViewLayout = (
  overviewClusters: TVisDataIvfflatOverviewCluster,
  searchRecords: TSearchRecordsIvfflat,
  layoutParams: TLayoutParamsIvfflat
) => {
  return new Promise(async (resolve) => {
    const { searchViewClusters, targetNode, polarOrigin, polarMaxR } =
      await ivfflatSearchViewLayoutCoarseVoronoi(
        overviewClusters,
        searchRecords,
        layoutParams
      );
    const searchViewNodes = await ivfflatSearchViewLayoutFinePolar({
      searchViewClusters,
      searchRecords,
      layoutParams,
      polarOrigin,
      polarMaxR,
    });

    await ivfflatSearchViewLayoutFineProject({
      searchViewNodes,
      searchRecords,
      layoutParams,
    });

    resolve({ searchViewClusters, searchViewNodes, targetNode, polarOrigin });
  });
};
export default IvfflatSearchViewLayout;


