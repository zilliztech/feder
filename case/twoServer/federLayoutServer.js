import {
  federIndexUrl,
  federIndexFuncs,
  federLayoutServerPort,
  federLayoutFuncs,
} from './config.js';
import fetch from 'node-fetch';
import { FederLayout } from '../../dist/index.js';
import express from 'express';
import cors from 'cors';

const requestData = (path, params = {}) => {
  return fetch(
    federIndexUrl +
      '/' +
      path +
      '?' +
      new URLSearchParams({ params: JSON.stringify(params) })
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'succeed') return res.data;
      else throw new Error('FederIndex Wrong', path);
    });
};

const federIndex = {
  indexType: await requestData(federIndexFuncs.getIndexType),
  [federIndexFuncs.getIndexMeta]: () =>
    requestData(federIndexFuncs.getIndexMeta),
  [federIndexFuncs.getVectorsCount]: () =>
    requestData(federIndexFuncs.getVectorsCount),
  [federIndexFuncs.getVectorById]: (id) =>
    requestData(federIndexFuncs.getVectorById, { id }),
  [federIndexFuncs.getSearchRecords]: (target, searchParams) =>
    requestData(federIndexFuncs.getSearchRecords, {
      target,
      searchParams,
    }),
};

const federLayout = new FederLayout(federIndex);

const app = express();
app.use(cors());

const resData = (data = null) =>
  data ? { status: 'succeed', data } : { status: 'failed' };

app.get('/' + federLayoutFuncs.getVisData, async (req, res) => {
  let data = null;
  const params = JSON.parse(req.query.params);
  try {
    data = await federLayout.getVisData(params);
  } catch (e) {
    console.log(e);
  }
  res.json(resData(data));
});

app.listen(federLayoutServerPort, () => {
  console.log('listening on port', federLayoutServerPort);
});
