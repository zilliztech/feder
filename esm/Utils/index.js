export const uint8toChars = (data) => {
  return String.fromCharCode(...data);
};

export const generateArray = (num) => {
  return Array.from(new Array(Math.floor(num)).keys());
};

export const polyPoints2path = (points) => {
  return 'M' + points.join('L') + 'Z';
};

export const calAngle = (x, y) => {
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

export const vecSort = (vecs, layoutKey, returnKey) => {
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

export const dist2 = (vec1, vec2) =>
  vec1.map((num, i) => num - vec2[i]).reduce((acc, cur) => acc + cur * cur, 0);

export const inCircle = (x, y, x0, y0, r, bias = 0) =>
  dist2([x, y], [x0, y0]) < Math.pow(r + bias, 2);
