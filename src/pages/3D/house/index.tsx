/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-16 19:43:59
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-16 21:21:02
 * @Description: file content
 */
import React,{useEffect,useRef} from 'react'
import * as THREE from 'three'	// 引入 Three.js 插件
import banner from './house.jpg'	// 引入全景图
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



   const renderer: any = new THREE.WebGLRenderer({ antialias: true })	// 创建一个渲染器 抗锯齿
   const  scene: any = new THREE.Scene()	// 创建一个场景
   const  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)	// 创建一个摄像机
   const  geometry = new THREE.SphereGeometry(100, 60, 40)	// 创建一个球形的容器，用于贴全景图上去
   let  material: any	// 贴图材质
   let  mesh: any
   
        geometry.scale(-1, 1, 1)

        let texture = new THREE.TextureLoader().load(banner)
material = new THREE.MeshBasicMaterial({ map: texture })
        
        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        
        renderer.setSize(window.innerWidth, window.innerHeight)



        camera.position.z = 500
        camera.position.x = 100

        
        // 实现窗口大小改变的时候改变全景图的显示大小
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onWindowResize, false)

	// 逐帧渲染
    const animate = () => {
        requestAnimationFrame(animate)
        mesh.rotation.y += 0.001
        mesh.rotation.x += 0.0005
        renderer.render(scene, camera)
    }
const MyHouse = () => {
    const ballHouse = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const { current } = ballHouse
        if (current) {
            current.innerHTML = ''
            current.append(renderer.domElement)
            animate() 
        }
    },[])
    return (
        <div ref={ballHouse}>

        </div>
    )
    
}

export default MyHouse