/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-03-14 19:57:08
 * @Description: file content
 */
// reducer是一个纯函数
// 用于创建一个为Count组件服务的reducer，reducer本质就是一个函数
// 函数接收两个参数，分别为之前的状态（preState）动作对象（action）
export default function countReducer(
  preState = 0,
  action: { type: string; data: any }
): number {
  const { type, data } = action
  // 根据type进行数据操作
  switch (type) {
    case 'count/increment':
      return preState + data
    case 'count/decrement':
      return preState - data
    case 'count/shares':
      return data
    default:
      return preState
  }
}
