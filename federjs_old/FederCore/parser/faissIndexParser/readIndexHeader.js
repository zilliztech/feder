import { MetricType } from 'Types';

const checkMetricType = (metricType) => {
  if (
    metricType !== MetricType.METRIC_L2 &&
    metricType !== MetricType.METRIC_INNER_PRODUCT
  ) {
    console.warn('[metric_type] only support l2 and inner_product.');
  }
};

const checkDummy = (dummy_1, dummy_2) => {
  if (dummy_1 !== dummy_2) {
    console.warn('[dummy] not equal.', dummy_1, dummy_2);
  }
};

const checkIsTrained = (isTrained) => {
  if (!isTrained) {
    console.warn('[is_trained] should be trained.', isTrained);
  }
};

const readIndexHeader = (reader, index) => {
  index.d = reader.readUint32();
  index.ntotal = reader.readUint64();

  const dummy_1 = reader.readDummy();
  const dummy_2 = reader.readDummy();
  checkDummy(dummy_1, dummy_2);

  index.isTrained = reader.readBool();
  checkIsTrained(index.isTrained);

  index.metricType = reader.readUint32();
  checkMetricType(index.metricType);
};

export default readIndexHeader;
