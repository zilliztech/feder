import { Feder } from '';
import { hnswSource, hnswIndexFilePath, getRowId2imgUrl } from './config';

export const getFederHnswLite = () => {
  const feder = new Feder({
    source: hnswSource,
    filePath: hnswIndexFilePath,
  });

  return feder;
};

// Show the corresponding images
export const getFederHnsw = async () => {
  const rowId2imgUrl = await getRowId2imgUrl();

  const feder = new Feder({
    source: hnswSource,
    filePath: hnswIndexFilePath,
    viewParams: {
      mediaType: 'img',
      mediaCallback: rowId2imgUrl,
    },
  });

  return feder;
};
