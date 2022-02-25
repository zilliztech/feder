import PriorityQueue from '../esm/Utils/PriorityQueue.js';

const items_0 = [1, 3, 5, 38, 8, 7, 3, 4, 55];
let p = new PriorityQueue(items_0);
while (!p.isEmpty) {
  console.log(p.pop());
}

console.log('===>\ntest key = () => {}');
const items_1 = items_0.map((value, id) => ({ id, value }));
p = new PriorityQueue(items_1, (item) => item.value);
while (!p.isEmpty) {
  console.log(p.pop());
}

console.log('===>\ntest key = string');
p = new PriorityQueue(items_1, 'value');
while (!p.isEmpty) {
  console.log(p.pop());
}

console.log('===>\ntest add');
p = new PriorityQueue(items_1, (item) => item.value);
const items_2 = [1, 3, 5, 7, 9, 11, 44].map((value, id) => ({ id, value }));
while (!p.isEmpty) {
  console.log(p.pop());
  if (items_2.length > 0) {
    const item = items_2.pop();
    console.log('add', item)
    p.add(item);
  }
}
