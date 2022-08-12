import { EDirectMapType, TDirectMap } from "FederIndex/Types";

const checkDmType = (dmType: EDirectMapType | number) => {
  if (dmType !== EDirectMapType.NoMap) {
    console.warn("[directmap_type] only support NoMap.");
  }
};

const checkDmSize = (dmSize: number) => {
  if (dmSize !== 0) {
    console.warn("[directmap_size] should be 0.");
  }
};

const readDirectMap = (reader, index) => {
  const directMap = {} as TDirectMap;
  directMap.dmType = reader.readUint8();
  checkDmType(directMap.dmType);
  directMap.size = reader.readUint64();
  checkDmSize(directMap.size);
  index.directMap = directMap;
};

export default readDirectMap;
