import { DirectMapType } from 'Types';

const checkDmType = (dmType) => {
  if (dmType !== DirectMapType.NoMap) {
    console.warn('[directmap_type] only support NoMap.');
  }
};

const checkDmSize = (dmSize) => {
  if (dmSize !== 0) {
    console.warn('[directmap_size] should be 0.');
  }
};

const readDirectMap = (reader, index) => {
  const directMap = {};
  directMap.dmType = reader.readUint8();
  checkDmType(directMap.dmType);
  directMap.size = reader.readUint64();
  checkDmSize(directMap.size);
  index.directMap = directMap;
};

export default readDirectMap;
