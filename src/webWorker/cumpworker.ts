/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-16 13:26:27
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-16 13:36:11
 * @Description: file content
 */
// worker.js
class WebWorker {
    constructor(worker: WebWorker) {
        let code = worker.toString();
        code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

        const blob = new Blob([code], { type: 'text/javascript' });
        // worker地址为同源地址
        return new Worker(URL.createObjectURL(blob));
    }
}

export const cumpworkers = () => {
    function workerCode(this: Worker) {
        this.onmessage = (e: MessageEvent) => {
            debugger
            for (let index = e.data.num; index < 10000; index++) {
                this.postMessage(index)
            }
            this.postMessage(JSON.stringify(e))
        }
        this.postMessage(JSON.stringify({}))
    }
    const myWorker = new WebWorker(workerCode);
    return myWorker;
}