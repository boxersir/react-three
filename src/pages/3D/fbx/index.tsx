/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-16 09:09:59
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-16 19:51:48
 * @Description: file content
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { useRef, useEffect } from 'react'
//引入性能监视器stats.js
import Stats from 'three/examples/jsm/libs/stats.module';
import MyHouse from '../house';

const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xa0a0a0 );//背景色
scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );//雾化

// 地面
const meshfloor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshPhongMaterial({
        color: 0x1b5120,
    })
)
meshfloor.rotation.x -= Math.PI / 2
// 地面接受光源
meshfloor.receiveShadow = true
scene.add(meshfloor)

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
camera.position.set( 100, 200, 300 );//位置

const light = new THREE.HemisphereLight( 0xffffff, 0x444444,10 );//没有光线，将啥也看不到
light.position.set( 0, 200, 0 );
scene.add( light );
const loader = new FBXLoader()
const clock = new THREE.Clock()
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 100, 0 );
controls.update();
renderer.setSize(window.innerWidth, window.innerHeight);
//阴影渲染器
renderer.shadowMap.enabled = true;
let mixer: any = null,AnimationAction:any,stats:any
const path = require('./Mma-Kick.fbx')
loader.load(path, function (obj) {
    obj.traverse(function (child:any) {
        if (child.isMesh) {
            // 移除或替换不支持的材质属性
            if (child.material.shininessMap && child.material.shininessMap.name === 'ShininessExponent') {
                // 移除或替换材质
                child.material = new THREE.MeshPhongMaterial();
                // 设置其他合适的材质参数
            }
        }
    });
    // 添加到场景或执行其他操作
    scene.add(obj)
     // obj作为参数创建一个混合器，解析播放obj及其子对象包含的动画数据
  mixer = new THREE.AnimationMixer(obj);
  // 查看动画数据
  console.log(obj.animations)
  // obj.animations[0]：获得剪辑对象clip
  AnimationAction=mixer.clipAction(obj.animations[0]);
  // AnimationAction.timeScale = 1; //默认1，可以调节播放速度
  // AnimationAction.loop = THREE.LoopOnce; //不循环播放
  AnimationAction.clampWhenFinished=false;//暂停在最后一帧播放的状态
//   AnimationAction.play();//播放动画
})

//初始化性能插件
function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}
function render() {
     stats.update();
    renderer.render(scene, camera)
    requestAnimationFrame(render)
    if (mixer !== null) {
        mixer.update(clock.getDelta())
    }
}
const animateT = () => {
    console.log(AnimationAction)
    console.log('mixer',mixer);
    
    if (AnimationAction.time <= 0||AnimationAction.paused) {
        if (AnimationAction.paused) {
            AnimationAction.paused = false
        }else {
            AnimationAction.play()
        }
    } else {
        // mixer.setTime(mixer.time)
        // mixer.stopAllAction()
        // AnimationAction.clampWhenFinished = true
        // AnimationAction.stop()
        AnimationAction.paused = true
    }
}
export default function Fbx() {
     const canvasRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => { 
        const { current } = canvasRef
        if (current) {
            current.innerHTML = ''
            current.append(renderer.domElement)
            initStats();
            render();
        }
    },[])
    return (<>
           <MyHouse></MyHouse>
           <div ref={canvasRef} onClick={animateT} id='webgl'></div>
    </>)
}