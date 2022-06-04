import { flatten } from '../flatten';

describe('数组扁平化', () => {
  it('空数组', () => {
    const res: any[] = [];
    expect(flatten(res)).toEqual([]);
  });
  it('二层数组', () => {
    const res: any[] = [1, 2, [4, 5], 8];
    expect(flatten(res)).toEqual([1, 2, 4, 5, 8]);
  });
});
