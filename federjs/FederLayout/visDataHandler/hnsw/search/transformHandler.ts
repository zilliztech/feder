import * as d3 from 'd3';
import { TCoord } from 'Types';
import { TVisDataHnswNode } from 'Types/visData';
import { vecAdd, vecMultiply } from 'Utils/distFunc';

export const transformHandler = (
  nodes: TVisDataHnswNode[],
  levelCount: number,
  {
    width,
    height,
    canvasScale,
    padding,
    xBias = 0.65,
    yBias = 0.4,
    yOver = 0.1,
  }
) => {
  const layerWidth = width - padding[1] - padding[3];
  const layerHeight =
    (height - padding[0] - padding[2]) /
    (levelCount - (levelCount - 1) * yOver);
  const xRange = d3.extent(nodes, (node: any) => node.x) as [number, number];
  const yRange = d3.extent(nodes, (node: any) => node.y) as [number, number];

  const xOffset = padding[3] + layerWidth * xBias;
  const transformFunc = (x: number, y: number, level: number): TCoord => {
    const _x = (x - xRange[0]) / (xRange[1] - xRange[0]);
    const _y = (y - yRange[0]) / (yRange[1] - yRange[0]);

    const newX =
      xOffset + _x * layerWidth * (1 - xBias) - _y * layerWidth * xBias;

    const newY =
      padding[0] +
      layerHeight * (1 - yOver) * (levelCount - 1 - level) +
      _x * layerHeight * (1 - yBias) +
      _y * layerHeight * yBias;

    return [newX * canvasScale, newY * canvasScale];
  };
  const layerPos = [
    [layerWidth * xBias, 0],
    [layerWidth, layerHeight * (1 - yBias)],
    [layerWidth * (1 - xBias), layerHeight],
    [0, layerHeight * yBias],
  ];
  const layerPosLevels = Array(levelCount)
    .fill(0)
    .map(
      (_, level) =>
        layerPos
          .map((coord) =>
            vecAdd(coord, [
              padding[3],
              padding[0] + layerHeight * (1 - yOver) * (levelCount - 1 - level),
            ])
          )
          .map((coord) => vecMultiply(coord, canvasScale)) as TCoord[]
    );
  return { layerPosLevels, transformFunc };
};

export default transformHandler;
