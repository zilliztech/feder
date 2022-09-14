import * as d3 from 'd3';
import getProjector from 'FederLayout/projector';
import { TCoord, TVec } from 'Types';
import { TSearchRecordsIvfflat } from 'Types/searchRecords';
import {
  TLayoutParamsIvfflat,
  TVisDataIvfflatSearchViewNode,
  TVisDataIvfflatSearchViewTargetNode,
} from 'Types/visData';

export const ivfflatSearchViewLayoutFineProject = ({
  searchViewNodes,
  searchRecords,
  layoutParams,
  targetNode,
}: {
  searchViewNodes: TVisDataIvfflatSearchViewNode[];
  searchRecords: TSearchRecordsIvfflat;
  layoutParams: TLayoutParamsIvfflat;
  targetNode: TVisDataIvfflatSearchViewTargetNode;
}) =>
  new Promise<void>((resolve) => {
    const {
      projectPadding,
      staticPanelWidth,
      width,
      height,
      canvasScale,
      fineSearchWithProjection,
      projectMethod,
      projectParams,
    } = layoutParams;
    const projector = fineSearchWithProjection
      ? getProjector({
          method: projectMethod,
          params: projectParams,
        })
      : (vecs: TVec[]) =>
          vecs.map((_) => [Math.random(), Math.random()] as TCoord);
    const searchviewNodesProjection = projector([
      ...searchRecords.fineSearchRecords.map((node) => node.vector),
      searchRecords.target,
    ]);
    searchViewNodes.forEach((node, i) => {
      node.projection = searchviewNodesProjection[i];
    });

    const xRange = targetNode.isLeft_coarseLevel
      ? [
          projectPadding[3] * canvasScale,
          (width - projectPadding[1]) * canvasScale -
            staticPanelWidth * canvasScale,
        ]
      : [
          projectPadding[3] * canvasScale + staticPanelWidth * canvasScale,
          (width - projectPadding[1]) * canvasScale,
        ];
    const x = d3
      .scaleLinear()
      .domain(d3.extent(searchViewNodes, (node) => node.projection[0]))
      .range(xRange);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(searchViewNodes, (node) => node.projection[1]))
      .range([
        projectPadding[0] * canvasScale,
        (height - projectPadding[2]) * canvasScale,
      ]);
    searchViewNodes.forEach((node) => {
      node.projectPos = [x(node.projection[0]), y(node.projection[1])];
    });
    const targetNodeProjection =
      searchviewNodesProjection[searchviewNodesProjection.length - 1];
    targetNode.projectPos = [
      x(targetNodeProjection[0]),
      y(targetNodeProjection[1]),
    ];
    resolve();
  });

export default ivfflatSearchViewLayoutFineProject;
