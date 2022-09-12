import { TVec } from 'Types';

export const calAngle = (x: number, y: number) => {
  let angle = (Math.atan(x / y) / Math.PI) * 180;
  if (angle < 0) {
    if (x < 0) {
      angle += 360;
    } else {
      angle += 180;
    }
  } else {
    if (x < 0) {
      angle += 180;
    }
  }
  return angle;
};

export const vecSort = (vecs: any[], layoutKey: string, returnKey: string) => {
  const center = {
    x: vecs.reduce((acc, c) => acc + c[layoutKey][0], 0) / vecs.length,
    y: vecs.reduce((acc, c) => acc + c[layoutKey][1], 0) / vecs.length,
  };
  const angles = vecs.map((vec) => ({
    _vecSortAngle: calAngle(
      vec[layoutKey][0] - center.x,
      vec[layoutKey][1] - center.y
    ),
    _key: vec[returnKey],
  }));
  angles.sort((a, b) => a._vecSortAngle - b._vecSortAngle);
  const res = angles.map((vec) => vec._key);
  return res;
};
