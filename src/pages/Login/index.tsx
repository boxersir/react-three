/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-03-22 08:12:31
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-16 13:38:09
 * @Description: 登录web3 唤醒本地钱包
 */
import { Row, Col, Button, Space,Statistic,Card } from 'antd'
import CountUp from 'react-countup';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Web3 from 'web3';
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { cumpworkers } from '@/webWorker/cumpworker';

const formatterRun: any = (value: number) => <CountUp end={value} separator="," />;
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0x000000,0,10000)
let camera:any
// camera 的z轴距离
let zAxisNumber
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//阴影渲染器
renderer.shadowMap.enabled = true;

const ptCamera = () => {
  //视野夹角
  const fov = 15
  // 计算相机距离物体的距离
  const distance = width/2 / Math.tan(Math.PI/12)
  zAxisNumber = Math.floor(distance - 1400 / 2)
  camera = new THREE.PerspectiveCamera(fov,width/height,1,30000)
  camera.position.set(0, 0, zAxisNumber)
  camera.lookAt(0,0,0)
}
// 初始化球体
const initSphereModal = () => {
  const geometry = new THREE.SphereGeometry(50, 64, 32)
  const material = new THREE.MeshPhongMaterial()
}

// 初始化星空
const initStar = () => {
  const geometry = new THREE.BufferGeometry()
  // 创建1500个星星
  for (let index = 0; index < 1500; index++) {
    
    
  }
}

export default function Login() {
  const InitUser = {name:'',Address:'',count:''}
  const [userInfo, setUserInfo] = useState(InitUser) 
  const canvasRef = useRef<HTMLDivElement>(null)
  useEffect(() => { 
    const { current } = canvasRef
     if (current) {
          current.innerHTML = ''
       current.append(renderer.domElement)
       ptCamera()
          renderer.render(scene,camera)
     }
     const worker = cumpworkers() as Worker
    worker.postMessage({ num: 0 })
    worker.onmessage = ({ data }) => {
      const resData = JSON.parse(data)
      console.log('====================================')
      console.log(JSON.stringify(resData), 'message')
      console.log('====================================')
    }
    return () => {
        worker.terminate()
    }
  })

  const getWallet = () => {
    // if (typeof web3 !== 'undefined') {
    //   web3 = new Web3(web3.currentProvider);
    // } else {
    //   // 如果没有安装Metamask插件，提醒用户安装或使用其他钱包
    //   alert("请安装Metamask插件或使用其他以太坊钱包");
    // }
    let web3s = new Web3(window.ethereum)
    console.log(web3s);
    // 唤醒钱包
      if (window.ethereum) {
        window.ethereum.enable();
      } else {
        console.error("请安装meteMask钱包!");
        return false;
      }
    // wakeUpWallet()

    // const getCounts = async () => {
    //   await window.ethereum
    //     .request({
    //       method: "eth_requestAccounts",
    //     })
    //     .then((accounts: any) => accounts[0]
    // )
    //     .catch(() => {
    //       // 2.1 if the user cancels the login prompt
    //       throw Error("Please select an account");
    //     });
    // }
    // getCounts().then(res => {
    //   console.log(res,'counts');
    // })
    
    // 获取区块链账户
    web3s.eth.getAccounts().then((res) => {
       console.log(res);
       setUserInfo({...userInfo,Address:res[0]})
      // if (error) {
      //   console.error("获取账户地址出错：", error);
      // } else {
      //   const account = accounts[0];
      //   console.log("当前账户地址：", account);
      // }
    });
    const getBalanceInfo = async () => {
      let {Address} = userInfo
      let wei = await web3s.eth.getBalance(Address);
         return web3s.utils.fromWei(wei.toString(), "ether");
    }
    getBalanceInfo().then(res => {
      console.log('账户余额',res);
      
      setUserInfo({ ...userInfo, count: res+'0' }
    )
      
    })
    
  }
  const logOut = () => {
    setUserInfo(InitUser)
  }
  return (
      <div>
      {userInfo.Address ? <Row>
        <Col className='dashboard-section' span={12} offset={6}>
          <h2 className="wallet-status">Wallet Connected!  </h2>
          <h3 className="wallet-address-heading">
            ETH Wallet Address:
            <span className="wallet-address">{ userInfo.Address}</span>
          </h3>
          <h3 className="wallet-balance-heading">
            ETH Balance:{}
            <span className="wallet-balance"></span>
          </h3>
          <Button type="primary" className="logout-btn" onClick={logOut}>  Log out</Button>
        </Col>
      </Row> :  <Row>
            <Col className='login-section' span={12} offset={6}>
                  <Space>
                    <Button type="primary" onClick={getWallet}> Log in with Web3</Button>
                    <span className="instruction">
                        Ensure to have an Ethereum based wallet installed i.e MetaMask
                      </span>
                      <Card bordered={false}>
                          <Statistic
                            className='showFlexWrap'
                            title="Active"
                            value={1128}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="人"
                            formatter={formatterRun}
                        />
                      </Card>
                  </Space>
            </Col>
      </Row>}
      <div ref={canvasRef} id='webgl'></div>
    </div>
  )
}
