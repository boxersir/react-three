/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-21 11:39:16
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-21 11:39:46
 * @Description: file content
 */
import { useMemo } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import fontJson from "./firasans_regular.json";

const font = new FontLoader().parse(fontJson);
const geom = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
  (number) => new TextGeometry(number, { font, height: 0.1, size: 5 })
);

export default function Text({ color = 0xffffff, count, ...props }) {
  const array = useMemo(() => [...count], [count]);
  return (
    <group {...props} dispose={null}>
      {array.map((char, index) => (
        <mesh
          position={[-(array.length / 2) * 3.5 + index * 3.5, 0, 0]}
          key={index}
          geometry={geom[parseInt(char)]}
        >
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}