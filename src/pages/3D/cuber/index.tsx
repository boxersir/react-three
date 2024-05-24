/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-04-20 23:06:38
 * @LastEditors: caixin
 * @LastEditTime: 2024-04-22 13:41:08
 * @Description: file content
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRef, useEffect } from 'react'
import grass6 from '@/pages/3D/cuber/imgs/grass.jpg'
import grass0 from '@/pages/3D/cuber/imgs/0.jpeg'
import { Button,  Space } from 'antd';
import * as dat from 'dat.gui'
    
   

    const controlData = {
        rotationSpeed: 0.02,
        color: '#66ccff',
        wireframe: false,
        envMap:'无'
    }
    
    // 设置加载管理器
    // const loadingManager = new THREE.LoadingManager(
    // function() {
    //     console.log('图片加载完成')
    // },
    // function(url, loaded, total) {
    //     console.log(`图片加载中，本次加载的材质${url}，第 ${loaded}/${total} 个材质`)
    // },
    // function(err) {
    //     console.log('图片加载失败', err)
    // }
    // )
    const scene = new THREE.Scene()
    // scene.background = new THREE.Color('#666')
    scene.background =  new THREE.CubeTextureLoader().load([grass6,grass6,grass6,grass6,grass6,grass6])
    // new THREE.CubeTextureLoader().load([grass6,grass6,grass6,grass6,grass6,grass6], function ( texture:any ){
    //     scene.background = texture;
    //     // 其他代码...
    // })
   const texture  = new THREE.TextureLoader().load(grass0)

    
// 灯光
const light = new THREE.AmbientLight(0x404040)
   scene.add(light)
    // 雾化
    // scene.fog = new THREE.Fog('grey', 10, 15)
    
    const camera = new THREE.PerspectiveCamera()
    camera.position.y = 5
    camera.position.z = 10

    const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    // color: 'white',
    map:texture
})

    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0,3,0)
    scene.add(cube)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const gridHelper = new THREE.GridHelper(10,10)
    scene.add(gridHelper)
    
    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true
    // controls.dampingFactor = 0.01
    
    // 坐标
    // const axesHelper = new THREE.AxesHelper(5)
    // axesHelper.position.y = 3
    // scene.add(axesHelper)
    // renderer.render(scene,camera)
    function animate() {
        requestAnimationFrame(animate)
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.01
        // controls.update()
        cube.rotation.x += controlData.rotationSpeed
        cube.rotation.y += controlData.rotationSpeed
        cube.material.color = new THREE.Color(controlData.color)
        material.wireframe = controlData.wireframe

        renderer.render(scene,camera)
    }
    const moveCamera = () => {
        camera.position.y = 15
        camera.position.z = 10
        camera.lookAt(0,3,0)
    }
    const moveCuber = () => {
        cube.position.set(3,5, 0)
        camera.lookAt(cube.position)   
        //有轨道控制器时 camera.lookAt无效
        // controls.target = new THREE.Vector3(3,5,0)
    }
    
    export default function Cuber() {
        const canvasRef = useRef<HTMLDivElement>(null)
        useEffect(() => {
            const gui = new dat.GUI();
            const f = gui.addFolder('配置')
            f.add(controlData, "rotationSpeed").min(0.01).max(2).step(0.01)
            f.add(controlData, "envMap",['无','全反射','漫反射'])
            f.add(controlData, "color")
            f.add(controlData, "wireframe")
            f.domElement.id = 'gui'
            f.open()
            const { current } = canvasRef
            if (current) {
                current.innerHTML = ''
                current.append(renderer.domElement)
                animate()
            }
            return () => {
                gui.destroy()
            }
        })
    return (
        <>
            <div id='container'>
                <Space>
                    <Button type="primary" onClick={moveCamera} size="large">移动相机</Button>
                    <Button type="primary" onClick={moveCuber} size="large">移动物体</Button>
                </Space>
                <div ref={canvasRef} id='webgl'></div>
            </div>
        </>
    )
    }