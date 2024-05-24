/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-03-30 20:14:50
 * @LastEditors: caixin
 * @LastEditTime: 2024-03-30 21:25:02
 * @Description: file content
 */

import React, {ReactNode} from 'react';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
export const GlobalContext = React.createContext({dayjs: dayjs,
    initUser:'test'});
interface Props {
    children?: ReactNode
}
export const GlobalProvider = ({ children}:Props) => {
  const globalState = {
    dayjs: dayjs,
    initUser:'test'
  };
  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};