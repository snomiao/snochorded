# 雪星并击 | snochorded

## 编码规则

规则解读：`同时按下 => 输出`

### 左手编码：

||||||
|-|-|-|-|-|
|`1 => 1` |`2 => 2` |`3 => 3` |`4 => 4` |`5 => 5` |
|`q => q` |`w => w` |`e => e` |`r => r` |`t => t` |
|`a => a` |`s => s` |`d => d` |`f => f` |`g => g` |
|`z => z` |`x => x` |`c => c` |`v => v` |`b => b` |
|`12 => 0`|`13 => 9`|`23 => 8`|`24 => 7`|`34 => 6`|
|`qw => p`|`qe => o`|`we => i`|`wr => u`|`er => y`|
|`as => ;`|`ad => l`|`sd => k`|`sf => j`|`df => h`|
|`zx => /`|`zc => .`|`xc => ,`|`xv => m`|`cv => n`|

### 右手编码：

||||||
|-|-|-|-|-|
|`6 => 6` |`7 => 7` |`8 => 8` |`9 => 9` |`0 => 0` |
|`y => y` |`u => u` |`i => i` |`o => o` |`p => p` |
|`h => h` |`j => j` |`k => k` |`l => l` |`; => ;` |
|`n => n` |`m => m` |`, => ,` |`. => .` |`/ => /` |
|`78 => 5`|`79 => 4`|`89 => 3`|`08 => 2`|`09 => 1`|
|`ui => t`|`uo => r`|`io => e`|`pi => w`|`po => q`|
|`jk => g`|`jl => f`|`kl => d`|`;k => s`|`;l => a`|
|`m, => b`|`m. => v`|`,. => c`|`/, => x`|`/. => z`|

## 来点例子：

英文：
|||||||
|-|-|-|-|-|-|
`dfio`=>`he` | `adl`=>`ll` | `qe, `=>`o, ` | `wo`=>`wo` | `rl`=>`rl` | `d.`=>`d.`
=> `hello, world.`

微软双拼：
|||||||||||||||||||||||||
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|并击|`wo`|`sdio`|`eri`|`q;`|`cvi`|`wei`|`cvi`|`xi`|`dfuo`|`dio`|`dl;`|`cj`|`,`|`wo`|`sdio`|`eri`|`qw/.`|`cvi`|`s.m`|`weu`|`wj`|`wrip`|
|映射|`wo`|`ke`|`yi`|`q;`|`ni`|`ii`|`ni`|`xi`|`hr`|`de`|`da`|`cj`|`,`|`wo`|`ke`|`yi`|`pz`|`ni`|`sv`|`ii`|`wj`|`uw`|`.`|
|输出|`我`|`可`|`以`|`请`|`你`|`吃`|`你`|`喜`|`欢`|`的`|`大`|`餐`|`，`|`我`|`可`|`以`|`陪`|`你`|`随`|`处`|`玩`|`耍`|`。`|

## 尝试与练习：

在此输入：

<div class="snochorded">
<div><textarea  style="min-width:50%;min-height:10em"></textarea></div>
当前按下：<span></span>
</div>

## 软件下载

见： https://github.com/snomiao/snochorded/


<script>
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
// 定义规则
const 左手规则表 = 规则表全序支持(规则表向字母区扩展(规则向表解析('1 2 3 4 5 34 24 23 13 12', '1 2 3 4 5 6 7 8 9 0')))
const 右手规则表 = 规则表全序支持(规则表向字母区扩展(规则向表解析('90 80 89 79 78 6 7 8 9 0', '1 2 3 4 5 6 7 8 9 0')))
const 左手按键集 = new Set([...Object.keys(左手规则表)].join('').split(''))
const 右手按键集 = new Set([...Object.keys(右手规则表)].join('').split(''))
const 其他字符集 = new Set(" ")
const 可退改字符列 = [...左手按键集, ...右手按键集, ...其他字符集].filter(e => /[a-z]/.test(e))
const 直接映射集 = new Set([...左手按键集, ...右手按键集, ...其他字符集])
const 按键重映射 = (输入) => {
    const 输入字符列 = 输入.split('')
    const 左手输入 = 输入字符列.filter(字 => 左手按键集.has(字)).sort().join('')
    const 右手输入 = 输入字符列.filter(字 => 右手按键集.has(字)).sort().join('')
    const 其他输入 = 输入字符列.filter(字 => (左手输入 + 右手输入).indexOf(字) == -1).join('')
    const 左手输出 = 左手规则表[左手输入] || ''
    const 右手输出 = 右手规则表[右手输入] || ''
    return 左手输出 + 右手输出 + 其他输入
}

const 雪星并击输入区 =  document.querySelector('.snochorded textarea')
const 雪星并击按键显示区 =  document.querySelector('.snochorded span')
var 按下键列 = ""

雪星并击输入区.addEventListener('keydown', (e)=>{
    if(!直接映射集.has(e.key) || e.altKey || e.ctrlKey || e.shiftKey ) return;
    e.preventDefault()
    按下键列 += e.key
    雪星并击按键显示区.innerText = 按下键列
})
雪星并击输入区.addEventListener('keyup', (e)=>{
    if(!直接映射集.has(e.key) || e.altKey || e.ctrlKey || e.shiftKey ) return;
    e.preventDefault()
    雪星并击输入区.value += 按键重映射(按下键列)
    按下键列 = ""
    雪星并击按键显示区.innerText = "无"
})
雪星并击按键显示区.innerText = "无"

</script>