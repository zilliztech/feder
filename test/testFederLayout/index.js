import { FederLayout } from '../../dist/index.js';
import { outputDirPath } from '../data/dataConfig.js';
import fs from 'fs';
import path from 'path';

async function testFederLayout(indexType) {
  try {
    const indexMeta = JSON.parse(
      fs.readFileSync(path.join(outputDirPath, `indexMeta_${indexType}.json`))
    );
    const searchRecords = JSON.parse(
      fs.readFileSync(
        path.join(outputDirPath, `searchRecords_${indexType}.json`)
      )
    );
    const federIndex = {
      indexType,
      getIndexMeta: async () => indexMeta,
      getSearchRecords: async () => searchRecords,
    };

    const federLayout = new FederLayout(federIndex);
    const overviewVisData = await federLayout.getVisData({
      actionType: 'overview',
    });
    const searchViewVisData = await federLayout.getVisData({
      actionType: 'search',
      actionData: {},
    });

    fs.writeFileSync(
      path.join(outputDirPath, `overviewVisData_${indexType}.json`),
      JSON.stringify(overviewVisData, null, 2)
    );
    fs.writeFileSync(
      outputDirPath + `searchVisData_${indexType}.json`,
      JSON.stringify(searchViewVisData, null, 2)
    );
  } catch (e) {
    console.log(e);
  }
}

await testFederLayout('ivfflat');
await testFederLayout('hnsw');
