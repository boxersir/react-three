/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-03-27 16:10:54
 * @LastEditors: caixin
 * @LastEditTime: 2024-04-22 10:06:49
 * @Description: file content
 */
declare interface Window {
  ethereum?: any
}
declare namespace React {
   interface HTMLAttributes<T> extends HTMLAttributes<T> {
    horizontal?: boolean|string
   }
 
   interface HTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string|null
  }
  // interface HTMLAttributes<T> extends HTMLAttributes<T> {
  //   value: string|null
  // }
//   interface HTMLAttributes<T> extends HTMLAttributes<T> {
//     action: string
//   }
//   interface RefAttributes<T> extends RefAttributes<T> {
//     action: void
//   }
}

declare module three{
}

declare module 'dat.gui'