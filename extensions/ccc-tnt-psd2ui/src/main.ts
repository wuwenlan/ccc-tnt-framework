//@ts-ignore
import packageJSON from '../package.json';
import fs from 'fs-extra';
import path from 'path';

import child_process from "child_process";
let exec = child_process.exec;


const ENGINE_VER = "v342"; // 
const projectAssets = path.join(Editor.Project.path, "assets");
const cacheFile = path.join(Editor.Project.path, "local", "psd-to-prefab-cache.json");
const commandBat = path.join(Editor.Project.path, `extensions\\${packageJSON.name}\\libs\\psd2ui\\command.bat`);
const configFile = path.join(Editor.Project.path, `extensions\\${packageJSON.name}\\config\\psd.config.json`);
let uuid2md5: Map<string, string> = new Map();
let cacheFileJson: Record<string, any> = {};
/**
 * @en 
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    openPanel() {
        Editor.Panel.open(packageJSON.name);
    },

    onClickPsd2UICache() {
        console.log(`main-> onClickPsd2UICache111 `);
        return new Promise<void>((resolve, reject) => {
            console.log(`main-> onClickPsd2UICache`);


            let options = {
                "project-assets": projectAssets,
                "cache": cacheFile,
                "init": true,
                "engine-version": ENGINE_VER
            }

            Promise.all(_exec(options, [])).then(() => {
                console.log("[psd2prefab]  执行缓存结束");
                resolve();
            });
        })
    },

    async onPsd2UIDropFiles(param) {

        let files = param.files;
        let isForceImg = param.isForceImg;
        let isImgOnly = param.isImgOnly;
        let output = param.output

        let options = {
            "project-assets": projectAssets,
            "cache": cacheFile,
            "engine-version": ENGINE_VER,
        }

        let tasks: Promise<void>[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            let stat = fs.statSync(file);
            if (stat.isFile()) {
                let ext = path.extname(file);
                if (ext != '.psd') {
                    continue;
                }
            }
            let args = JSON.parse(JSON.stringify(options));
            args["input"] = file;
            if (output) {
                args["output"] = output;
            }
            if (isImgOnly) {

                // 只导出图片
                args["img-only"] = true;
            } else {

                // 强制导出图片
                if (isForceImg) {
                    args["force-img"] = true;
                }
                args["config"] = configFile;
            }
            _exec(args, tasks)
        }

        await Promise.all(tasks);
        genUUID2MD5Mapping();
        console.log("[ccc-tnt-psd2ui]  psd 导出完成，输出位置为：", output ? output : "psd 同级目录");
    },
};
function _exec(options: Record<string, any>, tasks: Promise<void>[]) {
    let jsonContent = JSON.stringify(options);

    // console.log("[ccc-tnt-psd2ui] 批处理命令参数：" + jsonContent);
    let base64 = Buffer.from(jsonContent).toString("base64");
    // console.log('[ccc-tnt-psd2ui] start ' + commandBat + ' ' + `--json ${base64}`);
    tasks.push(new Promise<void>((rs) => {
        exec('start ' + commandBat + ' ' + `--json ${base64}`, { windowsHide: false }, (err, stdout, stderr) => {
            rs();
        })
    }));
    return tasks;
}

/**
 * 资源删除的监听
 *
 * @param {*} event
 */
function onAssetDeletedListener(event: any) {
    if (uuid2md5.has(event)) {
        let md5 = uuid2md5.get(event);
        console.log(`[ccc-tnt-psd2ui] 删除资源 md5: ${md5}, uuid: ${event}`);
        delete cacheFileJson[`${md5}`];
        fs.writeFileSync(cacheFile,JSON.stringify(cacheFileJson,null,2));
    }
}

/**
 * 生成 uuid 转 MD5 的映射
 *
 */
function genUUID2MD5Mapping() {
    if (!fs.existsSync(cacheFile)) {
        return;
    }
    let content = fs.readFileSync(cacheFile, 'utf-8');
    let obj = JSON.parse(content);
    cacheFileJson = obj;
    for (const key in obj) {
        const element = obj[key];
        uuid2md5.set(element.textureUuid, key);
    }
}

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
export const load = function () {
    genUUID2MD5Mapping();
    Editor.Message.addBroadcastListener("asset-db:asset-delete", onAssetDeletedListener);
};

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export const unload = function () {

    Editor.Message.removeBroadcastListener("asset-db:asset-delete", onAssetDeletedListener);
};
