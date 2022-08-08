/* eslint-disable no-unused-vars */
/**
 * 数组长度做计数
 TypeScript 类型系统没有加减乘除运算符，怎么做数值运算呢？
不知道大家有没有注意到数组类型取 length 就是数值。
 */
type num1 = [unknown]['length'];

export type { num1 };
// TypeScript 类型系统中没有加减乘除运算符，
// 但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。

/**
 *数组长度实现加减乘除
 */

// 1. Add
type BuildArr<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Length ? Arr : BuildArr<Length, Ele, [...Arr, Ele]>;

type Add<num1 extends number, num2 extends number> = [
  ...BuildArr<num1>,
  ...BuildArr<num2>
]['length'];
type AddRes = Add<12, 13>;

//  2. Subtract减法
type Substract<
  num1 extends number,
  num2 extends number
> = BuildArr<num1> extends [...BuildArr<num2>, ...infer Rest]
  ? [...Rest]['length']
  : never;
type Substract2<
  num1 extends number,
  num2 extends number
> = BuildArr<num1> extends [...arr1: BuildArr<num2>, ...arr2: infer Rest]
  ? [...Rest]['length']
  : never;
type SubstractRes = Substract<31, 12>;
