import SVCoarseVoronoiHandler from './SVCoarseVoronoiHandler';
import SVFinePolarHandler from './SVFinePolarHandler';
import SVFineProjectHandler from './SVFineProjectHandler';

export default function searchViewLayoutHandler({ searchRes }) {
  const SVCoarsePromise = new Promise(async (resolve) => {
    this.overviewInitPromise && (await this.overviewInitPromise);
    this.searchRes = searchRes;
    searchRes.coarse.forEach(({ id, dis }) => (this.clusters[id].dis = dis));
    this.nprobeClusters = this.clusters.filter((cluster) =>
      this.searchRes.csResIds.find((id) => id == cluster.clusterId)
    );
    this.nonNprobeClusters = this.clusters.filter(
      (cluster) =>
        !this.searchRes.csResIds.find((id) => id == cluster.clusterId)
    );
    await SVCoarseVoronoiHandler.call(this);
    resolve();
  });

  SVCoarsePromise.then(async () => {
    this.SVFinePromise = new Promise(async (resolve) => {
      await SVFinePolarHandler.call(this);
      SVFineProjectHandler.call(this);
      resolve();
    });
  });

  return SVCoarsePromise;
}
