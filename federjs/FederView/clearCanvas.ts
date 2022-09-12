import IvfflatSearchView from './ivfflatView/IvfflatSearchView';

export default function clearCanvas(this: IvfflatSearchView) {
  const { width, height, canvasScale } = this.viewParams;
  this.ctx.clearRect(0, 0, width * canvasScale, height * canvasScale);
}
