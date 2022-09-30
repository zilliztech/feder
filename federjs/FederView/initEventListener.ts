export default function initEventListener(this: {
  ctx: CanvasRenderingContext2D;
  mouseMoveHandler: Function;
  mouseClickHandler: Function;
  mouseLeaveHandler: Function;
}) {
  this.ctx.canvas.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY } = e;
    this.mouseMoveHandler && this.mouseMoveHandler({ x: offsetX, y: offsetY });
  });
  this.ctx.canvas.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    this.mouseClickHandler &&
      this.mouseClickHandler({ x: offsetX, y: offsetY });
  });
  this.ctx.canvas.addEventListener('mouseleave', () => {
    this.mouseLeaveHandler && this.mouseLeaveHandler();
  });
}
