/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-15 21:27:11
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-16 09:38:02
 * @Description: file content
 */
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
 
interface MeshT{
    current:any
}
const worker = new Worker(new URL('../../../webWorker/worker.js', import.meta.url));

 
 const Video3D = () => {
     const video:MeshT = useRef(null);
     const mesh: MeshT = useRef(null);
     const canvasRef = useRef<HTMLDivElement>(null)
     const originR = useRef(true);
     // 监听worker发送过来的消息
     worker.addEventListener('message', (e) => {
         //  console.log('结果:', e.data); // 输出worker计算后的结果
         originR.current = e.data
     });
    useEffect(() => {
//          const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//       const video = document.createElement('video');
//         video.src = './开课啦.mp4';
       
// //   video.load(); // 加载视频
// //   video.play(); // 播放视频
//         video.addEventListener('loadeddata', () => {
//      alert(11)
//  })
//         video.addEventListener('load', () => {
//       debugger
//     const texture = new THREE.VideoTexture(video);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     const geometry = new THREE.PlaneGeometry(1, 1);
//       const mesh = new THREE.Mesh(geometry, material);
//       video.play()
//     scene.add(mesh);
//       // 在这里进行渲染操作
//        renderer.render(scene, camera);
//         });
        video.current.autoPlay = true
        video.current.loop = true
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 创建全屏视频纹理
        const videoTexture = new THREE.VideoTexture(video.current);
        // videoTexture.needsUpdate = true
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({ map: videoTexture });
    mesh.current = new THREE.Mesh(geometry, material);
    scene.add(mesh.current);
 
    camera.position.z = 5;
 
        const animate = () => {
        
            requestAnimationFrame(animate);
            if (originR.current) {
                mesh.current.rotation.x = 0
            } else {
                mesh.current.rotation.x += 0.01;
            }
            // 发送消息到worker

            worker.postMessage(mesh.current.rotation.x);
            
            //  mesh.current.rotation
    //   mesh.current.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
 
    const { current } = canvasRef
    if (current) {
        current.innerHTML = ''
        current.append(renderer.domElement)
        animate();
    }
        document.addEventListener('click', () => {
            if (video.current.muted) {
                video.current.play()
            }
            video.current.muted = !video.current.muted
        }, false);
        // return  () => worker.terminate()
  }, []);
 
  return (
    <div>
      {/* <video
        ref={video}
        src="./开课啦.mp4"
        playsInline
        loop
        autoPlay
        style={{ display: 'none' }}
      /> */}
           <div ref={canvasRef} id='webgl'></div>
           <video ref={video} id="playChatVideo" style={{ display: 'none' }} autoPlay  width="320" height="240" controls>
            <source src={require('./开课啦.mp4')} type="video/mp4"></source>
            </video>
    </div>
  );
};
 
export default Video3D;