import { drawRect, blackColor } from 'Utils/renderUtils';

export default function renderBackground({
  ctx,
  width,
  height,
}) {
  drawRect({
    ctx,
    width,
    height,
    hasFill: true,
    fillStyle: blackColor,
  });
}
