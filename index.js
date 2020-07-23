// 雪星并击 | snochorded
// Copyright 2020 snomiao@gmail.com
// LICENSE - GPLv3
// (20200722) 创建

// 规则转换函
const 按长度倒序 = (a, b) => b.length - a.length
const 串字符按顺序排序 = (串) => 串.split('').sort().join('')
const 规则向表解析 = (输入规则串, 输出规则串) => {
    const [输入列, 输出列] = [输入规则串, 输出规则串].map(串 => 串.split(' '))
    const 对应关系列 = 输入列.map((输入, 序) => [串字符按顺序排序(输入), 输出列[序]])
    const 对应关系 = Object.fromEntries(对应关系列)
    return 对应关系
}
const 规则表转换 = (规则, 原字符串, 新字符串) => JSON.parse(JSON.stringify(规则).replace(/\d/g, (字符) => 新字符串[原字符串.indexOf(字符)]))
// 插空法
const 全排列 = (串) =>
    串.length <= 1
        ? [串]
        : 串.split('').flatMap((字, 序) =>
            全排列(串.slice(0, 序) + 串.slice(序 + 1))
                .map(排列串 => 字 + 排列串))

// 全排列
const 规则表全序支持 = (规则) => {
    const 规则列 = Object.entries(规则)
    const 全序规则列 = 规则列.flatMap(([键, 值]) => 全排列(键).map(键 => [键, 值]))
    return Object.fromEntries(全序规则列)
}
const 规则表向字母区扩展 = (规则) => {
    // `1234567890` => `qwertyuiop`
    //                 `asdfghjkl;`
    //                 `zxcvbnm,./`
    return {
        ...规则,
        ...规则表转换(规则, `1234567890`, `qwertyuiop`),
        ...规则表转换(规则, `1234567890`, `asdfghjkl;`),
        ...规则表转换(规则, `1234567890`, `zxcvbnm,./`),
    }
}
console.log(规则表向字母区扩展(规则向表解析('1 2 3 4 5 34 24 23 13 12', '1 2 3 4 5 6 7 8 9 0')))
console.log(规则表向字母区扩展(规则向表解析('90 80 89 79 78 6 7 8 9 0', '1 2 3 4 5 6 7 8 9 0')))

// 定义规则
const 左手规则表 = 规则表全序支持(规则表向字母区扩展(规则向表解析('1 2 3 4 5 34 24 23 13 12', '1 2 3 4 5 6 7 8 9 0')))
const 右手规则表 = 规则表全序支持(规则表向字母区扩展(规则向表解析('90 80 89 79 78 6 7 8 9 0', '1 2 3 4 5 6 7 8 9 0')))
const 左手按键集 = new Set([...Object.keys(左手规则表)].join('').split(''))
const 右手按键集 = new Set([...Object.keys(右手规则表)].join('').split(''))
const 其他字符集 = new Set(" ")
const 可退改字符列 = [...左手按键集, ...右手按键集, ...其他字符集].filter(e => /[a-z]/.test(e))
// const 直接映射集 = 
const 按键重映射 = (输入) => {
    const 输入字符列 = 输入.split('')
    const 左手输入 = 输入字符列.filter(字 => 左手按键集.has(字)).sort().join('')
    const 右手输入 = 输入字符列.filter(字 => 右手按键集.has(字)).sort().join('')
    const 其他输入 = 输入字符列.filter(字 => (左手输入 + 右手输入).indexOf(字) == -1).join('')
    const 左手输出 = 左手规则表[左手输入] || ''
    const 右手输出 = 右手规则表[右手输入] || ''
    return 左手输出 + 右手输出 + 其他输入
}

if (!module?.parent) (async () => {
    console.log(按键重映射('1289'));
    console.log(按键重映射('dfjk'));
    console.log(按键重映射('fdjk'));
    console.log(按键重映射('1289qwu'));
    console.log(JSON.stringify([左手规则表, 右手规则表, [...左手按键集], [...右手按键集]]))

    // const { readFile, writeFile } = require('fs')
    // const { promisify } = require('util')
    // const 路径 = '雪星并击.ahk'
    // const 脚本 = await promisify(readFile)(路径, 'utf8')
    // const 新脚本 = 脚本.replace(/(?<=;\s*?雪星并击规则集与分手按键表\s*?{{\s?\n)[\s\S]*?(?=\s*; }})/, [
    //     // `; 雪星并击规则集与分手按键表{{`
    //     `global LeftHandRule := ` + JSON.stringify(左手规则表),
    //     `global RightHandRule := ` + JSON.stringify(右手规则表),
    //     `global LeftHandKeys := ` + JSON.stringify([...左手按键集]),
    //     `global RightHandKeys := ` + JSON.stringify([...右手按键集]),
    //     `global AllowRewrite := ` + JSON.stringify(可退改字符列.join('')),
    //     // `; }}`
    // ].join('\n'))
    // await promisify(writeFile)(路径, 新脚本)
    // console.log(新脚本);
})().catch(console.error)