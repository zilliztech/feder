# feder

## What is feder

Feder is built for visualizing anns index files, so that we can have a better understanding of anns and high dimensional vectors. so far, we are focusing on the index from Faiss (only ivf_flat) and HNSWlib (hnsw), we will cover more index types later.

## Quick start

### installation

Use npm or yarn.

```shell
#install
npm install @zilliz/feder
```

or

```shell
#install
yarn add @zilliz/feder
```

### Material Preparation

Make sure that you have Built an index and dumped the index file by Faiss or HNSWlib.

### Init Feder

Specifying the dom container that you want to show the visualizations.

```js
import Feder from '@zilliz/feder';

const feder = new Feder({
  filePath: 'faiss_file',     // file path
  source: 'faiss',          // faiss | hnswlib
  domSelector: '#container',      // attach dom to render
  viewParams: {}          // optional
});
```

### Visualize the index structure.

```js
feder.overview();
```

### Explore the search process.

Set search parameters (optional) and Specify the query vector.

```js
feder.setSearchParams({ k: 8, ef_search: 100 });
feder.search(target_vector);
```

## API

TBD

## Examples

index
images

html +

### Use feder with d3

TBD

### Use feder with react

TBD

## How feder works

TBD

## How to contribute

```shell
# install dependencies
npm install
# create build
npm run build
# test
npm run test
```
