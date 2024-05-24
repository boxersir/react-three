/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-23 20:51:46
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-23 23:41:44
 * @Description: file content
 */
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import Stats from "three/examples/jsm/libs/stats.module";
import segmentTexture from './WechatIMG5.jpg';
import normalMapTexture from './NormalMap.png';
import metalTexture from './metal.png';
import backgroundTexture from './bg.jpeg';


const renderer = new THREE.WebGLRenderer({ antialias: true })
const  scene: any = new THREE.Scene()	// 创建一个场景
const  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)	// 创建一个摄像机
// 贴图材质
let material: any, box:any,meshes = [],light,controls,stats

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.needsUpdate = true

scene.background = new THREE.TextureLoader().load(backgroundTexture)
camera.position.set(0, 0, 50)
camera.lookAt(new THREE.Vector3(0,0,0))

// 添加自定义模型
      let segmentMap = new THREE.MeshPhysicalMaterial({map: new THREE.TextureLoader().load(segmentTexture), normalMap: new THREE.TextureLoader().load(normalMapTexture) });
      let metalMap = new THREE.MeshPhysicalMaterial({map: new THREE.TextureLoader().load(metalTexture)});
      //创建纹理数组
      const boxMaps = [metalMap, metalMap, metalMap, metalMap, segmentMap, segmentMap];
      box = new THREE.Mesh(new THREE.BoxGeometry(411, 623, 12), boxMaps);
      box.material.map(item => {
        item.metalness = .5;
        item.roughness = .4;
        item.refractionRatio = 1;
        return item;
      });
      box.scale.set(0.085, 0.085, 0.085);
      box.position.set(-48, 2, -20);
      box.castShadow = true;
      meshes.push(box);
      scene.add(box);

// 直射光
      const cubeGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
      const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(0, 0, 0);
      light = new THREE.DirectionalLight(0xffffff, 1);
      light.intensity = 1;
      light.position.set(18, 20, 60);
      light.castShadow = true;
      light.target = cube;
      light.shadow.mapSize.width = 512 * 12;
      light.shadow.mapSize.height = 512 * 12;
      light.shadow.camera.top = 80;
      light.shadow.camera.bottom = -80;
      light.shadow.camera.left = -80;
      light.shadow.camera.right = 80;
      scene.add(light);
      // 半球光
      const ambientLight = new THREE.AmbientLight(0xffffff);
      ambientLight.intensity = .8;
      scene.add(ambientLight);
      // 环境光
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xfffc00);
      hemisphereLight.intensity = .3;
      scene.add(hemisphereLight);
      
      controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-48, 2, -20);
      controls.dampingFactor =true
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.enablePan = false;
    //   controls.rotateSpeed = .01;

const animate = () => {
     requestAnimationFrame(animate);
      renderer.render(scene, camera);
    //   stats && stats.update();
      controls && controls.update();
      TWEEN && TWEEN.update();
      box && (box.rotation.y -= .01);
}
export default function JianOwner() {
    const jiangOwner = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const { current } = jiangOwner
        if (current) {
            current.innerHTML = ''
            current.append(renderer.domElement)
            animate() 
        }    
    },[])
    return (
        <div ref={jiangOwner}></div>
    )
}