import * as d3 from 'd3';
import { generateArray } from 'Utils';

export const transformHandler = ({
  nodes,
  levelCount,
  width,
  height,
  padding,
  xBias = 0.65,
  yBias = 0.4,
  yOver = 0.1,
}) => {
  const layerWidth = width - padding[1] - padding[3];
  const layerHeight =
    (height - padding[0] - padding[2]) /
    (levelCount - (levelCount - 1) * yOver);
  const xRange = d3.extent(nodes, (node) => node.x);
  const yRange = d3.extent(nodes, (node) => node.y);

  const xOffset = padding[3] + layerWidth * xBias;
  const transformFunc = (x, y, level) => {
    const _x = (x - xRange[0]) / (xRange[1] - xRange[0]);
    const _y = (y - yRange[0]) / (yRange[1] - yRange[0]);

    const newX =
      xOffset + _x * layerWidth * (1 - xBias) - _y * layerWidth * xBias;

    const newY =
      padding[0] +
      layerHeight * (1 - yOver) * (levelCount - 1 - level) +
      _x * layerHeight * (1 - yBias) +
      _y * layerHeight * yBias;

    return [newX, newY];
  };
  const layerPos = [
    [layerWidth * xBias, 0],
    [layerWidth, layerHeight * (1 - yBias)],
    [layerWidth * (1 - xBias), layerHeight],
    [0, layerHeight * yBias],
  ];
  const layerPosLevels = generateArray(levelCount).map((_, level) =>
    layerPos.map((coord) => [
      coord[0] + padding[3],
      coord[1] +
        padding[0] +
        layerHeight * (1 - yOver) * (levelCount - 1 - level),
    ])
  );
  return { layerPosLevels, transformFunc };
};

export default transformHandler;
