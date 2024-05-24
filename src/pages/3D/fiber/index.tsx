/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-20 20:43:36
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-21 12:26:04
 * @Description: file content
 */
import React from "react";
// import { Perf } from "r3f-perf";
import { Canvas } from '@react-three/fiber'
import PingPang from "./pingpang";
import { useStore } from "./store";

// import styled from '@emotion/styled'
// const MainStyled = styled.div`
//     height:100%;
// `
const heightC = {
    height:'100%'
}
const style = (welcome) => ({
  color: '#000000',
  display: welcome ? 'block' : 'none',
  fontSize: '1.8em',
  left: '50%',
  position: "absolute",
  top: 40,
  transform: 'translateX(-50%)',
  background: 'rgba(255, 255, 255, .2)',
  backdropFilter: 'blur(4px)',
  padding: '16px',
  whiteSpace: 'nowrap',
  borderRadius: '12px',
  boxShadow: '1px 1px 2px rgba(0, 0, 0, .2)',
  border: '1px groove rgba(255, 255, 255, .2)',
  textShadow: '0px 1px 2px rgba(255, 255, 255, .2), 0px 2px 2px rgba(255, 255, 255, .8), 0px 2px 4px rgba(0, 0, 0, .5)',
  zIndex: '11111'
});
const Fibers = () => {
    const welcome = useStore((state) => state.welcome);
  const { reset } = useStore((state) => state.api);
    return (
        <div style={heightC}>
           
         <Canvas
        shadows
        camera={{ fov: 50, position: [0, 5, 12] }}
        onPointerMissed={() => welcome && reset(false)}
      >
        <color attach="background" args={["#9797BF"]} />
        <ambientLight intensity={1} />
        <pointLight position={[10, -10, -10]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <PingPang />
        <gridHelper args={[50, 50, '#11f1ff', '#0b50aa']} position={[0, -1.1, -4]} rotation={[Math.PI / 2.68, 0, 0]} />
            </Canvas>
             <div className="tips" style={style(welcome)}>🏓 点击任意区域开始颠球</div>
            </div>)
}
export default Fibers