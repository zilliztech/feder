import { TCoord } from 'Types';

export type TStopColor = [number, string];
// [x, y, r]
export type TCircleData = [number, number, number];
// [x, y, rx, ry]
export type TEllipseData = [number, number, number, number];

export const hexWithOpacity = (color: string, opacity: number) => {
  let opacityString = Math.round(opacity * 255).toString(16);
  if (opacityString.length < 2) {
    opacityString = '0' + opacityString;
  }
  return color + opacityString;
};

export const points2path = (points: TCoord[], closePath = false) => {
  return `M${points.join('L')}${closePath ? 'Z' : ''}`;
};

export interface TStyles {
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  lineCap?: CanvasLineCap;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  isFillLinearGradient?: boolean;
  isStrokeLinearGradient?: boolean;
  gradientPos?: [number, number, number, number];
  gradientStopColors?: TStopColor[];
}

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
}: {
  ctx: CanvasRenderingContext2D;
  drawFunc: () => void;
} & TStyles) => {
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

export const drawPolygons = ({
  ctx,
  pointsList,
  hasFill = false,
  hasStroke = false,
  ...styles
}: {
  ctx: CanvasRenderingContext2D;
  pointsList: TCoord[][];
  hasFill?: boolean;
  hasStroke?: boolean;
} & TStyles) => {
  const drawFunc = () => {
    pointsList.forEach((points) => {
      const path = new Path2D(points2path(points, true));
      hasFill && ctx.fill(path);
      hasStroke && ctx.stroke(path);
    });
  };
  draw({ ctx, drawFunc, ...styles });
};

export const drawLines = ({
  ctx,
  pointsList,
  hasFill = false,
  hasStroke = false,
  isStrokeLinearGradient = true,
  ...styles
}: {
  ctx: CanvasRenderingContext2D;
  pointsList: TCoord[][];
  hasFill?: boolean;
  hasStroke?: boolean;
  isStrokeLinearGradient?: boolean;
} & TStyles) => {
  const drawFunc = () => {
    pointsList.forEach((points) => {
      const path = new Path2D(points2path(points, false));
      const gradientPos = [...points[0], ...points[points.length - 1]] as [
        number,
        number,
        number,
        number
      ];
      hasFill && ctx.fill(path);
      hasStroke && ctx.stroke(path);
      draw({ ctx, drawFunc, isStrokeLinearGradient, gradientPos, ...styles });
    });
  };
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
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  hasFill: boolean;
  hasStroke: boolean;
} & TStyles) => {
  const drawFunc = () => {
    hasFill && ctx.fillRect(x, y, width, height);
    hasStroke && ctx.strokeRect(x, y, width, height);
  };
  draw({ ctx, drawFunc, ...styles });
};

export const drawCircles = ({
  ctx,
  circles,
  hasFill = false,
  hasStroke = false,
  ...styles
}: {
  ctx: CanvasRenderingContext2D;
  circles: TCircleData[];
  hasFill?: boolean;
  hasStroke?: boolean;
} & TStyles) => {
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
  ellipses,
  hasFill = false,
  hasStroke = false,
  ...styles
}: {
  ctx: CanvasRenderingContext2D;
  ellipses: TEllipseData[];
  hasFill?: boolean;
  hasStroke?: boolean;
} & TStyles) => {
  const drawFunc = () => {
    ellipses.forEach(([x, y, rx, ry]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
      hasFill && ctx.fill();
      hasStroke && ctx.stroke();
    });
  };
  draw({ ctx, drawFunc, ...styles });
};
