import fs from 'fs';
import { FederIndex } from '../../dist/index.js';
import { federIndexFuncs, federIndexServerPort } from './config.js';
import {
  isLocal,
  ivfflatSource,
  ivfflatIndexFilePath,
  hnswSource,
  hnswIndexFilePath,
} from './data/dataConfig.js';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const getFederIndex = async (sourceType, filePath) => {
  const arraybuffer = isLocal
    ? fs.readFileSync(filePath).buffer
    : await fetch(filePath).then((res) => res.arrayBuffer());
  const federIndex = new FederIndex(sourceType, arraybuffer);
  return federIndex;
};

const app = express();
app.use(cors());

const federIndex = await getFederIndex(ivfflatSource, ivfflatIndexFilePath);
// const federIndex = await getFederIndex(hnswSource, hnswIndexFilePath);

const resData = (data = null) =>
  data ? { status: 'succeed', data } : { status: 'failed' };

app.get('/' + federIndexFuncs.getIndexType, async (req, res) => {
  let data = null;
  try {
    data = await federIndex.getIndexType();
  } catch (e) {
    console.log(e);
  }
  res.json(resData(data));
});

app.get('/' + federIndexFuncs.getVectorsCount, async (req, res) => {
  let data = null;
  try {
    data = await federIndex.getVectorsCount();
  } catch (e) {
    console.log(e);
  }
  res.json(resData(data));
});

app.get('/' + federIndexFuncs.getIndexMeta, async (req, res) => {
  let data = null;
  try {
    data = await federIndex.getIndexMeta();
  } catch (e) {
    console.log(e);
  }
  res.json(resData(data));
});

app.get('/' + federIndexFuncs.getSearchRecords, async (req, res) => {
  let data = null;
  const params = JSON.parse(req.query.params);
  try {
    data = await federIndex.getSearchRecords(
      params.target,
      params.searchParams
    );
  } catch (e) {
    console.log(e);
  }
  res.json(resData(data));
});

app.get('/' + federIndexFuncs.getVectorById, async (req, res) => {
  let data = null;
  const { id } = JSON.parse(req.query.params);
  try {
    data = await federIndex.getVectorById(id);
  } catch (e) {
    console.log(e);
  }
  res.json(resData(data));
});

app.listen(federIndexServerPort, () => {
  console.log('listening on port', federIndexServerPort);
});
