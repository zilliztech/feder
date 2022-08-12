import { dist2 } from 'Utils';
import * as d3 from 'd3';

export default function mouse2node({ nodesPos, x, y, bias }) {
  const minIndex = d3.minIndex(nodesPos, (nodePos) => dist2(nodePos, [x, y]));

  return dist2(nodesPos[minIndex], [x, y]) > Math.pow(bias, 2) ? -1 : minIndex;
}
