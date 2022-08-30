import { TViewParams } from 'Types';
import { TVisData } from 'Types/visData';

export default interface TViewHandler {
  node: HTMLElement;
  init(visData: TVisData, viewParams: TViewParams): void;
  render(): void;
}
