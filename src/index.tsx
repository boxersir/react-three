/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: boxersir
 * @LastEditTime: 2024-05-23 11:43:16
 * @Description: file content
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'

import App from './App'
import { ConfigProvider } from 'antd'
// 语言汉化
import zhCN from 'antd/locale/zh_CN'

import store from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

//全局属性
import { GlobalProvider } from './global/provider'

import { GlobalStyle } from './assets/css/style.js';

//子应用
import StartMicApp from './modules/index.js'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
      <ConfigProvider theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#00b96b',
          borderRadius: 2,
          colorBgContainer: '#f6ffed',
        },
      }}
      locale={zhCN}>
        <Provider store={store}>
          <GlobalProvider>
            <div id="childContainer"></div>
            <App />
          </GlobalProvider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)
let timers
timers = setTimeout(() => {
  clearTimeout(timers)
  StartMicApp()
},30)
