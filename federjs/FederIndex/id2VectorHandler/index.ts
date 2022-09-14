import { EIndexType, TId, TVec } from 'Types';
import {
  TIndexStructure,
  TIndexStructureHnsw,
  TIndexStructureIvfflat,
} from 'Types/indexStructure';

export const getId2VectorHnsw = (index: TIndexStructureHnsw) => {
  const id2Vector = {} as { [id: TId]: TVec };
  index.labels.forEach((label, i) => (id2Vector[label] = index.vectors[i]));
  return id2Vector;
};

export const getId2VectorIvfflat = (index: TIndexStructureIvfflat) => {
  const id2Vector = {} as { [id: TId]: TVec };
  index.invlists.data.forEach(({ ids, vectors }) => {
    ids.forEach((id, i) => (id2Vector[id] = vectors[i]));
  });
  return id2Vector;
};

const getId2VectorMap = {
  [EIndexType.hnsw]: getId2VectorHnsw,
  [EIndexType.ivfflat]: getId2VectorIvfflat,
};

export default function id2VectorHandler(index: TIndexStructure) {
  const indexType = index.indexType;
  const getId2Vector = getId2VectorMap[indexType];
  const id2Vector = getId2Vector(index);
  return id2Vector;
}
