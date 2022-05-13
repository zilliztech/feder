import * as d3 from 'd3';
import {
  drawCircle,
  drawPath,
  hexWithOpacity,
  ZLayerBorder,
  whiteColor,
  layerGradientStopColors,
} from 'Utils/renderUtils';
import { dist } from 'Utils';

export default function renderlevelLayer({
  ctx,
  canvasScale,
  layerDotNum,
  points,
}) {
  drawPath({
    ctx,
    points,
    hasStroke: true,
    isStrokeLinearGradient: false,
    strokeStyle: hexWithOpacity(ZLayerBorder, 0.6),
    lineWidth: 0.5 * canvasScale,
    hasFill: true,
    isFillLinearGradient: true,
    gradientStopColors: layerGradientStopColors,
    gradientPos: [points[1][0], points[0][1], points[3][0], points[2][1]],
  });

  const rightTopLength = dist(points[0], points[1]);
  const leftTopLength = dist(points[0], points[3]);
  const rightTopDotNum = layerDotNum;
  // const leftTopDotNum = (layerDotNum / rightTopLength) * leftTopLength;
  const leftTopDotNum = layerDotNum;
  const rightTopVec = [
    points[1][0] - points[0][0],
    points[1][1] - points[0][1],
  ];
  const leftTopVec = [points[3][0] - points[0][0], points[3][1] - points[0][1]];
  const dots = [];
  for (let i = 0; i < layerDotNum; i++) {
    const rightTopT = i / layerDotNum + 1 / (2 * layerDotNum);
    for (let j = 0; j < layerDotNum; j++) {
      const leftTopT = j / layerDotNum + 1 / (2 * layerDotNum);
      dots.push([
        points[0][0] + rightTopVec[0] * rightTopT + leftTopVec[0] * leftTopT,
        points[0][1] + rightTopVec[1] * rightTopT + leftTopVec[1] * leftTopT,
        0.8 * canvasScale,
      ]);
    }
  }
  // d3.range(0.02, 0.98, 1 / rightTopDotNum).forEach((rightTopT) =>
  //   d3.range(0.02, 0.98, 1 / leftTopDotNum).forEach((leftTopT) => {

  //   })
  // );
  drawCircle({
    ctx,
    circles: dots,
    hasFill: true,
    fillStyle: hexWithOpacity(whiteColor, 0.4),
  });
}
