/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-23 22:44:02
 * @Description: file content
 */
import SuspenseLazy from '@/components/SuspenseLazy';
import { Navigate,RouteObject } from 'react-router-dom'
const About = SuspenseLazy(()=>import('@/pages/About'))
const Home = SuspenseLazy(()=>import('@/pages/Home'))
const Login = SuspenseLazy(()=>import('@/pages/Login'))
const Car = SuspenseLazy(()=>import('@/pages//3D/car/index.js'))
const Cuber = SuspenseLazy(()=>import('@/pages/3D/cuber'))
const Light = SuspenseLazy(()=>import('@/pages/3D/light'))
const Vector = SuspenseLazy(()=>import('@/pages/3D/vector'))
const Gltf = SuspenseLazy(()=>import('@/pages/3D/gltf'))
const Bscar = SuspenseLazy(()=>import('@/pages/3D/bscar'))
const Video = SuspenseLazy(()=>import('@/pages/3D/video'))
const Fbx = SuspenseLazy(()=>import('@/pages/3D/fbx'))
const Fiber = SuspenseLazy(()=>import('@/pages/3D/fiber'))
const Jiang = SuspenseLazy(()=>import('@/pages/3D/jiang'))

export default [
  {
    path: '/about',
    element: About,
  },
  {
    path: '/home',
    element: Home,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/3D/Car',
    element: Car,
  },
  {
    path: '/3D/Cuber',
    element: Cuber,
  },
  {
    path: '/3D/Light',
    element: Light,
  },
  {
    path: '/3D/Vector',
    element: Vector,
  },
  {
    path: '/3D/Gltf',
    element: Gltf,
  },
  {
    path: '/3D/Bscar',
    element: Bscar,
  },
   {
    path: '/3D/Video',
    element: Video,
  },
   {
    path: '/3D/fbx',
    element: Fbx,
  },
   {
    path: '/3D/fiber',
    element: Fiber,
  }, {
    path: '/3D/jiang',
    element: Jiang,
  },
  {
    // 路由重定向
    path: '/',
    element: <Navigate to='/home' />,
  },
   {
    // 路由重定向
    path: '*',
    element: <Navigate to='/home' />,
  },
] as {
  path: string
  element: JSX.Element
}[]
