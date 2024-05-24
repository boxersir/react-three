/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-22 16:31:34
 * @LastEditors: boxersir
 * @LastEditTime: 2024-05-22 21:54:52
 * @Description: file content
 */

const fs = require('fs');
const path = require('path');
let igText = null

class CheckFileSize {
    constructor(options) {
        this.options = options || { size: 1024 * 1024 * 5 }
    }
    apply(compiler) {
        const pluginName = CheckFileSize.name;
        // webpack 模块实例，可以通过 compiler 对象访问，
        // 这样确保使用的是模块的正确版本
        // （不要直接 require/import webpack）
        const { webpack } = compiler;
        // Compilation 对象提供了对一些有用常量的访问。
        const { Compilation } = webpack;

        compiler.hooks.beforeRun.tapAsync('CheckFileSize', (callback) => {
            console.log('CustomPlugin: 准备打包项目,检测文件大小是否超过5M...');
            const FILE_PATH = path.resolve(__dirname, 'path/to/your/file.js');

            fs.stat(FILE_PATH, (err, stats) => {
                if (err) {
                    return callback(new Error(`Error checking file size: ${err.message}`));
                }
                if (stats.size > MAX_SIZE) {
                    return callback(new Error('File size exceeds the maximum allowed size.'));
                }
                callback();
            });
            // const { size } = this.options
            // const assets = Object.keys(compilation.assets)
            // console.log(assets)
            // compilation.hooks.processAssets.tap(
            //     {
            //         name: pluginName,

            //         // 用某个靠后的资源处理阶段，
            //         // 确保所有资源已被插件添加到 compilation
            //         stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
            //     },
            //     (assets) => {
            //         console.log(assets);
            //     })
            // // const assets = Object.keys(compilation.assets)
            // let filePath = path.resolve(__dirname, '.webpacks.json');
            // fs.appendFile(filePath, compilation.toString(), (err) => {
            //     if (err) {
            //         console.error(err);
            //         return;
            //     }
            // });
            // // for (let filename of assets) {
            // //     const asset = compilation.assets[filename];
            // //     if (asset.size() > size) {
            // //         console.log(JSON.stringify(assets));
            // //     }
            // // }
            // // callback()
            // return
        })
    }
}
class CustomPlugin {
    constructor(options) {
        this.options = options || { size: 1024 * 1024 * 5 }
    }
    apply(compiler) {
        // 实例化一个钩子
        compiler.hooks.emit.tapAsync('CustomPlugin', (compilation, callback) => {
            console.log('CustomPlugin: 准备打包项目,检测文件大小是否超过5M...');
            const { size } = this.options
            const assets = Object.keys(compilation.assets)
            for (let filename of assets) {
                const asset = compilation.assets[filename];
                if (asset.size() > size) {
                    console.log(assets)
                    console.warn(`因文件太大，跳过文件并写入gitignore忽略文件: ${filename} (${size} bytes)`);
                }
            }
            callback();
        });
    }
}
// afterCompile
class IgnorePlugin {
    constructor(options) {
        this.options = options || { size: 1024 * 1024 * 5 }
    }
    apply(compiler) {
        // 实例化一个钩子
        compiler.hooks.afterCompile.tapAsync('CustomPlugin', (compilation, callback) => {
            // 在发射资源到输出目录之前，记录一条消息
            console.log('CustomPlugin: 准备打包项目,检测文件大小是否超过5M...');
            const { size } = this.options
            const assets = Object.keys(compilation.assets)

            fs.readFile('.gitignore', 'utf8', (err, data) => {
                if (err) {
                    console.error('读取文件时发生错误:', err);
                    return;
                }
                //文件内容
                igText = data;
            })
            for (let filename of assets) {
                const asset = compilation.assets[filename];
                if (asset.size() > size) {
                    let filePath = path.resolve(__dirname, '.gitignore');
                    console.warn(`因文件太大，跳过文件并写入gitignore忽略文件: ${filename} (${size} bytes)`);
                    let nowName = pickFileName(filename)
                    let orignPath = findPath(nowName)
                    // let orignPath
                    // findFile('./src', nowName, (err, files) => {
                    //     if (err) {
                    //         console.error('Error finding file:', err);
                    //         return;
                    //     }
                    //     console.log('Found files:', files);
                    // });

                    if (!igText.includes(orignPath)) {
                        fs.appendFile(filePath, '\n' + orignPath, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                }
            }
            callback();
        });
    }
}
function pickFileName(str = '') {
    //static/media/house.b3da7d7fa099cf1f4f95.jpg
    let types = str.slice(str.lastIndexOf('.'))
    let firName = str.slice(str.lastIndexOf('/') + 1)
    let tem = firName.slice(0, str.slice(str.lastIndexOf('/') + 1).indexOf('.'))
    return (str.indexOf('.') === -1 ? str : (tem + types))
}

function findPath(name) {

    // 文件名
    const filename = name;

    // 当前目录开始搜索
    let currentPath = './src';
    let found = false;
    let realPath = null

    while (!found) {
        const fullPath = path.join(currentPath, filename);
        if (fs.existsSync(fullPath)) {
            console.log(`文件找到: ${fullPath}`);
            realPath = fullPath
            found = true;
        } else {
            // 移动到上级目录
            currentPath = path.resolve(currentPath, '..');
            if (currentPath === '/') {
                console.log('文件未找到。');
                break;
            }
        }
    }
    return realPath
}
function findFile(startDir, fileName, callback) {
    let results = [];
    console.log('查找文件', fileName);
    fs.readdir(startDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err, null);
            return;
        }

        let pending = files.length;
        if (!pending) {
            callback(null, results);
        }

        files.forEach((file, index) => {
            file = path.resolve(startDir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    findFile(file, fileName, (err, res) => {
                        results = results.concat(res);
                        if (!--pending) {
                            callback(null, results);
                        }
                    });
                } else {
                    if (path.basename(file) === fileName) {
                        results.push(file);
                    }
                    if (!--pending) {
                        callback(null, results);
                    }
                }
            });
        });
    });
}

module.exports = { CustomPlugin, CheckFileSize, IgnorePlugin };