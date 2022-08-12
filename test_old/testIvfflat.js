import { Feder } from '';
import { ivfflatSource, ivfflatIndexFilePath, getRowId2imgUrl } from './config';

export const getFederIvfflatLite = () => {
  const feder = new Feder({
    source: ivfflatSource,
    filePath: ivfflatIndexFilePath,
  });

  return feder;
};

// Show the corresponding images
export const getFederIvfflat = async () => {
  const rowId2imgUrl = await getRowId2imgUrl();

  const feder = new Feder({
    source: ivfflatSource,
    filePath: ivfflatIndexFilePath,
    viewParams: {
      mediaType: 'img',
      mediaCallback: rowId2imgUrl,
    },
  });

  return feder;
};
