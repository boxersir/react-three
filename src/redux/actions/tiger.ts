/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-03-14 20:07:32
 * @Description: file content
 */
import { TigerVo } from "@/redux/reducers/tiger"
export const increTiger = (data: TigerVo) => ({ type: 'tiger/add', data })
export const delTigerById = (data: TigerVo) => ({ type: 'tiger/del', data })