import { polyPoints2path } from 'Utils';
import * as d3 from 'd3';

export const colorScheme = d3.schemeTableau10;

export const ZBlue = '#175FFF';
export const ZLightBlue = '#91FDFF';
export const ZYellow = '#FFFC85';
export const ZOrange = '#F36E4B';
export const ZLayerBorder = '#D9EAFF';

export const whiteColor = '#ffffff';
export const blackColor = '#000000';
export const backgroundColor = blackColor;
export const highLightColor = ZYellow;
export const voronoiHighlightColor = ZYellow;
export const selectedColor = '#FFC671';
export const voronoiHoverColor = selectedColor;
export const hexWithOpacity = (color, opacity) => {
  let opacityString = Math.round(opacity * 255).toString(16);
  if (opacityString.length < 2) {
    opacityString = '0' + opacityString;
  }
  return color + opacityString;
};
export const voronoiStrokeWidth = 4;

export const highLightGradientStopColors = [
  [0, hexWithOpacity(whiteColor, 0.2)],
  [1, hexWithOpacity(ZYellow, 1)],
];

export const neighbourGradientStopColors = [
  [0, hexWithOpacity(whiteColor, 0)],
  [1, hexWithOpacity(whiteColor, 0.8)],
];

export const targetLevelGradientStopColors = neighbourGradientStopColors;

export const normalGradientStopColors = [
  [0, hexWithOpacity('#061982', 0.3)],
  [1, hexWithOpacity('#1E64FF', 0.4)],
];

export const layerGradientStopColors = [
  [0.1, hexWithOpacity('#1E64FF', 0.4)],
  [0.9, hexWithOpacity('#00234D', 0)],
];

const draw = ({
  ctx,
  drawFunc = () => {},
  fillStyle = '',
  strokeStyle = '',
  lineWidth = 0,
  lineCap = 'butt',
  shadowColor = '',
  shadowBlur = 0,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  isFillLinearGradient = false,
  isStrokeLinearGradient = false,
  gradientPos = [0, 0, 100, 100],
  gradientStopColors = [],
}) => {
  ctx.save();

  let gradient = null;
  if (isFillLinearGradient || isStrokeLinearGradient) {
    gradient = ctx.createLinearGradient(...gradientPos);
    gradientStopColors.forEach((stopColor) =>
      gradient.addColorStop(...stopColor)
    );
  }
  ctx.fillStyle = isFillLinearGradient ? gradient : fillStyle;
  ctx.strokeStyle = isStrokeLinearGradient ? gradient : strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;

  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;

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

export const extraExtent = ([x0, x1], p = 0.5) => {
  const length = x1 - x0;
  return [x0 - length * p, x1 + length * p];
};

export const drawVoronoiWithDots = ({
  ctx,
  points,
  hasFill = false,
  hasStroke = false,
  dotColor = hexWithOpacity('red', 0.6),
  dotR = 1.5,
  dotAngle = Math.PI / 6,
  dotGap = 4,
  fillStyle = 'blue',
  strokeStyle = 'green',
  lineWidth = 2,
}) => {
  ctx.save();

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  path = new Path2D(polyPoints2path(points));
  hasFill && ctx.fill(path);
  hasStroke && ctx.stroke(path);

  ctx.clip(path);

  const extentX = extraExtent(d3.extent(points, (point) => point[0]));
  const extentY = extraExtent(d3.extent(points, (point) => point[1]));

  ctx.fillStyle = dotColor;
  const step = (dotR + dotGap) * 2;
  d3.range(extentX[0], extentX[1], step).forEach((x) =>
    d3.range(extentY[0], extentY[1], step).forEach((_y) => {
      y = _y + (x - extentX[0]) * Math.tan(dotAngle);
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, 2 * Math.PI);
      ctx.fill();
    })
  );

  ctx.strokeStyle = strokeStyle;
  hasStroke && ctx.stroke(path);

  ctx.restore();
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

export const drawEllipse = ({
  ctx,
  circles,
  hasFill = false,
  hasStroke = false,
  ...styles
}) => {
  const drawFunc = () => {
    circles.forEach(([x, y, rx, ry]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
      hasFill && ctx.fill();
      hasStroke && ctx.stroke();
    });
  };
  draw({ ctx, drawFunc, ...styles });
};

export const drawRect = ({
  ctx,
  x = 0,
  y = 0,
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

export const drawPath = ({
  ctx,
  points,
  hasFill = false,
  hasStroke = false,
  withZ = true,
  ...styles
}) => {
  const drawFunc = () => {
    const path = new Path2D(polyPoints2path(points, withZ));
    hasFill && ctx.fill(path);
    hasStroke && ctx.stroke(path);
  };
  draw({ ctx, drawFunc, ...styles });
};

export const drawLine = ({
  ctx,
  points,
  hasFill = false,
  hasStroke = false,
  ...styles
}) => {
  const drawFunc = () => {
    const path = new Path2D(`M${points[0]}L${points[1]}`);
    hasFill && ctx.fill(path);
    hasStroke && ctx.stroke(path);
  };
  draw({ ctx, drawFunc, ...styles });
};

export const drawLines = ({
  ctx,
  pointsList,
  hasFill = false,
  hasStroke = false,
  ...styles
}) => {
  const drawFunc = () => {
    pointsList.forEach((points) => {
      const path = new Path2D(`M${points[0]}L${points[1]}`);
      hasFill && ctx.fill(path);
      hasStroke && ctx.stroke(path);
    });
  };
  draw({ ctx, drawFunc, ...styles });
};

export const drawLinesWithLinearGradient = ({
  ctx,
  pointsList,
  hasFill = false,
  hasStroke = false,
  isStrokeLinearGradient = true,
  ...styles
}) => {
  pointsList.forEach((points) => {
    const path = new Path2D(`M${points[0]}L${points[1]}`);
    const gradientPos = [...points[0], ...points[1]];
    const drawFunc = () => {
      hasFill && ctx.fill(path);
      hasStroke && ctx.stroke(path);
    };
    draw({ ctx, drawFunc, isStrokeLinearGradient, gradientPos, ...styles });
  });
};

export const renderLoading = ({ dom, width, height }) => {
  const _dom = d3.select(`#${dom.id}`);
  const svg = _dom
    .append('svg')
    .attr('id', loadingSvgId)
    .attr('width', loadingWidth)
    .attr('height', loadingWidth)
    .style('position', 'absolute')
    .style('left', width / 2 - loadingWidth / 2)
    .style('bottom', height / 2 - loadingWidth / 2)
    .style('border', '1px solid red');
};

export const finishLoading = ({ dom }) => {
  const _dom = d3.select(`#${dom.id}`);
  _dom.select(`#${loadingSvgId}`).remove();
};
