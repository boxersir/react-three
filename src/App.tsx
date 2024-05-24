/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: boxersir
 * @LastEditTime: 2024-05-23 11:39:50
 * @Description: file content
 */
import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { useNavigate, useRoutes } from 'react-router-dom'
import routes from './routes/index'
const {  Content } = Layout

console.log('全局变量',process.env)
const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  // 获得路由表
  const routeView = useRoutes(routes)
  const navigate = useNavigate()
  // 面包屑名称
  const [breadcrumbName, setBreadcrumbName] = useState('home')
  // 点击菜单
  const handleSiderClick: MenuProps['onClick'] = ({ key, keyPath }) => {
    const name = keyPath.reverse().join('/') || ''
    setBreadcrumbName(name)
    if (key !== 'home' && key !== 'about') return
    // 路由跳转
    navigate(key, {
      replace: false,
      state: {
        id: key,
      },
    })
  }

  return (
        <Layout className='height_100'>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
      >
            {routeView}
          </Content>
    </Layout>
  )
}

export default App
