import express from 'express';
import cors from 'cors';
import getFederCore from './initFederCore.js.js';

import { coreNodePort } from '../config.js.js';

const app = express();
app.use(cors());

const core = await getFederCore();

const successData = (data) => ({ code: 200, data });

app.get('/', (req, res) => {
  console.log(req.query);
  res.send(successData('get it~'));
});

app.get('/get_index_type', (_, res) => {
  res.json(successData(core.indexType));
});

app.get('/get_index_meta', (_, res) => {
  res.json(successData(core.indexMeta));
});

app.get('/get_test_id_and_vector', (_, res) => {
  let [testId, testVec] = core.getTestIdAndVec();
  while (isNaN(testId)) {
    [testId, testVec] = core.getTestIdAndVec();
  }
  res.json(successData({ testId, testVec: Array.from(testVec) }));
});

app.get('/get_vector_by_id', (req, res) => {
  const { id } = req.query;
  res.json(successData(Array.from(core.id2vector[id] || [])));
});

app.get('/search', (req, res) => {
  const { target } = req.query;
  res.json(successData(core.search(target)));
});

app.get('/set_search_params', (req, res) => {
  core.setSearchParams(req.query);
  res.json(successData('ok'));
});

app.listen(coreNodePort, () => {
  console.log('listening on port', coreNodePort);
});
