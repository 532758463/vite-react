/**
 * 数组扁平化
 */
export function flatten(arr: any[]): any[] {
  const res: any[] = [];
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        item.forEach((n) => res.push(n));
      } else {
        res.push(item);
      }
    });
  }
  return res;
}
