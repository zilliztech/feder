import { TViewParams } from 'Types';
import { TVisData } from 'Types/visData';

export default interface TViewHandler {
  node: HTMLElement;
  init(): void;
  render(): void;
}
