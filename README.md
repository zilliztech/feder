# feder

## What is feder

Feder is built for visualizing anns index files, so that we can have a better understanding of anns and high dimensional vectors. so far, we are focusing on the index from Faiss (only ivf_flat) and HNSWlib (hnsw), we will cover more index types later.

- HNSW
![image](./fig/hnsw_overview.png)

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
  filePath: 'faiss_file', // file path
  source: 'faiss', // faiss | hnswlib
  domSelector: '#container', // attach dom to render
  viewParams: {}, // optional
});
```

### Visualize the index structure.

- HNSW - Feder will show the top-3 levels of the hnsw-tree

```js
feder.overview();
```

### Explore the search process.

Set search parameters (optional) and Specify the query vector.

```js
feder.setSearchParams({ k: 8, ef_search: 100 }); // hnsw
feder.setSearchParams({ k: 8, nprobe: 8 }); // ivf_flat
feder.search(target_vector);
```

### Advanced

use **viewParams** to control.

```js
const feder = new Feder({
  filePath,
  source: 'hnswlib',
  domSelector,
  viewParams: {
    width: 1000,
    height: 600,
    padding: [80, 200, 60, 220],
    mediaType: 'img',
    mediaCallback: (rowId) => url,
  },
});
```

#### view style

Specify the visual style of the view.

- width - canvas width
- height - canvas height
- padding - the main view padding

#### media supports

Support mapping from Row No. to media files. (current support img)

- mediaType - null | img
- mediaCallback - func: rowId => url,

## Examples

### 

## Join us

Welcome to Zilliz!

## Acknowledgments

- [faiss](https://github.com/facebookresearch/faiss)
- [hnswlib](https://github.com/nmslib/hnswlib)
- [d3](https://github.com/d3/d3)
