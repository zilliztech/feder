//Minimum Heap
export default class PriorityQueue<T> {
  private _key: (item: T) => number;
  private _tree: T[];
  constructor(arr = [], key = null) {
    if (typeof key == 'string') {
      this._key = (item) => item[key];
    } else this._key = key;
    this._tree = [];
    arr.forEach((d) => this.add(d));
  }
  add(item: T) {
    this._tree.push(item);
    let id = this._tree.length - 1;
    while (id) {
      const fatherId = Math.floor((id - 1) / 2);
      if (this._getValue(id) >= this._getValue(fatherId)) break;
      else {
        this._swap(fatherId, id);
        id = fatherId;
      }
    }
  }
  get top() {
    return this._tree[0];
  }
  pop() {
    if (this.isEmpty) {
      return 'empty';
    }
    const item = this.top;
    if (this._tree.length > 1) {
      const lastItem = this._tree.pop();
      let id = 0;
      this._tree[id] = lastItem;
      while (!this._isLeaf(id)) {
        const curValue = this._getValue(id);
        const leftId = id * 2 + 1;
        const leftValue = this._getValue(leftId);
        const rightId = leftId >= this._tree.length - 1 ? leftId : id * 2 + 2;
        const rightValue = this._getValue(rightId);
        const minValue = Math.min(leftValue, rightValue);
        if (curValue <= minValue) break;
        else {
          const minId = leftValue < rightValue ? leftId : rightId;
          this._swap(minId, id);
          id = minId;
        }
      }
    } else {
      this._tree = [];
    }
    return item;
  }
  get isEmpty() {
    return this._tree.length === 0;
  }
  get size() {
    return this._tree.length;
  }
  get _firstLeaf() {
    return Math.floor(this._tree.length / 2);
  }
  _isLeaf(id) {
    return id >= this._firstLeaf;
  }
  _getValue(id: number) {
    if (this._key) {
      return this._key(this._tree[id]);
    } else {
      return this._tree[id] as number;
    }
  }
  _swap(id0, id1) {
    const tree = this._tree;
    [tree[id0], tree[id1]] = [tree[id1], tree[id0]];
  }
}
