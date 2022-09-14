import IvfflatSearchView from './ivfflatView/IvfflatSearchView';
import { drawRect } from './renderUtils2D';

export default function clearCanvas(this: IvfflatSearchView) {
  const { width, height, canvasScale } = this.viewParams;
  drawRect({
    ctx: this.ctx,
    x: 0,
    y: 0,
    width: width * canvasScale,
    height: height * canvasScale,
    hasFill: true,
    fillStyle: '#000000',
  });
}
