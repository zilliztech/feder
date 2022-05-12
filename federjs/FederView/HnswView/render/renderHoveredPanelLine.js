import { drawPath, hexWithOpacity, ZYellow } from 'Utils/renderUtils';

export default function renderHoveredPanelLine({
  ctx,
  x,
  y,
  isLeft,
  hoveredPanelLineWidth,
  HoveredPanelLine_1_x,
  HoveredPanelLine_1_y,
  HoveredPanelLine_2_x,
  canvasScale,
}) {
  const k = isLeft ? -1 : 1;
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
