import { drawPath, hexWithOpacity, ZYellow } from 'Utils/renderUtils';

const renderHoverLine = (
  ctx,
  { hoveredNode, hoveredLevel, clickedNode, clickedLevel },
  {
    width,
    padding,
    hoveredPanelLineWidth,
    HoveredPanelLine_1_x,
    HoveredPanelLine_1_y,
    HoveredPanelLine_2_x,
    canvasScale,
  }
) => {
  let isLeft = true;
  let endX = 0;
  let endY = 0;
  if (!!hoveredNode) {
    const [x, y] = hoveredNode.overviewPosLevels[hoveredLevel];
    const originX = (width - padding[1] - padding[3]) / 2 + padding[3];
    isLeft = !clickedNode
      ? originX > x
      : clickedNode.overviewPosLevels[clickedLevel][0] > x;
    const k = isLeft ? -1 : 1;
    endX =
      x +
      HoveredPanelLine_1_x * canvasScale * k +
      HoveredPanelLine_2_x * canvasScale * k;
    endY = y + HoveredPanelLine_1_y * canvasScale * k;
    const points = [
      [x, y],
      [
        x + HoveredPanelLine_1_x * canvasScale * k,
        y + HoveredPanelLine_1_y * canvasScale * k,
      ],
      [
        x +
          HoveredPanelLine_1_x * canvasScale * k +
          HoveredPanelLine_2_x * canvasScale * k,
        y + HoveredPanelLine_1_y * canvasScale * k,
      ],
    ];
    drawPath({
      ctx,
      points,
      withZ: false,
      hasStroke: true,
      strokeStyle: hexWithOpacity(ZYellow, 1),
      lineWidth: hoveredPanelLineWidth * canvasScale,
    });
  }
  return { isLeft, endX, endY };
};

export default renderHoverLine;
