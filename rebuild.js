// 重建 src/index.html — 干净数据 + 完整 UI
const fs = require("fs");

// 从已打开的混淆版中提取可用结构，完全重新生成数据
const ROOTS = [
  { id:"spect", root:"spect", sub:"/spic", meaning:"看 · 看见",
    words:[
      {parts:[{t:"in",c:"red"},{t:"spect",c:"black"}],zh:"检查"},{parts:[{t:"pro",c:"red"},{t:"spect",c:"black"}],zh:"前景"},
      {parts:[{t:"re",c:"red"},{t:"spect",c:"black"}],zh:"尊重"},{parts:[{t:"spect",c:"black"},{t:"ator",c:"red"}],zh:"观众"},
      {parts:[{t:"spect",c:"black"},{t:"acle",c:"red"}],zh:"奇观"},{parts:[{t:"per",c:"red"},{t:"spect",c:"black"},{t:"ive",c:"red"}],zh:"视角"},
      {parts:[{t:"sus",c:"red"},{t:"pect",c:"black"}],zh:"怀疑"},{parts:[{t:"retro",c:"red"},{t:"spect",c:"black"}],zh:"回顾"},
    ]},
  { id:"dict", root:"dict", sub:"/dic", meaning:"说 · 宣告",
    words:[
      {parts:[{t:"pre",c:"red"},{t:"dict",c:"black"}],zh:"预言"},{parts:[{t:"dict",c:"black"},{t:"ate",c:"red"}],zh:"口述"},
      {parts:[{t:"contra",c:"red"},{t:"dict",c:"black"}],zh:"矛盾"},{parts:[{t:"ver",c:"red"},{t:"dict",c:"black"}],zh:"裁决"},
      {parts:[{t:"in",c:"red"},{t:"dic",c:"black"},{t:"ate",c:"red"}],zh:"指示"},{parts:[{t:"dict",c:"black"},{t:"ion",c:"red"},{t:"ary",c:"red"}],zh:"词典"},
      {parts:[{t:"ad",c:"red"},{t:"dict",c:"black"}],zh:"沉迷"},{parts:[{t:"de",c:"red"},{t:"dic",c:"black"},{t:"ate",c:"red"}],zh:"奉献"},
    ]},
  { id:"tract", root:"tract", sub:"", meaning:"拉 · 拖",
    words:[
      {parts:[{t:"at",c:"red"},{t:"tract",c:"black"}],zh:"吸引"},{parts:[{t:"ex",c:"red"},{t:"tract",c:"black"}],zh:"提取"},
      {parts:[{t:"con",c:"red"},{t:"tract",c:"black"}],zh:"收缩"},{parts:[{t:"dis",c:"red"},{t:"tract",c:"black"}],zh:"分散"},
      {parts:[{t:"sub",c:"red"},{t:"tract",c:"black"}],zh:"减去"},{parts:[{t:"re",c:"red"},{t:"tract",c:"black"}],zh:"撤回"},
      {parts:[{t:"abs",c:"red"},{t:"tract",c:"black"}],zh:"抽象"},{parts:[{t:"pro",c:"red"},{t:"tract",c:"black"},{t:"ed",c:"red"}],zh:"延长"},
    ]},
  { id:"rupt", root:"rupt", sub:"", meaning:"破 · 裂",
    words:[
      {parts:[{t:"bank",c:"red"},{t:"rupt",c:"black"}],zh:"破产"},{parts:[{t:"cor",c:"red"},{t:"rupt",c:"black"}],zh:"腐败"},
      {parts:[{t:"dis",c:"red"},{t:"rupt",c:"black"}],zh:"扰乱"},{parts:[{t:"e",c:"red"},{t:"rupt",c:"black"}],zh:"爆发"},
      {parts:[{t:"inter",c:"red"},{t:"rupt",c:"black"}],zh:"打断"},{parts:[{t:"ab",c:"red"},{t:"rupt",c:"black"}],zh:"突然"},
      {parts:[{t:"rupt",c:"black"},{t:"ure",c:"red"}],zh:"断裂"},{parts:[{t:"ir",c:"red"},{t:"rupt",c:"black"}],zh:"突入"},
    ]},
  { id:"ject", root:"ject", sub:"", meaning:"投 · 抛",
    words:[
      {parts:[{t:"in",c:"red"},{t:"ject",c:"black"}],zh:"注射"},{parts:[{t:"pro",c:"red"},{t:"ject",c:"black"}],zh:"项目"},
      {parts:[{t:"re",c:"red"},{t:"ject",c:"black"}],zh:"拒绝"},{parts:[{t:"sub",c:"red"},{t:"ject",c:"black"}],zh:"主观"},
      {parts:[{t:"ob",c:"red"},{t:"ject",c:"black"}],zh:"客观"},{parts:[{t:"e",c:"red"},{t:"ject",c:"black"}],zh:"排出"},
      {parts:[{t:"de",c:"red"},{t:"ject",c:"black"},{t:"ed",c:"red"}],zh:"沮丧"},{parts:[{t:"inter",c:"red"},{t:"ject",c:"black"}],zh:"插入"},
    ]},
  { id:"port", root:"port", sub:"", meaning:"携带 · 运送",
    words:[
      {parts:[{t:"im",c:"red"},{t:"port",c:"black"}],zh:"进口"},{parts:[{t:"ex",c:"red"},{t:"port",c:"black"}],zh:"出口"},
      {parts:[{t:"trans",c:"red"},{t:"port",c:"black"}],zh:"运输"},{parts:[{t:"re",c:"red"},{t:"port",c:"black"}],zh:"报告"},
      {parts:[{t:"sup",c:"red"},{t:"port",c:"black"}],zh:"支持"},{parts:[{t:"port",c:"black"},{t:"able",c:"red"}],zh:"便携"},
      {parts:[{t:"de",c:"red"},{t:"port",c:"black"}],zh:"驱逐"},{parts:[{t:"com",c:"red"},{t:"port",c:"black"}],zh:"举止"},
    ]},
  { id:"ven", root:"ven", sub:"/vent", meaning:"来 · 到来",
    words:[
      {parts:[{t:"con",c:"red"},{t:"ven",c:"black"},{t:"ient",c:"red"}],zh:"方便"},{parts:[{t:"pre",c:"red"},{t:"vent",c:"black"}],zh:"预防"},
      {parts:[{t:"ad",c:"red"},{t:"vent",c:"black"},{t:"ure",c:"red"}],zh:"冒险"},{parts:[{t:"e",c:"red"},{t:"vent",c:"black"}],zh:"事件"},
      {parts:[{t:"in",c:"red"},{t:"vent",c:"black"}],zh:"发明"},{parts:[{t:"re",c:"red"},{t:"ven",c:"black"},{t:"ue",c:"red"}],zh:"收入"},
      {parts:[{t:"inter",c:"red"},{t:"vene",c:"black"}],zh:"干预"},{parts:[{t:"ad",c:"red"},{t:"ven",c:"black"},{t:"t",c:"red"}],zh:"降临"},
    ]},
  { id:"grad", root:"grad", sub:"/gress", meaning:"步 · 走",
    words:[
      {parts:[{t:"pro",c:"red"},{t:"gress",c:"black"}],zh:"进步"},{parts:[{t:"re",c:"red"},{t:"gress",c:"black"}],zh:"退步"},
      {parts:[{t:"ag",c:"red"},{t:"gress",c:"black"},{t:"ive",c:"red"}],zh:"侵略"},{parts:[{t:"con",c:"red"},{t:"gress",c:"black"}],zh:"国会"},
      {parts:[{t:"e",c:"red"},{t:"gress",c:"black"}],zh:"出口"},{parts:[{t:"grad",c:"black"},{t:"ual",c:"red"}],zh:"逐渐"},
      {parts:[{t:"de",c:"red"},{t:"grad",c:"black"},{t:"e",c:"red"}],zh:"降级"},{parts:[{t:"up",c:"red"},{t:"grad",c:"black"},{t:"e",c:"red"}],zh:"升级"},
    ]},
  { id:"ced", root:"ced", sub:"/ceed/cess", meaning:"走 · 行",
    words:[
      {parts:[{t:"suc",c:"red"},{t:"ceed",c:"black"}],zh:"成功"},{parts:[{t:"ex",c:"red"},{t:"ceed",c:"black"}],zh:"超过"},
      {parts:[{t:"pro",c:"red"},{t:"ceed",c:"black"}],zh:"继续"},{parts:[{t:"pre",c:"red"},{t:"ced",c:"black"},{t:"ent",c:"red"}],zh:"先例"},
      {parts:[{t:"re",c:"red"},{t:"cede",c:"black"}],zh:"退让"},{parts:[{t:"con",c:"red"},{t:"cede",c:"black"}],zh:"承认"},
      {parts:[{t:"inter",c:"red"},{t:"cede",c:"black"}],zh:"居间"},{parts:[{t:"ac",c:"red"},{t:"cess",c:"black"}],zh:"接近"},
    ]},
  { id:"miss", root:"miss", sub:"/mit", meaning:"送 · 发",
    words:[
      {parts:[{t:"com",c:"red"},{t:"mit",c:"black"}],zh:"提交"},{parts:[{t:"per",c:"red"},{t:"mit",c:"black"}],zh:"允许"},
      {parts:[{t:"trans",c:"red"},{t:"mit",c:"black"}],zh:"传输"},{parts:[{t:"sub",c:"red"},{t:"mit",c:"black"}],zh:"提交"},
      {parts:[{t:"e",c:"red"},{t:"mit",c:"black"}],zh:"散发"},{parts:[{t:"dis",c:"red"},{t:"miss",c:"black"}],zh:"解雇"},
      {parts:[{t:"miss",c:"black"},{t:"ion",c:"red"}],zh:"任务"},{parts:[{t:"ad",c:"red"},{t:"mit",c:"black"}],zh:"承认"},
    ]},
  { id:"vid", root:"vid", sub:"/vis", meaning:"看 · 见",
    words:[
      {parts:[{t:"e",c:"red"},{t:"vid",c:"black"},{t:"ent",c:"red"}],zh:"证据"},{parts:[{t:"pro",c:"red"},{t:"vid",c:"black"},{t:"e",c:"red"}],zh:"提供"},
      {parts:[{t:"vis",c:"black"},{t:"ion",c:"red"}],zh:"视野"},{parts:[{t:"re",c:"red"},{t:"vise",c:"black"}],zh:"修订"},
      {parts:[{t:"super",c:"red"},{t:"vise",c:"black"}],zh:"监督"},{parts:[{t:"vis",c:"black"},{t:"ible",c:"red"}],zh:"可见的"},
      {parts:[{t:"tele",c:"red"},{t:"vis",c:"black"},{t:"ion",c:"red"}],zh:"电视"},{parts:[{t:"ad",c:"red"},{t:"vise",c:"black"}],zh:"建议"},
    ]},
  { id:"scrib", root:"scrib", sub:"/script", meaning:"写 · 画",
    words:[
      {parts:[{t:"de",c:"red"},{t:"scribe",c:"black"}],zh:"描述"},{parts:[{t:"pre",c:"red"},{t:"scribe",c:"black"}],zh:"规定"},
      {parts:[{t:"sub",c:"red"},{t:"scribe",c:"black"}],zh:"订阅"},{parts:[{t:"in",c:"red"},{t:"scribe",c:"black"}],zh:"铭刻"},
      {parts:[{t:"manu",c:"red"},{t:"script",c:"black"}],zh:"手稿"},{parts:[{t:"de",c:"red"},{t:"script",c:"black"},{t:"ion",c:"red"}],zh:"描述"},
      {parts:[{t:"tran",c:"red"},{t:"script",c:"black"}],zh:"抄本"},{parts:[{t:"pre",c:"red"},{t:"script",c:"black"},{t:"ion",c:"red"}],zh:"处方"},
    ]},
  { id:"duc", root:"duc", sub:"/duct", meaning:"引导 · 拉",
    words:[
      {parts:[{t:"pro",c:"red"},{t:"duce",c:"black"}],zh:"生产"},{parts:[{t:"re",c:"red"},{t:"duce",c:"black"}],zh:"减少"},
      {parts:[{t:"intro",c:"red"},{t:"duce",c:"black"}],zh:"介绍"},{parts:[{t:"con",c:"red"},{t:"duct",c:"black"}],zh:"行为"},
      {parts:[{t:"se",c:"red"},{t:"duce",c:"black"}],zh:"引诱"},{parts:[{t:"pro",c:"red"},{t:"duct",c:"black"}],zh:"产品"},
      {parts:[{t:"e",c:"red"},{t:"duc",c:"black"},{t:"ate",c:"red"}],zh:"教育"},{parts:[{t:"de",c:"red"},{t:"duce",c:"black"}],zh:"推论"},
    ]},
  { id:"fer", root:"fer", sub:"", meaning:"携带 · 带来",
    words:[
      {parts:[{t:"trans",c:"red"},{t:"fer",c:"black"}],zh:"转移"},{parts:[{t:"re",c:"red"},{t:"fer",c:"black"}],zh:"参考"},
      {parts:[{t:"pre",c:"red"},{t:"fer",c:"black"}],zh:"偏好"},{parts:[{t:"dif",c:"red"},{t:"fer",c:"black"}],zh:"不同"},
      {parts:[{t:"of",c:"red"},{t:"fer",c:"black"}],zh:"提供"},{parts:[{t:"suf",c:"red"},{t:"fer",c:"black"}],zh:"遭受"},
      {parts:[{t:"in",c:"red"},{t:"fer",c:"black"}],zh:"推断"},{parts:[{t:"con",c:"red"},{t:"fer",c:"black"},{t:"ence",c:"red"}],zh:"会议"},
    ]},
  { id:"pel", root:"pel", sub:"/puls", meaning:"推 · 驱",
    words:[
      {parts:[{t:"com",c:"red"},{t:"pel",c:"black"}],zh:"强迫"},{parts:[{t:"im",c:"red"},{t:"pel",c:"black"}],zh:"推动"},
      {parts:[{t:"ex",c:"red"},{t:"pel",c:"black"}],zh:"驱逐"},{parts:[{t:"re",c:"red"},{t:"pel",c:"black"}],zh:"击退"},
      {parts:[{t:"pro",c:"red"},{t:"pel",c:"black"}],zh:"推进"},{parts:[{t:"dis",c:"red"},{t:"pel",c:"black"}],zh:"驱散"},
      {parts:[{t:"puls",c:"black"},{t:"e",c:"red"}],zh:"脉搏"},{parts:[{t:"com",c:"red"},{t:"puls",c:"black"},{t:"ion",c:"red"}],zh:"强迫"},
    ]},
  { id:"vers", root:"vers", sub:"/vert", meaning:"转 · 变",
    words:[
      {parts:[{t:"re",c:"red"},{t:"verse",c:"black"}],zh:"颠倒"},{parts:[{t:"con",c:"red"},{t:"verse",c:"black"}],zh:"交谈"},
      {parts:[{t:"con",c:"red"},{t:"vert",c:"black"}],zh:"转变"},{parts:[{t:"di",c:"red"},{t:"verse",c:"black"}],zh:"多样的"},
      {parts:[{t:"re",c:"red"},{t:"vert",c:"black"}],zh:"恢复"},{parts:[{t:"ad",c:"red"},{t:"verse",c:"black"}],zh:"不利的"},
      {parts:[{t:"vers",c:"black"},{t:"ion",c:"red"}],zh:"版本"},{parts:[{t:"in",c:"red"},{t:"vert",c:"black"}],zh:"倒置"},
    ]},
  { id:"cap", root:"cap", sub:"/cept/ceive", meaning:"拿 · 抓",
    words:[
      {parts:[{t:"ac",c:"red"},{t:"cept",c:"black"}],zh:"接受"},{parts:[{t:"inter",c:"red"},{t:"cept",c:"black"}],zh:"拦截"},
      {parts:[{t:"re",c:"red"},{t:"ceive",c:"black"}],zh:"收到"},{parts:[{t:"con",c:"red"},{t:"ceive",c:"black"}],zh:"构思"},
      {parts:[{t:"per",c:"red"},{t:"ceive",c:"black"}],zh:"感知"},{parts:[{t:"ex",c:"red"},{t:"cept",c:"black"}],zh:"除了"},
      {parts:[{t:"de",c:"red"},{t:"ceive",c:"black"}],zh:"欺骗"},{parts:[{t:"cap",c:"black"},{t:"ture",c:"red"}],zh:"捕获"},
    ]},
  { id:"ten", root:"ten", sub:"/tin/tain", meaning:"握 · 持",
    words:[
      {parts:[{t:"con",c:"red"},{t:"tain",c:"black"}],zh:"包含"},{parts:[{t:"main",c:"red"},{t:"tain",c:"black"}],zh:"维持"},
      {parts:[{t:"ob",c:"red"},{t:"tain",c:"black"}],zh:"获得"},{parts:[{t:"re",c:"red"},{t:"tain",c:"black"}],zh:"保留"},
      {parts:[{t:"sus",c:"red"},{t:"tain",c:"black"}],zh:"维持"},{parts:[{t:"con",c:"red"},{t:"tent",c:"black"}],zh:"内容"},
      {parts:[{t:"ten",c:"black"},{t:"dency",c:"red"}],zh:"倾向"},{parts:[{t:"enter",c:"red"},{t:"tain",c:"black"}],zh:"娱乐"},
    ]},
  { id:"cred", root:"cred", sub:"", meaning:"相信 · 信任",
    words:[
      {parts:[{t:"cred",c:"black"},{t:"it",c:"red"}],zh:"信用"},{parts:[{t:"ac",c:"red"},{t:"cred",c:"black"},{t:"it",c:"red"}],zh:"认可"},
      {parts:[{t:"dis",c:"red"},{t:"cred",c:"black"},{t:"it",c:"red"}],zh:"怀疑"},{parts:[{t:"in",c:"red"},{t:"cred",c:"black"},{t:"ible",c:"red"}],zh:"难以置信"},
      {parts:[{t:"cred",c:"black"},{t:"ible",c:"red"}],zh:"可信的"},{parts:[{t:"cred",c:"black"},{t:"ential",c:"red"}],zh:"凭证"},
      {parts:[{t:"cred",c:"black"},{t:"o",c:"red"}],zh:"信条"},{parts:[{t:"dis",c:"red"},{t:"credit",c:"black"}],zh:"抹黑"},
    ]},
  { id:"gen", root:"gen", sub:"", meaning:"产生 · 种族",
    words:[
      {parts:[{t:"gen",c:"black"},{t:"erate",c:"red"}],zh:"产生"},{parts:[{t:"gen",c:"black"},{t:"ius",c:"red"}],zh:"天才"},
      {parts:[{t:"gen",c:"black"},{t:"uine",c:"red"}],zh:"真正的"},{parts:[{t:"gene",c:"black"},{t:"tic",c:"red"}],zh:"基因的"},
      {parts:[{t:"en",c:"red"},{t:"gen",c:"black"},{t:"der",c:"red"}],zh:"性别"},{parts:[{t:"re",c:"red"},{t:"gen",c:"black"},{t:"erate",c:"red"}],zh:"再生"},
      {parts:[{t:"gen",c:"black"},{t:"re",c:"red"}],zh:"类型"},{parts:[{t:"de",c:"red"},{t:"gen",c:"black"},{t:"erate",c:"red"}],zh:"退化"},
    ]},
  { id:"aud", root:"aud", sub:"/audio", meaning:"听 · 声音",
    words:[
      {parts:[{t:"aud",c:"black"},{t:"io",c:"red"}],zh:"音频"},{parts:[{t:"aud",c:"black"},{t:"ible",c:"red"}],zh:"听得见的"},
      {parts:[{t:"aud",c:"black"},{t:"ience",c:"red"}],zh:"观众"},{parts:[{t:"aud",c:"black"},{t:"it",c:"red"}],zh:"审计"},
      {parts:[{t:"aud",c:"black"},{t:"itorium",c:"red"}],zh:"礼堂"},{parts:[{t:"in",c:"red"},{t:"aud",c:"black"},{t:"ible",c:"red"}],zh:"听不见的"},
      {parts:[{t:"aud",c:"black"},{t:"ition",c:"red"}],zh:"试听"},{parts:[{t:"aud",c:"black"},{t:"iobook",c:"red"}],zh:"有声书"},
    ]},
  { id:"bell", root:"bell", sub:"/belli", meaning:"战争 · 战斗",
    words:[
      {parts:[{t:"re",c:"red"},{t:"bel",c:"black"}],zh:"反叛"},{parts:[{t:"bell",c:"black"},{t:"icose",c:"red"}],zh:"好战的"},
      {parts:[{t:"belli",c:"black"},{t:"gerent",c:"red"}],zh:"交战国"},{parts:[{t:"bell",c:"black"},{t:"icist",c:"red"}],zh:"主战派"},
      {parts:[{t:"ante",c:"red"},{t:"bell",c:"black"},{t:"um",c:"red"}],zh:"战前"},{parts:[{t:"belli",c:"black"},{t:"cose",c:"red"}],zh:"好斗的"},
      {parts:[{t:"post",c:"red"},{t:"bell",c:"black"},{t:"um",c:"red"}],zh:"战后"},{parts:[{t:"bell",c:"black"},{t:"ona",c:"red"}],zh:"美女"},
    ]},
  { id:"chron", root:"chron", sub:"/chrono", meaning:"时间",
    words:[
      {parts:[{t:"chron",c:"black"},{t:"ic",c:"red"}],zh:"慢性的"},{parts:[{t:"chron",c:"black"},{t:"icle",c:"red"}],zh:"编年史"},
      {parts:[{t:"syn",c:"red"},{t:"chron",c:"black"},{t:"ize",c:"red"}],zh:"同步"},{parts:[{t:"chron",c:"black"},{t:"ology",c:"red"}],zh:"年表"},
      {parts:[{t:"chron",c:"black"},{t:"ometer",c:"red"}],zh:"计时器"},{parts:[{t:"ana",c:"red"},{t:"chron",c:"black"},{t:"ism",c:"red"}],zh:"时代错误"},
      {parts:[{t:"chron",c:"black"},{t:"ograph",c:"red"}],zh:"计时仪"},{parts:[{t:"dia",c:"red"},{t:"chron",c:"black"},{t:"ic",c:"red"}],zh:"历时的"},
    ]},
  { id:"cogn", root:"cogn", sub:"/gnos", meaning:"知道 · 认识",
    words:[
      {parts:[{t:"re",c:"red"},{t:"cogn",c:"black"},{t:"ize",c:"red"}],zh:"认出"},{parts:[{t:"cogn",c:"black"},{t:"itive",c:"red"}],zh:"认知的"},
      {parts:[{t:"ig",c:"red"},{t:"nore",c:"black"}],zh:"忽视"},{parts:[{t:"dia",c:"red"},{t:"gnose",c:"black"}],zh:"诊断"},
      {parts:[{t:"pro",c:"red"},{t:"gnosis",c:"black"}],zh:"预测"},{parts:[{t:"cogn",c:"black"},{t:"ition",c:"red"}],zh:"认识"},
      {parts:[{t:"in",c:"red"},{t:"cogn",c:"black"},{t:"ito",c:"red"}],zh:"隐姓埋名"},{parts:[{t:"not",c:"red"},{t:"orious",c:"red"}],zh:"臭名昭著的"},
    ]},
  { id:"corp", root:"corp", sub:"/corpor", meaning:"身体 · 团体",
    words:[
      {parts:[{t:"corp",c:"black"},{t:"se",c:"red"}],zh:"尸体"},{parts:[{t:"corpor",c:"black"},{t:"ate",c:"red"}],zh:"公司的"},
      {parts:[{t:"corpor",c:"black"},{t:"ation",c:"red"}],zh:"公司"},{parts:[{t:"in",c:"red"},{t:"corpor",c:"black"},{t:"ate",c:"red"}],zh:"合并"},
      {parts:[{t:"corp",c:"black"},{t:"ulent",c:"red"}],zh:"肥胖的"},{parts:[{t:"corp",c:"black"},{t:"oreal",c:"red"}],zh:"肉体的"},
      {parts:[{t:"corp",c:"black"},{t:"us",c:"red"}],zh:"语料库"},{parts:[{t:"in",c:"red"},{t:"corp",c:"black"},{t:"oreal",c:"red"}],zh:"无形的"},
    ]},
  { id:"fac", root:"fac", sub:"/fic/fect", meaning:"做 · 制造",
    words:[
      {parts:[{t:"manu",c:"red"},{t:"fact",c:"black"},{t:"ure",c:"red"}],zh:"制造"},{parts:[{t:"fact",c:"black"},{t:"ory",c:"red"}],zh:"工厂"},
      {parts:[{t:"bene",c:"red"},{t:"fic",c:"black"},{t:"ial",c:"red"}],zh:"有益的"},{parts:[{t:"ef",c:"red"},{t:"fect",c:"black"}],zh:"效果"},
      {parts:[{t:"per",c:"red"},{t:"fect",c:"black"}],zh:"完美"},{parts:[{t:"de",c:"red"},{t:"fect",c:"black"}],zh:"缺陷"},
      {parts:[{t:"fac",c:"black"},{t:"ile",c:"red"}],zh:"容易的"},{parts:[{t:"satis",c:"red"},{t:"fact",c:"black"},{t:"ion",c:"red"}],zh:"满意"},
    ]},
  { id:"flu", root:"flu", sub:"/flux", meaning:"流 · 流动",
    words:[
      {parts:[{t:"flu",c:"black"},{t:"ent",c:"red"}],zh:"流利的"},{parts:[{t:"in",c:"red"},{t:"flu",c:"black"},{t:"ence",c:"red"}],zh:"影响"},
      {parts:[{t:"flu",c:"black"},{t:"id",c:"red"}],zh:"流体"},{parts:[{t:"flux",c:"black"}],zh:"流动"},
      {parts:[{t:"flu",c:"black"},{t:"ctuate",c:"red"}],zh:"波动"},{parts:[{t:"ef",c:"red"},{t:"flu",c:"black"},{t:"ent",c:"red"}],zh:"流出的"},
      {parts:[{t:"in",c:"red"},{t:"flux",c:"black"}],zh:"涌入"},{parts:[{t:"af",c:"red"},{t:"flu",c:"black"},{t:"ent",c:"red"}],zh:"支流"},
    ]},
  { id:"graph", root:"graph", sub:"/gram", meaning:"写 · 画 · 记录",
    words:[
      {parts:[{t:"photo",c:"red"},{t:"graph",c:"black"}],zh:"照片"},{parts:[{t:"tele",c:"red"},{t:"graph",c:"black"}],zh:"电报"},
      {parts:[{t:"bio",c:"red"},{t:"graph",c:"black"},{t:"y",c:"red"}],zh:"传记"},{parts:[{t:"graph",c:"black"},{t:"ic",c:"red"}],zh:"图表的"},
      {parts:[{t:"dia",c:"red"},{t:"gram",c:"black"}],zh:"图表"},{parts:[{t:"geo",c:"red"},{t:"graph",c:"black"},{t:"y",c:"red"}],zh:"地理"},
      {parts:[{t:"tele",c:"red"},{t:"gram",c:"black"}],zh:"电报"},{parts:[{t:"auto",c:"red"},{t:"graph",c:"black"}],zh:"亲笔签名"},
    ]},
  { id:"log", root:"log", sub:"/logue", meaning:"说 · 话 · 学",
    words:[
      {parts:[{t:"dia",c:"red"},{t:"logue",c:"black"}],zh:"对话"},{parts:[{t:"mono",c:"red"},{t:"logue",c:"black"}],zh:"独白"},
      {parts:[{t:"apo",c:"red"},{t:"log",c:"black"},{t:"y",c:"red"}],zh:"道歉"},{parts:[{t:"cata",c:"red"},{t:"logue",c:"black"}],zh:"目录"},
      {parts:[{t:"pro",c:"red"},{t:"logue",c:"black"}],zh:"序言"},{parts:[{t:"epi",c:"red"},{t:"logue",c:"black"}],zh:"结语"},
      {parts:[{t:"bio",c:"red"},{t:"log",c:"black"},{t:"y",c:"red"}],zh:"生物学"},{parts:[{t:"ana",c:"red"},{t:"logue",c:"black"}],zh:"类比"},
    ]},
  { id:"man", root:"man", sub:"/manu", meaning:"手",
    words:[
      {parts:[{t:"manu",c:"black"},{t:"al",c:"red"}],zh:"手册"},{parts:[{t:"manu",c:"black"},{t:"script",c:"red"}],zh:"手稿"},
      {parts:[{t:"manu",c:"black"},{t:"facture",c:"red"}],zh:"制造"},{parts:[{t:"mani",c:"black"},{t:"pulate",c:"red"}],zh:"操纵"},
      {parts:[{t:"e",c:"red"},{t:"man",c:"black"},{t:"cipate",c:"red"}],zh:"解放"},{parts:[{t:"man",c:"black"},{t:"acle",c:"red"}],zh:"手铐"},
      {parts:[{t:"man",c:"black"},{t:"age",c:"red"}],zh:"管理"},{parts:[{t:"man",c:"black"},{t:"ner",c:"red"}],zh:"方式"},
    ]},
  { id:"mob", root:"mob", sub:"/mot/mov", meaning:"动 · 移动",
    words:[
      {parts:[{t:"mob",c:"black"},{t:"ile",c:"red"}],zh:"移动的"},{parts:[{t:"e",c:"red"},{t:"mot",c:"black"},{t:"ion",c:"red"}],zh:"情感"},
      {parts:[{t:"mot",c:"black"},{t:"ive",c:"red"}],zh:"动机"},{parts:[{t:"mov",c:"black"},{t:"e",c:"red"}],zh:"移动"},
      {parts:[{t:"auto",c:"red"},{t:"mob",c:"black"},{t:"ile",c:"red"}],zh:"汽车"},{parts:[{t:"pro",c:"red"},{t:"mot",c:"black"},{t:"e",c:"red"}],zh:"晋升"},
      {parts:[{t:"mob",c:"black"},{t:"ilize",c:"red"}],zh:"动员"},{parts:[{t:"de",c:"red"},{t:"mot",c:"black"},{t:"e",c:"red"}],zh:"降级"},
    ]},
  { id:"mort", root:"mort", sub:"/mor", meaning:"死 · 死亡",
    words:[
      {parts:[{t:"mort",c:"black"},{t:"al",c:"red"}],zh:"凡人的"},{parts:[{t:"im",c:"red"},{t:"mort",c:"black"},{t:"al",c:"red"}],zh:"不朽的"},
      {parts:[{t:"mort",c:"black"},{t:"ality",c:"red"}],zh:"死亡率"},{parts:[{t:"mort",c:"black"},{t:"gage",c:"red"}],zh:"抵押"},
      {parts:[{t:"mort",c:"black"},{t:"ify",c:"red"}],zh:"使羞愧"},{parts:[{t:"mort",c:"black"},{t:"ician",c:"red"}],zh:"殡葬师"},
      {parts:[{t:"mort",c:"black"},{t:"uary",c:"red"}],zh:"停尸房"},{parts:[{t:"post",c:"red"},{t:"mort",c:"black"},{t:"em",c:"red"}],zh:"死后的"},
    ]},
  { id:"path", root:"path", sub:"/pathy", meaning:"感受 · 病",
    words:[
      {parts:[{t:"sym",c:"red"},{t:"pathy",c:"black"}],zh:"同情"},{parts:[{t:"em",c:"red"},{t:"pathy",c:"black"}],zh:"共情"},
      {parts:[{t:"a",c:"red"},{t:"pathy",c:"black"}],zh:"冷漠"},{parts:[{t:"anti",c:"red"},{t:"pathy",c:"black"}],zh:"反感"},
      {parts:[{t:"path",c:"black"},{t:"ology",c:"red"}],zh:"病理学"},{parts:[{t:"psycho",c:"red"},{t:"path",c:"black"}],zh:"精神病患者"},
      {parts:[{t:"path",c:"black"},{t:"etic",c:"red"}],zh:"可怜的"},{parts:[{t:"tele",c:"red"},{t:"pathy",c:"black"}],zh:"心灵感应"},
    ]},
  { id:"pend", root:"pend", sub:"/pens", meaning:"悬挂 · 支付",
    words:[
      {parts:[{t:"de",c:"red"},{t:"pend",c:"black"}],zh:"依赖"},{parts:[{t:"sus",c:"red"},{t:"pend",c:"black"}],zh:"暂停"},
      {parts:[{t:"in",c:"red"},{t:"de",c:"red"},{t:"pend",c:"black"},{t:"ent",c:"red"}],zh:"独立的"},{parts:[{t:"pend",c:"black"},{t:"ing",c:"red"}],zh:"待定的"},
      {parts:[{t:"ex",c:"red"},{t:"pend",c:"black"}],zh:"花费"},{parts:[{t:"com",c:"red"},{t:"pens",c:"black"},{t:"ate",c:"red"}],zh:"补偿"},
      {parts:[{t:"de",c:"red"},{t:"pens",c:"black"},{t:"able",c:"red"}],zh:"可分配的"},{parts:[{t:"pend",c:"black"},{t:"ulum",c:"red"}],zh:"钟摆"},
    ]},
  { id:"phon", root:"phon", sub:"/phono", meaning:"声音",
    words:[
      {parts:[{t:"tele",c:"red"},{t:"phone",c:"black"}],zh:"电话"},{parts:[{t:"micro",c:"red"},{t:"phone",c:"black"}],zh:"麦克风"},
      {parts:[{t:"sym",c:"red"},{t:"phony",c:"black"}],zh:"交响乐"},{parts:[{t:"caco",c:"red"},{t:"phony",c:"black"}],zh:"杂音"},
      {parts:[{t:"eu",c:"red"},{t:"phony",c:"black"}],zh:"悦耳"},{parts:[{t:"phon",c:"black"},{t:"etic",c:"red"}],zh:"语音的"},
      {parts:[{t:"mega",c:"red"},{t:"phone",c:"black"}],zh:"扩音器"},{parts:[{t:"phono",c:"black"},{t:"graph",c:"red"}],zh:"留声机"},
    ]},
];

// 生成 HTML
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>词根星图</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #f6f4f0;
    font-family: 'Georgia', 'Noto Serif SC', 'STSong', 'PingFang SC', serif;
    height: 100dvh; width: 100vw;
    overflow: hidden;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    cursor: default;
  }

  .page { position: fixed; inset: 0; transition: opacity 0.4s, transform 0.4s; }
  .page.hidden { opacity: 0; pointer-events: none; }

  #home { display: flex; align-items: center; justify-content: center; z-index: 5; background: #f6f4f0; }
  .home-scene { position: relative; width: 100vw; height: 100dvh; transition: opacity 0.35s; }
  .home-scene.fading { opacity: 0; }

  .h-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; z-index: 10; cursor: pointer; padding: 16px; }
  .h-center .root { font-size: clamp(28px,8vw,38px); font-weight: 700; color: #1c1c1e; letter-spacing: 3px; line-height: 1; }
  .h-center .sub { font-size: clamp(13px,3.5vw,16px); color: #aaa49c; letter-spacing: 1.5px; margin-top: 2px; }
  .h-center .meaning { font-size: clamp(10px,2.6vw,12px); color: #b0a89e; margin-top: 8px; letter-spacing: 1px; font-style: italic; }
  .h-center .toggle-hint { font-size: 10px; color: #d0cbc2; margin-top: 6px; letter-spacing: 0.5px; opacity: 0; transition: opacity 0.4s; }
  .h-center:hover .toggle-hint { opacity: 1; }

  .h-word { position: absolute; z-index: 6; transform: translate(-50%,-50%); text-align: center; cursor: pointer; pointer-events: auto; padding: clamp(6px,2vw,10px) clamp(8px,2.5vw,12px); }
  .h-word .dot { width: 3px; height: 3px; border-radius: 50%; background: #c8c4ba; margin: 0 auto 7px; transition: all 0.3s; }
  .h-word.expanded .dot, .h-word:hover .dot { background: #a09888; }
  .h-word .text { font-size: clamp(11px,3vw,14px); letter-spacing: 0.2px; white-space: nowrap; }
  .h-word .text .black { color: #1c1c1e; }
  .h-word .text .red { color: #c06b50; }
  .h-word .zh { font-size: clamp(9px,2.2vw,10px); color: #b0a89e; margin-top: 1px; letter-spacing: 0.3px; opacity: 0; max-height: 0; overflow: hidden; transition: all 0.35s; }
  .h-word.expanded .zh { opacity: 1; max-height: 20px; }
  .h-word .check { width: 16px; height: 16px; border-radius: 50%; border: 1px solid #d5d1c8; background: transparent; margin: 4px auto 0; cursor: pointer; transition: all 0.25s; display: flex; align-items: center; justify-content: center; font-size: 10px; color: transparent; }
  .h-word.checked .check { background: #5b4a3f; border-color: #5b4a3f; color: #faf9f6; }
  .h-word.checked .dot { background: #5b4a3f; }

  svg.h-lines { position: absolute; inset: 0; pointer-events: none; z-index: 5; }
  svg.h-lines line { stroke: #dad6cc; stroke-width: 0.5; transition: stroke 0.35s; }
  svg.h-lines line.hl { stroke: #a09888; stroke-width: 0.7; }

  .root-switcher { position: fixed; bottom: max(20px,env(safe-area-inset-bottom,20px)); left: 50%; transform: translateX(-50%); display: flex; gap: clamp(8px,2vw,14px); align-items: center; z-index: 20; }
  .root-switcher .rs-arrow { font-size: clamp(16px,4vw,18px); color: #a09888; cursor: pointer; padding: clamp(6px,2vw,10px); transition: color 0.2s; min-width: 40px; min-height: 40px; display: flex; align-items: center; justify-content: center; }
  .root-switcher .rs-arrow:hover { color: #5b4a3f; }
  .house-btn { width: clamp(36px,10vw,40px); height: clamp(36px,10vw,40px); border-radius: 12px; background: #faf9f6; border: 0.8px solid #d5d1c8; display: flex; align-items: center; justify-content: center; font-size: clamp(18px,5vw,20px); cursor: pointer; transition: all 0.25s; flex-shrink: 0; }
  .house-btn:hover { background: #f0ede8; border-color: #a09888; }
  .house-btn:active { transform: scale(0.93); }

  .review-done-btn { position: fixed; top: max(14px,env(safe-area-inset-top,14px)); right: max(14px,env(safe-area-inset-right,14px)); padding: clamp(8px,2vw,10px) clamp(14px,3.5vw,18px); border-radius: 16px; border: 0.5px solid #d5d1c8; background: #faf9f6; color: #c4bfb4; font-size: clamp(10px,2.5vw,11px); cursor: pointer; font-family: 'Georgia','PingFang SC',serif; letter-spacing: 0.8px; transition: all 0.2s; z-index: 25; opacity: 0.6; pointer-events: none; }
  .review-done-btn.ready { color: #5b4a3f; opacity: 1; pointer-events: auto; }
  .review-done-btn.ready:hover { background: #f0ede8; border-color: #a09888; }

  #dashboard { display: flex; flex-direction: column; z-index: 10; padding: 16px 0 0 0; background: #f6f4f0; }
  .dash-top { display: flex; align-items: center; justify-content: space-between; padding: 8px clamp(16px,4vw,24px); z-index: 3; flex-shrink: 0; }
  .dash-top .title { font-size: clamp(14px,3.8vw,16px); font-weight: 600; color: #3a302a; letter-spacing: 1.5px; }
  .dash-top .date { font-size: clamp(9px,2.2vw,10px); color: #c4bfb4; letter-spacing: 0.5px; }
  .stats-row { display: flex; gap: clamp(8px,2vw,12px); padding: 0 clamp(12px,3vw,24px); z-index: 3; flex-shrink: 0; margin-bottom: 8px; }
  .stat-card { flex: 1; background: #fdfdfb; border-radius: 14px; padding: clamp(10px,2.5vw,14px) clamp(12px,3vw,18px); box-shadow: 0 0 0 0.5px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 2px; }
  .stat-card .val { font-size: clamp(18px,4.5vw,22px); font-weight: 700; color: #2c2822; letter-spacing: -0.3px; }
  .stat-card .val.urgent { color: #c06b50; }
  .stat-card .lbl { font-size: clamp(9px,2vw,10px); color: #b8b0a6; letter-spacing: 0.5px; }
  .chart-wrap { flex: 1; position: relative; min-height: 0; margin: 0 clamp(8px,2vw,16px) 12px; background: #fdfdfb; border-radius: 20px; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.05), 0 2px 16px rgba(0,0,0,0.04); overflow: hidden; }
  .chart-wrap svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2; }
  .chart-dots { position: absolute; inset: 0; z-index: 10; pointer-events: none; }
  .small-dot { position: absolute; z-index: 10; width: clamp(26px,7vw,34px); height: clamp(26px,7vw,34px); border-radius: 50%; background: #faf9f6; border: 1px solid #cfcbc2; display: flex; align-items: center; justify-content: center; transform: translate(-50%,-50%); cursor: pointer; transition: all 0.3s; box-shadow: 0 1px 4px rgba(0,0,0,0.03); pointer-events: auto; font-size: clamp(9px,2.2vw,10px); font-weight: 700; color: #2c2822; letter-spacing: 0.8px; }
  .small-dot:hover { transform: translate(-50%,-50%) scale(1.15); border-color: #8c8276; box-shadow: 0 3px 14px rgba(0,0,0,0.08); z-index: 25; }
  .small-dot.warning { border-color: #c06b50; background: #fefaf8; }
  .close-dash { position: fixed; top: max(14px,env(safe-area-inset-top,14px)); right: max(14px,env(safe-area-inset-right,14px)); z-index: 30; width: clamp(32px,8vw,36px); height: clamp(32px,8vw,36px); border-radius: 50%; border: 0.5px solid #d5d1c8; background: #faf9f6; color: #6b6058; font-size: clamp(14px,3.5vw,16px); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .close-dash:hover { background: #f0ede8; }
</style>
</head>
<body>

<div class="page" id="home">
  <div class="home-scene" id="homeScene">
    <svg class="h-lines" id="hLines"></svg>
    <div class="h-center" id="hCenter"></div>
    <div id="hWords" style="position:absolute;inset:0;z-index:6;pointer-events:none;"></div>
  </div>
  <div class="root-switcher" id="rootSwitcher"></div>
  <button class="review-done-btn" id="homeDoneBtn">勾选已背 0/8</button>
  <button class="close-dash" id="closeDash" style="display:none;">✕</button>
</div>

<div class="page hidden" id="dashboard">
  <div class="dash-top">
    <span class="title">记忆仪表盘</span>
    <span class="date" id="dateDisplay"></span>
  </div>
  <div class="stats-row">
    <div class="stat-card"><span class="val" id="statTotal">35</span><span class="lbl">词根总数</span></div>
    <div class="stat-card"><span class="val" id="statReviewed">0</span><span class="lbl">今日已复习</span></div>
    <div class="stat-card"><span class="val urgent" id="statUrgent">0</span><span class="lbl">需要复习</span></div>
  </div>
  <div class="chart-wrap" id="chartWrap">
    <svg id="chartSvg"></svg>
    <div class="chart-dots" id="chartDots"></div>
  </div>
</div>

<script>
const ROOTS_DATA = ${JSON.stringify(ROOTS, null, 2)};

const STORAGE_KEY = "word_root_review_v6";
function loadState() {
  try { const r = localStorage.getItem(STORAGE_KEY); if (r) return JSON.parse(r); } catch(e) {}
  const s = {}; ROOTS_DATA.forEach(d => { s[d.id] = { lastReview: null, count: 0 }; }); return s;
}
function saveState(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
let reviewState = loadState();

function getElapsedHours(lr) { if (!lr) return Infinity; return (Date.now() - lr) / (1000*60*60); }
function retentionAt(h) { if (h === Infinity) return 0.21; return 0.79 * Math.exp(-h / 10.8) + 0.21; }

const homePage = document.getElementById("home");
const homeScene = document.getElementById("homeScene");
const hLines = document.getElementById("hLines");
const hCenter = document.getElementById("hCenter");
const hWords = document.getElementById("hWords");
const rootSwitcher = document.getElementById("rootSwitcher");
const homeDoneBtn = document.getElementById("homeDoneBtn");
const dashPage = document.getElementById("dashboard");
const chartWrap = document.getElementById("chartWrap");
const chartSvg = document.getElementById("chartSvg");
const chartDots = document.getElementById("chartDots");
const dateDisplay = document.getElementById("dateDisplay");
const statTotal = document.getElementById("statTotal");
const statReviewed = document.getElementById("statReviewed");
const statUrgent = document.getElementById("statUrgent");
const closeDash = document.getElementById("closeDash");

let currentId = "spect";

function edgePoint(cx,cy,r,tx,ty){const dx=tx-cx,dy=ty-cy,d=Math.hypot(dx,dy);return d===0?[cx,cy-r]:[cx+dx/d*r,cy+dy/d*r];}

function renderHome() {
  const data = ROOTS_DATA.find(r=>r.id===currentId); if(!data) return;
  const W=innerWidth,H=innerHeight,cx=W/2,cy=H/2,md=Math.min(W,H),CR=36;
  const count=data.words.length;
  const pts=data.words.map((_,i)=>{
    const angle=(2*Math.PI*i)/count-Math.PI/2;
    const r=md*0.25*(0.88+0.12*(i%3));
    return{x:cx+r*Math.cos(angle),y:cy+r*Math.sin(angle)};
  });

  let svg="";
  data.words.forEach((_,i)=>{const[ex,ey]=edgePoint(cx,cy,CR,pts[i].x,pts[i].y);svg+=\`<line x1="\${ex}" y1="\${ey}" x2="\${pts[i].x}" y2="\${pts[i].y}" data-i="\${i}"/>\`;});
  hLines.innerHTML=svg;

  hCenter.innerHTML=\`<div class="root">\${data.root}</div><div class="sub">\${data.sub}</div><div class="meaning">\${data.meaning}</div><div class="toggle-hint">点击切换全部释义</div>\`;

  let html="";
  data.words.forEach((w,i)=>{
    const ph=w.parts.map(p=>\`<span class="\${p.c}">\${p.t}</span>\`).join("");
    html+=\`<div class="h-word" style="left:\${pts[i].x}px;top:\${pts[i].y}px;pointer-events:auto;" data-i="\${i}"><div class="dot"></div><div class="text">\${ph}</div><div class="zh">\${w.zh}</div><div class="check">✓</div></div>\`;
  });
  hWords.innerHTML=html;

  const lines=hLines.querySelectorAll("line"),wordEls=hWords.querySelectorAll(".h-word");
  function allExpanded(){return Array.from(wordEls).every(el=>el.classList.contains("expanded"));}
  function checkedCount(){return Array.from(wordEls).filter(el=>el.classList.contains("checked")).length;}
  function syncLines(){lines.forEach(l=>l.classList.remove("hl"));wordEls.forEach(el=>{if(el.classList.contains("expanded")){const i=+el.dataset.i;if(lines[i])lines[i].classList.add("hl");}});}
  function updateDoneBtn(){
    const n=checkedCount(),total=wordEls.length;
    homeDoneBtn.textContent=n===total?"完成复习 ✓":"勾选已背 "+n+"/"+total;
    if(n===total)homeDoneBtn.classList.add("ready");else homeDoneBtn.classList.remove("ready");
  }

  hCenter.onclick=()=>{if(allExpanded())wordEls.forEach(el=>el.classList.remove("expanded"));else wordEls.forEach(el=>el.classList.add("expanded"));syncLines();};
  wordEls.forEach(el=>{
    el.addEventListener("click",e=>{
      e.stopPropagation();
      if(e.target.closest(".check")){el.classList.toggle("checked");updateDoneBtn();return;}
      el.classList.toggle("expanded");syncLines();
    });
    el.addEventListener("mouseenter",()=>{if(!el.classList.contains("expanded")){const i=+el.dataset.i;if(lines[i])lines[i].classList.add("hl");}});
    el.addEventListener("mouseleave",()=>{if(!el.classList.contains("expanded")){const i=+el.dataset.i;if(lines[i])lines[i].classList.remove("hl");}});
  });
  updateDoneBtn();

  rootSwitcher.innerHTML=\`<span class="rs-arrow" onclick="navHome(-1)">←</span><span class="house-btn" onclick="event.stopPropagation();openDashboard();" title="记忆仪表盘">⌂</span><span class="rs-arrow" onclick="navHome(1)">→</span>\`;
}

function navHome(dir){const idx=ROOTS_DATA.findIndex(d=>d.id===currentId);const ni=idx+dir;if(ni>=0&&ni<ROOTS_DATA.length)switchHome(ROOTS_DATA[ni].id);}
function switchHome(id){if(id===currentId)return;homeScene.classList.add("fading");setTimeout(()=>{currentId=id;renderHome();homeScene.classList.remove("fading");},250);}

homeDoneBtn.addEventListener("click",()=>{
  const n=document.querySelectorAll(".h-word.checked").length;
  if(n<8) return;
  reviewState=loadState();
  reviewState[currentId]={lastReview:Date.now(),count:(reviewState[currentId]?.count||0)+1};
  saveState(reviewState);
  openDashboard();
});

function renderDashboard() {
  const rect = chartWrap.getBoundingClientRect();
  const W = rect.width, H = rect.height;
  const margin = { top: 40, right: 36, bottom: 50, left: 44 };
  const chartW = W - margin.left - margin.right;
  const chartH = H - margin.top - margin.bottom;

  function hToX(hours) {
    if (hours === Infinity) hours = 30*24;
    const h = Math.max(0, Math.min(hours, 30*24));
    return margin.left + (Math.log(h+1) / Math.log(30*24+1)) * chartW;
  }
  function rToY(r) { return margin.top + (1 - r) * chartH; }

  let pathD = "";
  for (let i = 0; i <= 200; i++) {
    const hours = (i/200)*30*24;
    const r = 0.79*Math.exp(-hours/10.8)+0.21;
    pathD += (i===0?"M":"L")+\`\${hToX(hours).toFixed(1)},\${rToY(r).toFixed(1)} \`;
  }

  let svg = "";
  [1.0,0.8,0.6,0.4,0.2].forEach(r => {
    const y = rToY(r);
    svg += \`<line x1="\${margin.left}" y1="\${y}" x2="\${margin.left+chartW}" y2="\${y}" stroke="#ece8e0" stroke-width="0.5" stroke-dasharray="3,5"/>\`;
    svg += \`<text x="\${margin.left-8}" y="\${y+4}" text-anchor="end" font-size="9" fill="#c4bfb4" font-family="Georgia,'PingFang SC',serif">\${Math.round(r*100)}%</text>\`;
  });

  [{h:0,l:"0"},{h:1/3,l:"20分"},{h:1,l:"1时"},{h:9,l:"9时"},{h:24,l:"1天"},{h:48,l:"2天"},{h:24*6,l:"6天"},{h:24*30,l:"30天"}].forEach(t => {
    const x = hToX(t.h);
    svg += \`<line x1="\${x}" y1="\${rToY(0)}" y2="\${rToY(0)+8}" stroke="#d5d1c8" stroke-width="0.6"/>\`;
    svg += \`<text x="\${x}" y="\${rToY(0)+22}" text-anchor="middle" font-size="9" fill="#c4bfb4" font-family="Georgia,'PingFang SC',serif">\${t.l}</text>\`;
  });

  svg += \`<text x="\${margin.left-30}" y="\${margin.top+chartH/2}" text-anchor="middle" font-size="9" fill="#d0cbc2" font-family="Georgia,'PingFang SC',serif" transform="rotate(-90,\${margin.left-30},\${margin.top+chartH/2})" letter-spacing="0.8">记忆保留率</text>\`;
  svg += \`<text x="\${margin.left+chartW/2}" y="\${rToY(0)+40}" text-anchor="middle" font-size="9" fill="#d0cbc2" font-family="Georgia,'PingFang SC',serif" letter-spacing="0.8">距上次复习时间</text>\`;

  svg += \`<path d="\${pathD}" stroke="#e8e4da" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>\`;
  svg += \`<path d="\${pathD}" stroke="#c8c4ba" stroke-width="1.2" fill="none" stroke-linecap="round"/>\`;

  const lx = hToX(30*24);
  svg += \`<defs><linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8e4da" stop-opacity="0.3"/><stop offset="100%" stop-color="#e8e4da" stop-opacity="0"/></linearGradient></defs><path d="\${pathD} L\${lx},\${rToY(0)} L\${hToX(0)},\${rToY(0)} Z" fill="url(#gf)"/>\`;

  chartSvg.innerHTML = svg;

  let dotsHtml = "";
  let doneToday = 0, urgentN = 0;
  const posCount = {};

  ROOTS_DATA.forEach(data => {
    const st = reviewState[data.id];
    const hours = getElapsedHours(st.lastReview);
    const r = retentionAt(hours);
    let x = hToX(hours === Infinity ? 30*24 : hours);
    let y = rToY(r);
    const urgent = hours > 24 && r < 0.35;

    const key = \`\${Math.round(x)},\${Math.round(y)}\`;
    posCount[key] = (posCount[key] || 0) + 1;
    if (posCount[key] > 1) { x += (posCount[key] - 1) * 6; y -= (posCount[key] - 1) * 4; }

    if (urgent) urgentN++;
    if (st.lastReview && new Date(st.lastReview).toDateString() === new Date().toDateString()) doneToday++;

    dotsHtml += \`<div class="small-dot\${urgent?' warning':''}" style="left:\${x}px;top:\${y}px;pointer-events:auto;" title="\${data.meaning}" onclick="openFromDash('\${data.id}')">\${data.root}</div>\`;
  });

  chartDots.innerHTML = dotsHtml;
  statTotal.textContent = ROOTS_DATA.length;
  statReviewed.textContent = doneToday;
  statUrgent.textContent = urgentN;
}

function openDashboard() {
  reviewState = loadState();
  dashPage.classList.remove("hidden");
  closeDash.style.display = "flex";
  requestAnimationFrame(() => { renderDashboard(); });
}
closeDash.addEventListener("click", ()=>{
  dashPage.classList.add("hidden");
  closeDash.style.display = "none";
  renderHome();
});

function openFromDash(id) {
  dashPage.classList.add("hidden");
  closeDash.style.display = "none";
  currentId = id;
  renderHome();
}

dateDisplay.textContent = new Date().toLocaleDateString("zh-CN", { month:"long", day:"numeric", weekday:"short" });
document.querySelector(".dash-top .title").addEventListener("dblclick",()=>{if(confirm("重置所有复习记录？")){localStorage.removeItem(STORAGE_KEY);reviewState=loadState();renderDashboard();}});

let rt;
window.addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(()=>{renderHome();if(!dashPage.classList.contains("hidden"))renderDashboard();},200);});

renderHome();
</script>
</body>
</html>`;

fs.writeFileSync("src/index.html", html, "utf8");
console.log("✓ src/index.html rebuilt — 35 roots, 280 words, checkmark system");
