export const federIndexServerPort = 12357;
export const federIndexUrl = `http://localhost:${federIndexServerPort}`;
export const federLayoutServerPort = 12358;
export const federLayoutUrl = `http://localhost:${federLayoutServerPort}`;

export const federIndexFuncs = {
  getIndexType: 'getIndexType',
  getIndexMeta: 'getIndexMeta',
  getSearchRecords: 'getSearchRecords',
  getVectorById: 'getVectorById',
  getVectorsCount: 'getVectorsCount',
};

export const federLayoutFuncs = {
  getVisData: 'getVisData',
};