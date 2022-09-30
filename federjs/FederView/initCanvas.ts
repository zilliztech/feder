import * as d3 from 'd3';
import { TViewParamsHnsw, TViewParamsIvfflat } from 'Types/visData';

export default function initCanvas(this: {
  viewParams: TViewParamsIvfflat | TViewParamsHnsw;
  node: HTMLElement;
  ctx: CanvasRenderingContext2D;
}) {
  const { width, height, canvasScale } = this.viewParams;
  const divD3 = d3
    .create('div')
    .style('position', 'relative')
    .style('width', `${width}px`)
    .style('height', `${height}px`);
  this.node = divD3.node();
  const canvasD3 = divD3
    .append('canvas')
    .attr('width', width * canvasScale)
    .attr('height', height * canvasScale)
    .style('transform', `scale(${1 / canvasScale})`)
    .style('transform-origin', 'left top');
  this.ctx = canvasD3.node().getContext('2d');
}