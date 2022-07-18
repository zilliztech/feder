import fetch from 'node-fetch';

import { FederCore } from '@zilliz/feder';

export class FederCoreNode {
  constructor() {
    this.hasCore = false;
  }
  async initCore({ filePath, source, viewParams = {} }) {
    const data = await fetch(filePath).then((res) => res.arrayBuffer());
    const core = new FederCore({ data, source, viewParams });
    this.core = core;
    this.hasCore = true;
  }
}

export default FederCoreNode;
