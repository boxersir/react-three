/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-15 23:30:19
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-21 13:57:01
 * @Description: file content
 */
// worker.js

// 处理数据的函数
function computeIntensiveOperation(data) {
    // console.log(data)
}

// 监听主线程发送过来的消息
this.addEventListener('message', (e) => {
    // computeIntensiveOperation(e.data);
    // 计算完毕后，将结果发送回主线程
    postMessage(e.data > 0.1);
});