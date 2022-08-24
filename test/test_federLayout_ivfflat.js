import { FederIndex, FederLayout } from '../dist/index.js';
import {
  ivfflatIndexFilePath,
  ivfflatSource,
  outputDirPath,
} from './config.js';
import fs from 'fs';

export const test_federLayout_ivfflat = async () => {
  const federIndex = new FederIndex(ivfflatSource);

  const arrayBuffer = fs.readFileSync(ivfflatIndexFilePath).buffer;
  federIndex.initByArrayBuffer(arrayBuffer);

  const federLayout = new FederLayout(federIndex);
  
  // await test_getVisData_overview(federLayout);
  await test_getVisData_search(federLayout);
};

const test_getVisData_overview = async (federLayout) => {
  const visDataOverview = await federLayout.getVisData({
    actionType: 'overview',
    // actionData: {},
    // viewType: 'default',
    layoutParams: {
      width: 1000,
      height: 600,
    }
  })

  fs.writeFileSync(
    outputDirPath + 'FederLayout_visData_ivfflat_overview.json',
    JSON.stringify(visDataOverview, null, 2)
  );
}

const test_getVisData_search = async (federLayout) => {
  const testVector = Array(512)
    .fill(0)
    .map((_) => Math.random());

  const testSearchParams = {
    k: 4,
    ef: 6,
    nprobe: 5,
  };

  const visDataOverview = await federLayout.getVisData({
    actionType: 'search',
    actionData: {
      target: testVector,
      searchParams: testSearchParams,
    },
    viewType: 'default',
    layoutParams: {
      width: 1000,
      height: 600,
    }
  })

  fs.writeFileSync(
    outputDirPath + 'FederLayout_visData_ivfflat_search.json',
    JSON.stringify(visDataOverview, null, 2)
  );
}
