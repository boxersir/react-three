/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-03-14 19:59:03
 * @Description: file content
 */
export interface TigerVo {
  id: string
  name?: string
  age?: number
}
const initList: TigerVo[] = [
  {
    id: '001',
    name: '狮美丽',
    age: 4,
  },
]
export default function tigerReducer(
  preState = initList,
  action: { type: string; data: TigerVo }
) {
  const { type, data } = action
  // 根据type进行数据操作
  switch (type) {
    case 'tiger/add':
      // preState.unshift(data) 操作上来说和[preState, ...initList]是等价的
      // 但是[preState, ...initList]此方式返回的是一个新数组，不会影响原数组
      return [data, ...preState]
    case 'tiger/del':
      return preState?.filter((item) => item.id !== data.id)
    default:
      return preState
  }
}
