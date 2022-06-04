import { flatten } from '../flatten';

describe('数组扁平化', () => {
  it('空数组', () => {
    const res: any[] = [];
    expect(flatten(res)).toEqual([])
  })
})
