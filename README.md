# feder

## What is feder
Feder is built for visualize anns index files, so that we can have a better understanding of anns and high dimensional vectors. so far, we are focusing on Faiss index and HNSW index, we will cover more index types later.

## Quick start
### installation
``` shell
#install
npm install @zilliz/Feder
```

### basic usage
```js
import { Feder } from '@zilliz/Feder';

const feder = new Feder({
    file: 'faiss_file',    // file path
    type: 'faiss',        // faiss | hnsw
    domContainer,         // attach dom to render
});

// you can call search to visualize the search process
feder.search(target, params);
// or reset to initialize state
feder.reset();
```
## API
TBD

## Examples
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
