
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRef, useEffect } from 'react'
import grass6 from '@/pages/3D/cuber/imgs/grass.jpg'
import grass0 from '@/pages/3D/cuber/imgs/0.jpeg'
import { Button,  Space } from 'antd';
import * as dat from 'dat.gui'
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
   

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
    scene.background = new THREE.Color('#666')
    // scene.background =  new THREE.CubeTextureLoader().load([grass6,grass6,grass6,grass6,grass6,grass6])
    // new THREE.CubeTextureLoader().load([grass6,grass6,grass6,grass6,grass6,grass6], function ( texture:any ){
    //     scene.background = texture;
    //     // 其他代码...
    // })
//    const texture  = new THREE.TextureLoader().load(grass0)

    
    // 灯光: 
  
    // 点光源
const pointlight = new THREE.PointLight(0xffffff, 1)
    pointlight.power = 10
    pointlight.position.set(1.6, 1.8, 0.2)
    pointlight.castShadow = true
    scene.add(pointlight)
    
//添加灯光辅助
// scene.add(new THREE.PointLightHelper(pointlight,0.1))
    // // 地面
    // const meshfloor = new THREE.Mesh(
    //     new THREE.PlaneGeometry(10, 10),
    //     new THREE.MeshPhongMaterial({
    //         color: 0x1b5120,
    //     })
    // )
    // meshfloor.rotation.x -= Math.PI / 2
    // // 地面接受光源
    // meshfloor.receiveShadow = true
    // scene.add(meshfloor)
    // 雾化
    // scene.fog = new THREE.Fog('grey', 10, 15)
    
    const camera = new THREE.PerspectiveCamera()
    camera.position.y = 5
    camera.position.z = 10
    camera.position.x = 10

// 材质
const materialred = new THREE.MeshBasicMaterial({
            color: 0x0099ff,
        // shininess:1000 // 镜面反光
    })

    // 创建gltf 实例
    const loader = new GLTFLoader();
loader.load('/island.glb', function (glb) {
        // 遍历模型物体
        glb.scene.traverse(function (child:any) {
            if (child.name.includes('Plane003')) {
                //   child.material = materialred  
            }
            child.castShadow = true  
            // if (child.name.includes('Cylinder003')) {
            //     console.log(child.name);
            // //   child.receiveShadow = true
            // }
            child.receiveShadow = true  
            // if (child.name.includes('Landscape')) {
            //     child.receiveShadow = true  
            //      console.log(child.name);
            // }
        })
        scene.add(glb.scene)
    }, undefined, function(error) {
    console.error(error);
})

      // 环境光
    const light = new THREE.AmbientLight(0xffffff,1)
    scene.add(light)
    // 平行光
    const directlight = new THREE.DirectionalLight(0xffffff, 3)
    directlight.position.set(10,1,1)    
    scene.add(directlight)

    // const geometry = new THREE.BoxGeometry()
    // const material = new THREE.MeshPhongMaterial({
    //     color: 0x0099ff,
    //     shininess:1000 // 镜面反光
    //     // map:texture
    // })

    // // 创建一个三维向量
    // const vector = new THREE.Vector3(1,1,1)


    // const cube = new THREE.Mesh(geometry, material)
    // // cube.position.set(0, 1, 0)
    // cube.position.add(vector)
    // cube.position.addScalar(1)
    // cube.receiveShadow = true
    // // // 局部缩放
    // // cube.scale.set(2,1,1)
    // // 平移
    // // cube.translateX(1)
    // // 显示隐藏
    // cube.visible = true
    // // 分组

    // const cubeA = new THREE.Mesh( geometry, material );
    // cubeA.position.set( 1, 1, 1 );

    // const cubeB = new THREE.Mesh( geometry, material );
    // cubeB.position.set( -1, -1, -1 );

    // //create a group and add the two cubes
    // //These cubes can now be rotated / scaled etc as a group
    // const group = new THREE.Group();
    // group.castShadow = true
    // group.add( cubeA );
    // group.add( cubeB );
    // group.receiveShadow = true
    // //  console.log(group);
     
    // scene.add( group );


    // // 物体接受光源
    // cube.receiveShadow = true
    // cube.castShadow = true
    // scene.add(cube)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
   //阴影渲染器
    renderer.shadowMap.enabled = true;

    // const gridHelper = new THREE.GridHelper(10,10)
    // scene.add(gridHelper)
    
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.01
    
    // 坐标
    // const axesHelper = new THREE.AxesHelper(5)
    // axesHelper.position.y = 3
    // scene.add(axesHelper)
   
    function animate() {
        requestAnimationFrame(animate)
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.01
        // 旋转
        // cube.rotation.x += controlData.rotationSpeed
        // cube.rotation.y += controlData.rotationSpeed
        // cube.material.color = new THREE.Color(controlData.color)
        // material.wireframe = controlData.wireframe
        controls.update()

        renderer.render(scene,camera)
    }
    const moveCamera = () => {
        camera.position.y = 15
        camera.position.z = 10
        camera.lookAt(0,3,0)
    }
    // const moveCuber = () => {
    //     cube.position.set(3,5, 0)
    //     camera.lookAt(cube.position)   
    //     //有轨道控制器时 camera.lookAt无效
    //     // controls.target = new THREE.Vector3(3,5,0)
    // }
    
    export default function Vector() {
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
                // renderer.render(scene,camera)
                animate()
            }
            return () => {
                gui.destroy()
            }
        })
        // <Button type="primary" onClick={moveCuber} size="large">移动物体</Button>
    return (
        <>
            <div id='container'>
                <Space>
                    <Button type="primary" onClick={moveCamera} size="large">移动相机</Button>
                   
                </Space>
                <div ref={canvasRef} id='webgl'></div>
            </div>
        </>
    )
    }