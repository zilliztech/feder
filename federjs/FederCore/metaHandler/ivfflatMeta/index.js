import { getIvfListId } from 'Utils';
export const getIvfflatMeta = (index) => {
  const id2vector = {};
  const inv = index.invlists;
  for (let list_no = 0; list_no < inv.nlist; list_no++) {
    inv.data[list_no].ids.forEach((id, ofs) => {
      id2vector[id] = inv.data[list_no].vectors[ofs];
    });
  }
  index.childIndex.vectors.forEach(
    (vector, i) => (id2vector[getIvfListId(i)] = vector)
  );

  const indexMeta = {};
  indexMeta.ntotal = index.ntotal;
  indexMeta.nlist = index.nlist;
  indexMeta.listIds = index.invlists.data.map((d) => d.ids);
  indexMeta.listSizes = index.invlists.data.map((d) => d.ids.length);

  return { id2vector, indexMeta };
};

export default getIvfflatMeta;
