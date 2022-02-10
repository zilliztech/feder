import { polyPoints2path } from '../Utils/index.js';
import * as d3 from 'd3';

export const whiteColor = '#ffffff';
export const blackColor = '#000000';
export const backgroundColor = blackColor;
export const voronoiHighlightColor = '#06F3AF';
export const voronoiHoverColor = '#FFC671';
export const hexWithOpacity = (color, opacity) =>
  color + Math.round(opacity * 255).toString(16);
export const voronoiStrokeWidth = 2;
export const colorScheme = d3.schemeTableau10;

const draw = ({
  ctx,
  drawFunc = () => {},
  fillStyle = '',
  strokeStyle = '',
  lineWidth = 0,
}) => {
  ctx.save();

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  drawFunc();

  ctx.restore();
};

export const drawVoronoi = ({
  ctx,
  pointsList,
  hasFill = false,
  hasStroke = false,
  ...styles
}) => {
  const drawFunc = () => {
    pointsList.forEach((points) => {
      const path = new Path2D(polyPoints2path(points));
      hasFill && ctx.fill(path);
      hasStroke && ctx.stroke(path);
    });
  };
  draw({ ctx, drawFunc, ...styles });
};

export const drawCircle = ({
  ctx,
  circles,
  hasFill = false,
  hasStroke = false,
  ...styles
}) => {
  const drawFunc = () => {
    circles.forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      hasFill && ctx.fill();
      hasStroke && ctx.stroke();
    });
  };
  draw({ ctx, drawFunc, ...styles });
};

export const drawRect = ({
  ctx,
  x,
  y,
  width,
  height,
  hasFill = false,
  hasStroke = false,
  ...styles
}) => {
  const drawFunc = () => {
    hasFill && ctx.fillRect(0, 0, width, height);
    hasStroke && ctx.strokeRect(0, 0, width, height);
  };
  draw({ ctx, drawFunc, ...styles });
};
