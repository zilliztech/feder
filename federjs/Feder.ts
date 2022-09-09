import { ESourceType, TId, TSearchParams, TVec } from 'Types';
import { FederIndex, FederLayout, FederView } from '.';

export default class Feder {
  domSelector: string;
  initFederPromise: Promise<void>;
  federIndex: FederIndex;
  viewParams: any;
  federLayout: FederLayout;
  constructor({
    source,
    filePath,
    domSelector,
    viewParams = {},
  }: {
    filePath: string;
    source: ESourceType;
    domSelector?: string;
    viewParams?: any;
  }) {
    this.domSelector = domSelector;
    this.viewParams = viewParams;

    this.initFederPromise = new Promise(async (resolve) => {
      const arrayBuffer = await fetch(filePath).then((res) =>
        res.arrayBuffer()
      );
      this.federIndex = new FederIndex(source, arrayBuffer);
      this.federLayout = new FederLayout(this.federIndex);
      resolve();
    });
  }
  overview() {}
  search(target: TVec = null, targetContent: string = null) {}
  searchById(id: TId) {}
  searchByRandTestVec() {}
  setSearchParams(params: TSearchParams) {}
}
