/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-03-22 13:44:27
 * @LastEditors: caixin
 * @LastEditTime: 2024-03-22 16:01:26
 * @Description: file content
 */
export interface Todo {
    id: number
    label: string
    editable: boolean
    state:string
}

export interface Listing{
    city: string
    title: string
    viewed: boolean
    createdTimestamp:number
}