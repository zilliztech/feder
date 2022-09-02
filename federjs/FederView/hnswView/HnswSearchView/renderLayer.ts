import {
  drawCircles,
  drawPolygons,
  hexWithOpacity,
} from 'FederView/renderUtils2D';
import { TCoord } from 'Types';
import HnswSearchView from '.';

export default function renderLayer(this: HnswSearchView, points: TCoord[]) {
  const {
    canvasScale,
    layerBorderStroke,
    layerBorderOpacity,
    layerBorderStrokeWidth,
    layerGradientStopColors,
    layerDotNum,
    layerDotFill,
    layerDotOpacity,
    layerDotR,
  } = this.viewParams;
  drawPolygons({
    ctx: this.ctx,
    pointsList: [points],
    hasStroke: true,
    isStrokeLinearGradient: false,
    strokeStyle: hexWithOpacity(layerBorderStroke, layerBorderOpacity),
    lineWidth: layerBorderStrokeWidth * canvasScale,
    hasFill: true,
    isFillLinearGradient: true,
    gradientStopColors: layerGradientStopColors,
    gradientPos: [points[1][0], points[0][1], points[3][0], points[2][1]],
  });

  const rightTopVec = [
    points[1][0] - points[0][0],
    points[1][1] - points[0][1],
  ];
  const leftTopVec = [
    points[3][0] - points[0][0],
    points[3][1] - points[0][1],
  ];
  const dots = [];
  for (let i = 0; i < layerDotNum; i++) {
    const rightTopT = i / layerDotNum + 1 / (2 * layerDotNum);
    for (let j = 0; j < layerDotNum; j++) {
      const leftTopT = j / layerDotNum + 1 / (2 * layerDotNum);
      dots.push([
        points[0][0] + rightTopVec[0] * rightTopT + leftTopVec[0] * leftTopT,
        points[0][1] + rightTopVec[1] * rightTopT + leftTopVec[1] * leftTopT,
        layerDotR * canvasScale,
      ]);
    }
  }
  drawCircles({
    ctx: this.ctx,
    circles: dots,
    hasFill: true,
    fillStyle: hexWithOpacity(layerDotFill, layerDotOpacity),
  });
}
