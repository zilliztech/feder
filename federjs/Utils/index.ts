export const getPercentile = (items: any[], key: string, p: number): number => {
  if (items.length === 0) return -1;
  items.sort((a, b) => a[key] - b[key]);
  p = Math.min(p, 1);
  p = Math.max(p, 0);
  const k = Math.round(p * (items.length - 1));
  return items[k][key];
};

export const fixedNumber = (p: number, n: number): string => {
  return p.toFixed(n);
};

export const randomSelect = (arr: any[], k: number) => {
  const res = new Set();
  k = Math.min(arr.length, k);
  while (k > 0) {
    const itemIndex = Math.floor(Math.random() * arr.length);
    if (!res.has(itemIndex)) {
      res.add(itemIndex);
      k -= 1;
    }
  }
  return Array.from(res).map((i: number) => arr[i]);
};
