import SVCoarseVoronoiHandler from './SVCoarseVoronoiHandler';
import SVFinePolarHandler from './SVFinePolarHandler';
import SVFineProjectHandler from './SVFineProjectHandler';

export default function searchViewLayoutHandler(
  searchRes,
  searchViewLayoutData,
  federView
) {
  return new Promise(async (resolve) => {
    searchRes.coarse.forEach(
      ({ id, dis }) => (searchViewLayoutData.clusters[id].dis = dis)
    );
    await SVCoarseVoronoiHandler(searchRes, searchViewLayoutData, federView);
    await SVFinePolarHandler(searchRes, searchViewLayoutData, federView);
    SVFineProjectHandler(searchRes, searchViewLayoutData, federView);
    // console.log('searchViewLayoutData', searchViewLayoutData);
    resolve();
  });
}
