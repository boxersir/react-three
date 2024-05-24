/*
 * @Author: caixin caixin185@163.com
 * @Date: 2023-08-08 15:42:56
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-18 08:12:12
 * @Description: file content
 */
import React, { useState, useMemo,useEffect } from "react";
import { Form ,Modal} from "antd";
import { useRequest } from 'ahooks'; 
import createAlloyWorker from '@/worker/index';
// import {unstable_usePrompt,useNavigate} from "react-router-dom"
// react-router-dom v5版本
import {usePrompt} from "@/components/modal";

function sleep(t:any) {
  let now = Date.now()
  while (t + now >Date.now()) {
    
  }
}
const works = [() => console.log('任务1'),
  () => console.log('任务2'),
  () => {
    console.log('任务3'); 
    sleep(1000)
  },
()=>console.log('任务4'),()=>console.log('任务5'),()=>console.log('任务6')]
function quen() {
  let st:any = works.shift()
  st()
}
function progress(remain:any) {
  console.log('每帧剩余时间', remain.timeRemaining());
  while (remain.timeRemaining() > 0 && works.length) {
    quen()
  }
  if (works.length) {
    window.requestIdleCallback(progress)
  }
  
}
// window.requestIdleCallback(progress)
// 创建 AlloyWorker 实例
// const alloyWorker = createAlloyWorker({
//     workerName: 'alloyWorker--test',
// });

// // 挂载到全局环境, 用于调试
// // @ts-ignore
// window.alloyWorker = alloyWorker;

// // 发起第一次调用
// alloyWorker.workerAbilityTest.communicationTest()
//     .then((res) => console.log(`%cWorker test result: ${res}`, 'color: green; font-size: 20px'));

export default function Home() {
  //******************* */ 使用 prompt
  //  const {history} = useNavigate();
  // const [form] = Form.useForm();
  // const [isPrompt, setPrompt] = useState(false);
  // const handlePrompt = () => {
  //   if (!isPrompt) {
  //     return true;
  //   }
  //   Modal.confirm({
  //     title: "未保存",
  //     content: "当前内容未保存，确认退出吗？",
  //     onOk: () => {
  //       setPrompt(false);
  //       history.goBack();
  //     }
  //   });
  //   return false;
  // };
 
  // const onFinish = (values: any) => {
  //   setPrompt(false);
  //   console.log(values);
  // };
  /***********************/

  const watchSub = (e: any) => {
    // debugger
    // const query = formData.currentTarget.get("query");
    // alert(`You searched for '${query}'`);
    

    // 读取表单数据
    const form = e.target;
    const formData = new FormData(form);

    // 你可以直接将 formData 作为 fetch 请求的 body：
    // fetch('/some-api', { method: form.method||'post', body: formData });

    // 也可以使用普通的对象：
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
const  search = (e: React.FormEvent<HTMLFormElement>)=> {
  e.preventDefault()
  watchSub(e)
 }
const  searchs = (e: any)=> {
  e.preventDefault()
  watchSub(e)
}
  const pvalue = 10
  
  // const inputRef = createRef(null)
  const inputsRef = React.createRef<HTMLInputElement>()

  const [countTime, setCountTime] = useState(0)
  const doubleCount = useMemo(() => {
    return 2*countTime
  }, [countTime])
  function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('你好这是测试');
    }, 1000);
  });
}

  const { data, error, loading } = useRequest(getUsername);
  // 只会在组件初始渲染完成后执行一次。

  const [count,setCount] = useState(0)
  const add = () => {
    setCount(pre=>pre+1)
  }
  useEffect(() => {
    setCount(pre=>pre+1)  
  }, [])
  console.log('update')
  return (
    <>
      {/* <Prompt
        when={true}
        message="If you leave changes will be lost. Continue?"
        beforeUnload={true}
      /> */}
      {/* <unstable_usePrompt when={isPrompt} message={handlePrompt} /> */}
      {/* <Form form={form} labelCol={{ span: 6 }} onFinish={onFinish}>
        <Form.Item label="姓名" name="name">
          <Input onChange={() => setPrompt(true)} />
        </Form.Item>
        <Form.Item label="手机号" name="mobile">
          <Input onChange={() => setPrompt(true)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button
            htmlType="button"
            style={{ marginLeft: "24px" }}
            onClick={() => history.goBack()}
          >
            返回
          </Button>
        </Form.Item>
      </Form> */}
      <progress value={pvalue} />
      {error?<div>failed to load</div>:null}
      {loading?<div>loading...</div>:null}
 
      <div>Username: {data}</div>
      <form onSubmit={searchs}>
        <label>
        选择一个水果：
        <select name="精选水果" defaultValue="橘子">
          <option value="苹果">苹果</option>
          <option value="香蕉">香蕉</option>
          <option value="橘子">橘子</option>
        </select>
      </label>
        <label htmlFor="query">Suggestion: </label>
        <input name="query" />
         <label htmlFor="email">Email: </label>
        <input name="email" id="email" placeholder="react@example.com" />
        <div>
          <select name="loves">
            <option value="someOption">Some option</option>
            <option value="otherOption">Other option</option>
          </select>
        </div>
         <label>
        编辑你的贴子：
        <textarea
          name="postContent"
          defaultValue="我昨天骑车很高兴！"
          rows={4}
          cols={40}
        />
        </label>
        <div>
         <input ref={inputsRef} defaultValue="你好" />
        </div>
      <hr />
          <button type="submit">Search</button>
      </form>
      <button onClick={add}></button>
    </>
  )
}
