import { SOURCE_TYPE } from 'Types';
import hnswlibIndexParser from './hnswlibIndexParser';
import faissIndexParser from "./faissIndexParser";

const indexParserMap = {
  [SOURCE_TYPE.hnswlib]: hnswlibIndexParser,
  [SOURCE_TYPE.faiss]: faissIndexParser,
};

export const getIndexParser = (sourceType) => {
  if (sourceType in indexParserMap) {
    return indexParserMap[sourceType];
  } else throw `No index parser for [${sourceType}]`;
};

export default getIndexParser;
