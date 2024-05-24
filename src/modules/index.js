/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-23 07:59:17
 * @LastEditors: boxersir
 * @LastEditTime: 2024-05-23 09:57:20
 * @Description: file content
 */
import { addGlobalUncaughtErrorHandler, registerMicroApps, start } from 'qiankun';

const { REACT_APP_UPKEEP_STATIC_HOST, REACT_APP_SUB_APP_UPKEEP_PATH } = process.env
const SUB_APP_RE_ENTRY = REACT_APP_UPKEEP_STATIC_HOST + REACT_APP_SUB_APP_UPKEEP_PATH
addGlobalUncaughtErrorHandler(e => {
    console.log('qiankun捕获到错误', e);
})

export default function StartMicApp() {
    registerMicroApps([
        {
            name: 'elm', // app name registered
            entry: SUB_APP_RE_ENTRY,
            container: '#childContainer',
            activeRule: '/about',
        },
        // {
        //     name: 'vue app',
        //     entry: { scripts: ['//localhost:7100/main.js'] },
        //     container: '#yourContainer2',
        //     activeRule: '/yourActiveRule2',
        // },
    ], {
        beforeLoad: app => {
            console.log('开始加载子', app.name)
        },
        afterMount: app => {
            console.log('加载子完毕', app.name)
        },
    });
    start({
        sandbox: false,
        // fetch(url, ...args) {

        // }
    })
}