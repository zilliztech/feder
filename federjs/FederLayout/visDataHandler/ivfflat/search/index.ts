import { TSearchRecordsIvfflat } from 'Types/searchRecords';
import {
  TLayoutParamsIvfflat,
  TVisDataIvfflatOverviewCluster,
} from 'Types/visData';
import ivfflatSearchViewLayoutCoarseVoronoi from './coarseVoronoi';
import ivfflatSearchViewLayoutFinePolar from './finePolar';
import ivfflatSearchViewLayoutFineProject from './fineProject';

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
      targetNode,
    });

    resolve({ searchViewClusters, searchViewNodes, targetNode, polarOrigin });
  });
};
export default IvfflatSearchViewLayout;
