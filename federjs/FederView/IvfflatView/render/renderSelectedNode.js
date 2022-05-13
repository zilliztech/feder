import { SEARCH_VIEW_TYPE } from 'Types';
import {
  hexWithOpacity,
  drawCircle,
  whiteColor,
} from 'Utils/renderUtils';

export default function renderSelectedNode({
  ctx,colorScheme,
  hoveredNode,
  searchViewType,
  hoveredNodeR,
  canvasScale,
  hoveredNodeOpacity,
  hoveredNodeStrokeWidth,
}) {
  const circle =
    searchViewType === SEARCH_VIEW_TYPE.polar
      ? [
          ...hoveredNode.polarPos,
          hoveredNodeR * canvasScale,
          hoveredNode.polarOrder,
        ]
      : [
          ...hoveredNode.projectPos,
          hoveredNodeR * canvasScale,
          hoveredNode.polarOrder,
        ];
  drawCircle({
    ctx,
    circles: [circle],
    hasFill: true,
    fillStyle: hexWithOpacity(colorScheme[circle[3]], hoveredNodeOpacity),
    hasStroke: true,
    lineWidth: hoveredNodeStrokeWidth * canvasScale,
    strokeStyle: hexWithOpacity(whiteColor, 1),
  });
}
