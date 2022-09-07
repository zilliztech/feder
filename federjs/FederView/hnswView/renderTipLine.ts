import { drawLines } from 'FederView/renderUtils2D';
import { TCoord } from 'Types';

interface TView {
  ctx: CanvasRenderingContext2D;
  viewParams: {
    canvasScale?: number;
    tipLineOffset?: TCoord;
    tipLineAngle?: number;
    tipLineColor?: string;
    tipLineWidth?: number;
  };
}

export default function renderTipLine(
  this: TView,
  startPos: TCoord,
  reverse: boolean = false
): TCoord {
  const {
    canvasScale,
    tipLineOffset,
    tipLineAngle,
    tipLineColor,
    tipLineWidth,
  } = this.viewParams;
  const t = reverse ? -1 : 1;
  const middlePointX =
    startPos[0] +
    (t * Math.abs(tipLineOffset[1]) * canvasScale) / Math.tan(tipLineAngle);
  const middlePointY = startPos[1] + t * tipLineOffset[1] * canvasScale;
  const endPosX = startPos[0] + t * tipLineOffset[0] * canvasScale;
  const endPosY = startPos[1] + t * tipLineOffset[1] * canvasScale;

  const points = [
    startPos,
    [middlePointX, middlePointY],
    [endPosX, endPosY],
  ] as TCoord[];
  drawLines({
    ctx: this.ctx,
    pointsList: [points],
    hasStroke: true,
    strokeStyle: tipLineColor,
    lineWidth: tipLineWidth * canvasScale,
  });

  return [endPosX, endPosY];
}
