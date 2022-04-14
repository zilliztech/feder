# feder

## What is feder

Feder is built for visualizing anns index files, so that we can have a better understanding of anns and high dimensional vectors. so far, we are focusing on the index from Faiss (only ivf_flat) and HNSWlib (hnsw), we will cover more index types later.

## Quick start

### installation

Use npm or yarn.

```shell
#install
npm install @zilliz/Feder
```

or

```shell
#install
yarn add @zilliz/Feder
```

### Material Preparation

Build an index and dump the index file by Faiss or HNSWlib.

### Init Feder

Specifying the dom container that you want to show the visualizations.

```js
import Feder from '@zilliz/Feder';

const feder = new Feder({
  file: 'faiss_file', // file path
  type: 'faiss', // faiss | hnsw
  dom: '#container', // attach dom to render
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
