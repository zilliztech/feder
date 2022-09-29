import { TInfoPanelContentItem } from 'FederView/InfoPanel';
import { EMediaType, EStepType } from 'Types';
import IvfflatSearchView from '.';

export default async function updateStaticPanel(
  this: IvfflatSearchView,
  newStepType: EStepType
) {
  const headerContent = {
    title: 'IVF_Flat - Search',
  };
  const { targetMedia } = this.actionData;
  let mediaContent = null;
  if (!!targetMedia) {
    mediaContent = {} as TInfoPanelContentItem;
    if (this.viewParams.mediaType === EMediaType.image)
      mediaContent.image = targetMedia;
    else if (this.viewParams.mediaType === EMediaType.text)
      mediaContent.text = targetMedia;
  }
  const switchViewOptionContents = [
    {
      option: {
        isActive: newStepType === EStepType.voronoi,
        text: `Coarse Search`,
        callback: () => this.switchView(EStepType.voronoi),
      },
    },
    {
      option: {
        isActive: newStepType === EStepType.polar,
        text: `Fine Search (Distance)`,
        callback: () => this.switchView(EStepType.polar),
      },
    },
    {
      option: {
        isActive: newStepType === EStepType.project,
        text: `Fine Search (project)`,
        callback: () => this.switchView(EStepType.project),
      },
    },
  ] as TInfoPanelContentItem[];

  let viewContents = [] as TInfoPanelContentItem[];
  if (newStepType === EStepType.voronoi) {
    viewContents = [
      {
        text: `${this.ntotal} vectors, divided into ${this.nlist} clusters.`,
      },
      {
        text: `Find the ${this.nprobe} (nprobe = ${this.nprobe}) closest clusters.`,
      },
      ...this.searchViewClusters
        .filter((cluster) => cluster.inNprobe)
        .map((cluster) => ({
          text: `cluster-${cluster.clusterId} (${
            cluster.count
          } vectors) dist: ${cluster.distance.toFixed(3)}.`,
        })),
    ];
  } else {
    const k = this.actionData.searchParams.k;
    const numNprobeTotalVectors = this.searchViewClusters
      .filter((cluster) => cluster.inNprobe)
      .reduce((acc, cluster) => acc + cluster.count, 0);

    const description =
      newStepType === EStepType.polar
        ? `Find the ${k} (k=${k}) vectors closest to the target ` +
          `from these ${this.nprobe} (nprobe=${this.nprobe}) clusters, ` +
          `${numNprobeTotalVectors} vectors in total.`
        : `Projection of all ${numNprobeTotalVectors} vectors ` +
          `in the ${this.nprobe} (nprobe=${this.nprobe}) clusters use UMAP.`;

    let mediaContents = [] as TInfoPanelContentItem[];
    const { mediaType, mediaContent } = this.viewParams;
    if (mediaType === EMediaType.image) {
      const images = this.searchViewNodes
        .filter((node) => node.inTopK)
        .map((node) => mediaContent(node.id));
      mediaContents = [{ images }];
    } else if (mediaType === EMediaType.text) {
      mediaContents = this.searchViewNodes
        .filter((node) => node.inTopK)
        .map((node) => ({ text: mediaContent(node.id) }));
    }
    viewContents = [
      {
        text: description,
      },
      ...mediaContents,
    ];
  }
  this.staticPanel.setContent({
    themeColor: '#FFFFFF',
    hasBorder: true,
    content: [
      headerContent,
      mediaContent,
      ...switchViewOptionContents,
      ...viewContents,
    ].filter((a) => a),
  });

  if (this.targetNode.isLeft_coarseLevel)
    this.staticPanel.setPosition({ left: null, right: '16px' });
  else this.staticPanel.setPosition({ left: '16px' });
}
