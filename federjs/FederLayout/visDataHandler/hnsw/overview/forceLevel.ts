import * as d3 from 'd3';
import { TForceLink } from 'Types';
import { TVisDataHnswGraphNode } from 'Types/visData';

export default function forceLevel({
  nodes,
  links,
  numForceIterations,
}: {
  nodes: TVisDataHnswGraphNode[];
  links: TForceLink[];
  numForceIterations: number;
}) {
  return new Promise<void>((resolve) => {
    const simulation = d3
      .forceSimulation(nodes)
      .alphaDecay(1 - Math.pow(0.001, (1 / numForceIterations) * 2))
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: TVisDataHnswGraphNode) => d.id)
          .strength(1)
      )
      .force('center', d3.forceCenter(0, 0))
      .force('charge', d3.forceManyBody().strength(-500))
      .on('end', () => {
        resolve();
      });
  });
}
