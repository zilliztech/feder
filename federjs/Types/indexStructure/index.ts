import {
  TIndexStructureHnsw,
  TIndexStructureHnswDetail,
} from './indexStructureHnsw';
import { TIndexStructureIvfflat } from './indexStructureIvfflat';
export * from './indexStructureIvfflat';

type TIndexStructure = TIndexStructureHnsw | TIndexStructureIvfflat;

export {
  TIndexStructure,
  TIndexStructureHnsw,
  TIndexStructureHnswDetail,
  TIndexStructureIvfflat,
};
