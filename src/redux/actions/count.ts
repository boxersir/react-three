/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-03-14 19:59:31
 * @Description: file content
 */
export const increment = (data: any) => ({ type: 'count/increment', data })
export const decrement = (data: any) => ({ type: 'count/decrement', data })

// 模拟异步操作
export const incrementAsync = (data: any, delay: number) => {
  return (dispatch: (arg0: { type: string; data: any }) => void) => {
    setTimeout(() => {
      dispatch(increment(data))
    }, delay)
  }
}
