/**
 * @description 自动生成组件模版 依次传入以下参数 例: npm run component h-button 按钮
 * @param {string} @requires name required 组件名
 */
const fs = require('fs');
const path = require('path');

const toHumpNaming = (name) => {
    return name;
};

// 返回空格数
const space = (num) => {
    let i = 0;
    let str = '';
    while (i++ < num) {
        str += ' ';
    }
    return str;
};

const makeComponent = () => {
    const arr = process.argv.slice(2);
    if (arr.length < 1) {
        console.error('缺少必传参数');
        return;
    }
    // 生成组件的目录
    const rootPath = path.resolve(__dirname, '../components');
    const workPath = path.resolve(rootPath, arr[0]);
    const componentName = toHumpNaming(arr[0]);
    const htmlContent = `<template>\n${space(4)}<div>\n${space(8)}\n${space(4)}</div>\n</template>`;
    const scriptContent = `<script>\nexport default {\n${space(4)}name: '${arr[0]}',\n${space(4)}data() {\n${space(
        8
    )}return {\n${space(12)}\n${space(8)}}\n${space(4)}}\n}\n</script>`;
    const styleContent = `<style scoped>\n\n</style>`;
    const vueContent = `${htmlContent}\n\n${scriptContent}\n\n${styleContent}`;

    // 开始建文件夹 -> 写文件
    fs.mkdir(workPath, (err) => {
        if (err) {
            throw err;
        }
        fs.writeFile(path.resolve(workPath, componentName + '.vue'), vueContent, 'utf-8', (err) => {
            if (err) {
                throw err;
            }
        });
    });
};

makeComponent();
