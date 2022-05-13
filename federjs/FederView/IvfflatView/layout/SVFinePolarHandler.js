import * as d3 from 'd3';

export default function SVFinePolarHandler() {
  const nodes = this.searchRes.fine;
  // const { isLeft_coarseLevel } = this.targetNode;
  // console.log('isLeft_coarseLevel', isLeft_coarseLevel);

  const polarMaxR = this.polarMaxR;
  const polarOrigin = this.polarOrigin;
  const r = d3
    .scaleLinear()
    .domain([
      d3.min(
        nodes.filter((node) => node.dis > 0),
        (node) => node.dis
      ),
      d3.max(nodes, (node) => node.dis) * 0.95,
    ])
    .range([polarMaxR * 0.2, polarMaxR])
    .clamp(true);

  nodes.forEach((node) => {
    const cluster = this.clusterId2cluster[node.listId];
    const { polarOrder, SVNextLevelPos } = cluster;
    node.polarOrder = polarOrder;
    let randAngle = Math.random() * Math.PI * 2;
    let randBias = [Math.sin, Math.cos].map(
      (f) => cluster.r * Math.random() * 0.7 * f(randAngle)
    );
    node.voronoiPos = SVNextLevelPos.map((d, i) => d + randBias[i]);
    node.x = node.voronoiPos[0];
    node.y = node.voronoiPos[1];
    node.r = r(node.dis);
  });

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'collide',
      d3
        .forceCollide()
        .radius((_) => this.nonTopKNodeR * this.canvasScale)
        .strength(0.4)
    )
    .force('r', d3.forceRadial((node) => node.r, ...polarOrigin).strength(1));

  return new Promise((resolve) => {
    setTimeout(() => {
      simulation.stop();
      nodes.forEach((node) => {
        node.polarPos = [node.x, node.y];
      });
      this.nodes = nodes;
      this.topKNodes = this.nodes.filter((node) =>
        this.searchRes.fsResIds.find((id) => id == node.id)
      );
      this.nonTopKNodes = this.nodes.filter(
        (node) => !this.searchRes.fsResIds.find((id) => id == node.id)
      );
      resolve();
    }, this.nodeCollisionForceTime);
  });
}
