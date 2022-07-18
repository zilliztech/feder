import express from 'express';
import cors from 'cors';
import FederCoreNode from './federCoreNode.js';
import {
  coreNodePort,
  filePath,
  source,
  FEDER_CORE_REQUEST,
} from './config.js';

const federCoreNode = new FederCoreNode();
const viewParams = {};
// async
federCoreNode.initCore({ filePath, source, viewParams });

const app = express();
app.use(cors());

const succeedData = (data) => ({ message: 'succeed', data });
const failedData = (data) => ({ message: 'failed', data });

app.use('/', (req, res, next) => {
  if (federCoreNode.hasCore) next();
  else res.json(failedData('waiting for core initialization~'));
});

app.get('/' + FEDER_CORE_REQUEST.get_index_type, (_, res) => {
  res.json(succeedData(federCoreNode.core.indexType));
});

app.get('/' + FEDER_CORE_REQUEST.get_index_meta, (_, res) => {
  res.json(succeedData(federCoreNode.core.indexMeta));
});

app.get('/' + FEDER_CORE_REQUEST.get_test_id_and_vector, (_, res) => {
  let [testId, testVec] = federCoreNode.core.getTestIdAndVec();
  while (isNaN(testId)) {
    [testId, testVec] = federCoreNode.core.getTestIdAndVec();
  }
  res.json(succeedData({ testId, testVec: Array.from(testVec) }));
});

app.get('/' + FEDER_CORE_REQUEST.get_vector_by_id, (req, res) => {
  const { id } = req.query;
  res.json(succeedData(Array.from(federCoreNode.core.id2vector[id] || [])));
});

app.get('/' + FEDER_CORE_REQUEST.search, (req, res) => {
  const { target } = req.query;
  const target_vector = target.split(',').map((a) => +a);
  res.json(succeedData(federCoreNode.core.search(target_vector)));
});

app.get('/' + FEDER_CORE_REQUEST.set_search_params, (req, res) => {
  federCoreNode.core.setSearchParams(req.query);
  res.json(succeedData('ok'));
});

app.listen(coreNodePort, () => {
  console.log('listening on port', coreNodePort);
});
