export default function mouse2node({ voronoi, x, y }) {
  return voronoi.delaunay.find(x, y);
}