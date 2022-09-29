import fs from 'fs';
import { FederIndex, FederLayout } from '../../dist/index.js';
import {
  federIndexFuncs,
  federLayoutFuncs,
  federIndexLayoutServerPort,
} from './config.js';
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

const federIndex = await getFederIndex(ivfflatSource, ivfflatIndexFilePath);
// const federIndex = await getFederIndex(hnswSource, hnswIndexFilePath);

const federLayout = new FederLayout(federIndex);

const resData = (data = null) =>
  data ? { status: 'succeed', data } : { status: 'failed' };

const app = express();
app.use(cors());

app.get('/' + federIndexFuncs.getVectorsCount, async (req, res) => {
  let data = null;
  try {
    data = await federIndex.getVectorsCount();
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

app.get('/' + federLayoutFuncs.getVisData, async (req, res) => {
  let data = null;
  const params = JSON.parse(req.query.params.toString());
  try {
    data = await federLayout.getVisData(params);
  } catch (e) {
    console.log(e);
  }
  res.json(resData(data));
});

app.listen(federIndexLayoutServerPort, () => {
  console.log('listening on port', federIndexLayoutServerPort);
});
