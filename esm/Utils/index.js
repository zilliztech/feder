import * as d3 from 'd3';

export const uint8toChars = (data) => {
  return String.fromCharCode(...data);
};

export const generateArray = (num) => {
  return Array.from(new Array(Math.floor(num)).keys());
};

export const polyPoints2path = (points, withZ = true) => {
  return `M${points.join('L')}${withZ ? 'Z' : ''}`;
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

export const dist = (vec1, vec2) => Math.sqrt(dist2(vec1, vec2));

export const inCircle = (x, y, x0, y0, r, bias = 0) =>
  dist2([x, y], [x0, y0]) < Math.pow(r + bias, 2);

export const deDupLink = (links, source = 'source', target = 'target') => {
  const linkStringSet = new Set();
  return links.filter((link) => {
    const linkString = `${link[source]}---${link[target]}`;
    const linkStringReverse = `${link[target]}---${link[source]}`;
    if (linkStringSet.has(linkString) || linkStringSet.has(linkStringReverse)) {
      return false;
    } else {
      linkStringSet.add(linkString);
      return true;
    }
  });
};

export const colorScheme = d3.schemeTableau10;

const connection = '---';
export const getLinkId = (sourceId, targetId) =>
  `${sourceId}${connection}${targetId}`;
export const parseLinkId = (linkId) => linkId.split(connection).map((d) => +d);
export const getLinkIdWithLevel = (sourceId, targetId, level) =>
  `link-${level}-${sourceId}-${targetId}`;

export const getNodeIdWithLevel = (nodeId, level) => `node-${level}-${nodeId}`;
export const getEntryLinkIdWithLevel = (nodeId, level) =>
  `inter-level-${level}-${nodeId}`;

export const shortenLine = (point_0, point_1, d = 20) => {
  const length = dist(point_0, point_1);
  const t = Math.min(d / length, 0.4);
  return [
    getInprocessPos(point_0, point_1, t),
    getInprocessPos(point_0, point_1, 1 - t),
  ];
};

export const getInprocessPos = (point_0, point_1, t) => {
  const x = point_0[0] * (1 - t) + point_1[0] * t;
  const y = point_0[1] * (1 - t) + point_1[1] * t;
  return [x, y];
};

export const showVectors = (vec, precision = 6, maxLength = 40) => {
  return vec
    .slice(0, maxLength)
    .map((num) => num.toFixed(precision))
    .join(', ') + ', ...'
};
