import * as d3 from 'd3';

export default function SVFinePolarHandler() {
  return new Promise((resolve) => {
    const nodes = this.searchRes.fine;

    const polarMaxR = this.polarMaxR;
    const polarOrigin = this.polarOrigin;
    const distances = nodes
      .map((node) => node.dis)
      .filter((a) => a > 0)
      .sort();
    const minDis = distances.length > 0 ? distances[0] : 0;
    const maxDis =
      distances.length > 0
        ? distances[Math.round((distances.length - 1) * 0.98)]
        : 0;
    const r = d3
      .scaleLinear()
      .domain([minDis, maxDis])
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
      .alphaDecay(1 - Math.pow(0.001, 1 / this.forceIterations / 2))
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((_) => this.nonTopKNodeR * this.canvasScale)
          .strength(0.4)
      )
      .force('r', d3.forceRadial((node) => node.r, ...polarOrigin).strength(1))
      .on('end', () => {
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
      });
  });
}
