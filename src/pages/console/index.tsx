import React, { useMemo } from "react";
import { flatten } from '@src/utils/flatten'

/**
 * 手写函数打印
 */

export const ConsoleFn: React.FC = () => {

  const arr = [1, 2, [3, 5], 5];
  const res = flatten(arr)

  return <div>
    {res}
  </div>
}
