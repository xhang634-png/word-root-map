// 给每个词根补充派生词
const extraWords = {
  spect: [
    {parts:[{t:"spect",c:"black"},{t:"rum",c:"red"}],zh:"光谱"},
    {parts:[{t:"circum",c:"red"},{t:"spect",c:"black"}],zh:"谨慎的"},
    {parts:[{t:"speci",c:"black"},{t:"es",c:"red"}],zh:"物种"},
    {parts:[{t:"speci",c:"black"},{t:"men",c:"red"}],zh:"标本"},
  ],
  dict: [
    {parts:[{t:"bene",c:"red"},{t:"dict",c:"black"},{t:"ion",c:"red"}],zh:"祝福"},
    {parts:[{t:"male",c:"red"},{t:"dict",c:"black"},{t:"ion",c:"red"}],zh:"诅咒"},
    {parts:[{t:"dict",c:"black"},{t:"um",c:"red"}],zh:"格言"},
    {parts:[{t:"juris",c:"red"},{t:"dict",c:"black"},{t:"ion",c:"red"}],zh:"管辖权"},
  ],
  tract: [
    {parts:[{t:"tract",c:"black"},{t:"or",c:"red"}],zh:"拖拉机"},
    {parts:[{t:"tract",c:"black"}],zh:"小册子"},
    {parts:[{t:"tract",c:"black"},{t:"able",c:"red"}],zh:"易处理的"},
    {parts:[{t:"tract",c:"black"},{t:"ion",c:"red"}],zh:"牵引"},
  ],
  rupt: [
    {parts:[{t:"ab",c:"red"},{t:"rupt",c:"black"}],zh:"突然的"},
    {parts:[{t:"dis",c:"red"},{t:"rupt",c:"black"},{t:"ive",c:"red"}],zh:"破坏性的"},
    {parts:[{t:"rup",c:"black"},{t:"ture",c:"red"}],zh:"断裂"},
    {parts:[{t:"rupt",c:"black"},{t:"ure",c:"red"}],zh:"破裂"},
  ],
  ject: [
    {parts:[{t:"ad",c:"red"},{t:"ject",c:"black"},{t:"ive",c:"red"}],zh:"形容词"},
    {parts:[{t:"con",c:"red"},{t:"ject",c:"black"},{t:"ure",c:"red"}],zh:"推测"},
    {parts:[{t:"tra",c:"red"},{t:"ject",c:"black"},{t:"ory",c:"red"}],zh:"轨迹"},
    {parts:[{t:"ab",c:"red"},{t:"ject",c:"black"}],zh:"凄惨的"},
  ],
  port: [
    {parts:[{t:"port",c:"black"},{t:"folio",c:"red"}],zh:"文件夹"},
    {parts:[{t:"port",c:"black"},{t:"er",c:"red"}],zh:"搬运工"},
    {parts:[{t:"port",c:"black"},{t:"al",c:"red"}],zh:"门户"},
    {parts:[{t:"pur",c:"red"},{t:"port",c:"black"}],zh:"目的"},
  ],
  ven: [
    {parts:[{t:"contra",c:"red"},{t:"vene",c:"black"}],zh:"违反"},
    {parts:[{t:"circum",c:"red"},{t:"vent",c:"black"}],zh:"规避"},
    {parts:[{t:"con",c:"red"},{t:"vene",c:"black"}],zh:"召集"},
    {parts:[{t:"sou",c:"red"},{t:"venir",c:"black"}],zh:"纪念品"},
  ],
  grad: [
    {parts:[{t:"centi",c:"red"},{t:"grade",c:"black"}],zh:"厘度"},
    {parts:[{t:"grad",c:"black"},{t:"ient",c:"red"}],zh:"梯度"},
    {parts:[{t:"retro",c:"red"},{t:"grade",c:"black"}],zh:"倒退"},
    {parts:[{t:"grad",c:"black"},{t:"ation",c:"red"}],zh:"等级"},
  ],
  ced: [
    {parts:[{t:"se",c:"red"},{t:"cede",c:"black"}],zh:"脱离"},
    {parts:[{t:"pre",c:"red"},{t:"cede",c:"black"}],zh:"先于"},
    {parts:[{t:"con",c:"red"},{t:"cess",c:"black"},{t:"ion",c:"red"}],zh:"让步"},
    {parts:[{t:"ex",c:"red"},{t:"cess",c:"black"}],zh:"过度"},
  ],
  miss: [
    {parts:[{t:"re",c:"red"},{t:"mit",c:"black"}],zh:"汇出"},
    {parts:[{t:"inter",c:"red"},{t:"mit",c:"black"},{t:"tent",c:"red"}],zh:"间歇的"},
    {parts:[{t:"o",c:"red"},{t:"mit",c:"black"}],zh:"省略"},
    {parts:[{t:"com",c:"red"},{t:"miss",c:"black"},{t:"ion",c:"red"}],zh:"佣金"},
  ],
  vid: [
    {parts:[{t:"vis",c:"black"},{t:"ual",c:"red"}],zh:"视觉的"},
    {parts:[{t:"en",c:"red"},{t:"vis",c:"black"},{t:"ion",c:"red"}],zh:"羡慕"},
    {parts:[{t:"vis",c:"black"},{t:"a",c:"red"}],zh:"签证"},
    {parts:[{t:"vis",c:"black"},{t:"it",c:"red"}],zh:"访问"},
  ],
  scrib: [
    {parts:[{t:"scrib",c:"black"},{t:"ble",c:"red"}],zh:"乱画"},
    {parts:[{t:"con",c:"red"},{t:"scribe",c:"black"}],zh:"征召"},
    {parts:[{t:"a",c:"red"},{t:"scribe",c:"black"}],zh:"归因于"},
    {parts:[{t:"circum",c:"red"},{t:"scribe",c:"black"}],zh:"限制"},
  ],
  duc: [
    {parts:[{t:"ab",c:"red"},{t:"duct",c:"black"}],zh:"绑架"},
    {parts:[{t:"via",c:"red"},{t:"duct",c:"black"}],zh:"高架渠"},
    {parts:[{t:"con",c:"red"},{t:"duc",c:"black"},{t:"ive",c:"red"}],zh:"导电的"},
    {parts:[{t:"de",c:"red"},{t:"duct",c:"black"}],zh:"扣除"},
  ],
  fer: [
    {parts:[{t:"de",c:"red"},{t:"fer",c:"black"}],zh:"推迟"},
    {parts:[{t:"circum",c:"red"},{t:"fer",c:"black"},{t:"ence",c:"red"}],zh:"圆周"},
    {parts:[{t:"fert",c:"black"},{t:"ile",c:"red"}],zh:"肥沃的"},
    {parts:[{t:"voci",c:"red"},{t:"fer",c:"black"},{t:"ous",c:"red"}],zh:"吵闹的"},
  ],
  pel: [
    {parts:[{t:"re",c:"red"},{t:"puls",c:"black"},{t:"e",c:"red"}],zh:"击退"},
    {parts:[{t:"im",c:"red"},{t:"puls",c:"black"},{t:"e",c:"red"}],zh:"脉冲"},
    {parts:[{t:"com",c:"red"},{t:"puls",c:"black"},{t:"ory",c:"red"}],zh:"强制性的"},
    {parts:[{t:"ex",c:"red"},{t:"puls",c:"black"},{t:"ion",c:"red"}],zh:"驱逐"},
  ],
  vers: [
    {parts:[{t:"a",c:"red"},{t:"vers",c:"black"},{t:"e",c:"red"}],zh:"厌恶"},
    {parts:[{t:"contra",c:"red"},{t:"vers",c:"black"},{t:"y",c:"red"}],zh:"争议"},
    {parts:[{t:"trans",c:"red"},{t:"verse",c:"black"}],zh:"横穿"},
    {parts:[{t:"uni",c:"red"},{t:"verse",c:"black"}],zh:"宇宙"},
  ],
  cap: [
    {parts:[{t:"anti",c:"red"},{t:"cip",c:"black"},{t:"ate",c:"red"}],zh:"预期"},
    {parts:[{t:"parti",c:"red"},{t:"cip",c:"black"},{t:"ate",c:"red"}],zh:"参与"},
    {parts:[{t:"cap",c:"black"},{t:"able",c:"red"}],zh:"能干的"},
    {parts:[{t:"cap",c:"black"},{t:"acity",c:"red"}],zh:"容量"},
  ],
  ten: [
    {parts:[{t:"ten",c:"black"},{t:"acious",c:"red"}],zh:"顽强的"},
    {parts:[{t:"abs",c:"red"},{t:"tain",c:"black"}],zh:"戒除"},
    {parts:[{t:"per",c:"red"},{t:"tain",c:"black"}],zh:"关于"},
    {parts:[{t:"ten",c:"black"},{t:"ant",c:"red"}],zh:"租户"},
  ],
  cred: [
    {parts:[{t:"cred",c:"black"},{t:"ence",c:"red"}],zh:"信任"},
    {parts:[{t:"cred",c:"black"},{t:"ulous",c:"red"}],zh:"轻信的"},
    {parts:[{t:"cred",c:"black"},{t:"itor",c:"red"}],zh:"债权人"},
    {parts:[{t:"in",c:"red"},{t:"cred",c:"black"},{t:"ulous",c:"red"}],zh:"怀疑的"},
  ],
  gen: [
    {parts:[{t:"gen",c:"black"},{t:"eral",c:"red"}],zh:"一般的"},
    {parts:[{t:"gen",c:"black"},{t:"esis",c:"red"}],zh:"起源"},
    {parts:[{t:"gen",c:"black"},{t:"erous",c:"red"}],zh:"慷慨的"},
    {parts:[{t:"homo",c:"red"},{t:"gene",c:"black"},{t:"ous",c:"red"}],zh:"同质的"},
  ],
  aud: [
    {parts:[{t:"aud",c:"black"},{t:"itory",c:"red"}],zh:"听觉的"},
    {parts:[{t:"aud",c:"black"},{t:"it",c:"red"},{t:"ory",c:"red"}],zh:"旁听生"},
    {parts:[{t:"aud",c:"black"},{t:"io",c:"red"},{t:"logy",c:"red"}],zh:"音频学"},
    {parts:[{t:"obey",c:"red"}],zh:"服从"},
  ],
  bell: [
    {parts:[{t:"bell",c:"black"},{t:"igerent",c:"red"}],zh:"好战的"},
    {parts:[{t:"bell",c:"black"},{t:"ic",c:"red"}],zh:"战争的"},
    {parts:[{t:"bell",c:"black"},{t:"icosity",c:"red"}],zh:"好战性"},
    {parts:[{t:"re",c:"red"},{t:"bell",c:"black"},{t:"ion",c:"red"}],zh:"叛乱"},
  ],
  chron: [
    {parts:[{t:"chron",c:"black"},{t:"ic",c:"red"},{t:"le",c:"red"}],zh:"编年史"},
    {parts:[{t:"ana",c:"red"},{t:"chron",c:"black"},{t:"istic",c:"red"}],zh:"时代错误的"},
    {parts:[{t:"iso",c:"red"},{t:"chron",c:"black"},{t:"ous",c:"red"}],zh:"等时的"},
    {parts:[{t:"chron",c:"black"},{t:"ometry",c:"red"}],zh:"计时学"},
  ],
  cogn: [
    {parts:[{t:"cogn",c:"black"},{t:"izant",c:"red"}],zh:"认知的"},
    {parts:[{t:"cogn",c:"black"},{t:"oscenti",c:"red"}],zh:"行家"},
    {parts:[{t:"pre",c:"red"},{t:"cogn",c:"black"},{t:"ition",c:"red"}],zh:"预知"},
    {parts:[{t:"recon",c:"red"},{t:"nais",c:"black"},{t:"sance",c:"red"}],zh:"侦察"},
  ],
  corp: [
    {parts:[{t:"corp",c:"black"},{t:"ulence",c:"red"}],zh:"肥胖"},
    {parts:[{t:"corp",c:"black"},{t:"oreity",c:"red"}],zh:"物质性"},
    {parts:[{t:"extra",c:"red"},{t:"corp",c:"black"},{t:"oreal",c:"red"}],zh:"体外的"},
    {parts:[{t:"corps",c:"red"}],zh:"军团"},
  ],
  fac: [
    {parts:[{t:"fac",c:"black"},{t:"simile",c:"red"}],zh:"复制品"},
    {parts:[{t:"bene",c:"red"},{t:"factor",c:"black"}],zh:"恩人"},
    {parts:[{t:"male",c:"red"},{t:"factor",c:"black"}],zh:"作恶者"},
    {parts:[{t:"arti",c:"red"},{t:"fic",c:"black"},{t:"ial",c:"red"}],zh:"人造的"},
  ],
  flu: [
    {parts:[{t:"flu",c:"black"},{t:"ency",c:"red"}],zh:"流利"},
    {parts:[{t:"super",c:"red"},{t:"flu",c:"black"},{t:"ous",c:"red"}],zh:"多余的"},
    {parts:[{t:"con",c:"red"},{t:"flu",c:"black"},{t:"ence",c:"red"}],zh:"汇合"},
    {parts:[{t:"melli",c:"red"},{t:"flu",c:"black"},{t:"ous",c:"red"}],zh:"甜美的"},
  ],
  graph: [
    {parts:[{t:"graph",c:"black"},{t:"ite",c:"red"}],zh:"石墨"},
    {parts:[{t:"graph",c:"black"},{t:"ologist",c:"red"}],zh:"笔迹学家"},
    {parts:[{t:"epi",c:"red"},{t:"graph",c:"black"}],zh:"铭文"},
    {parts:[{t:"seismo",c:"red"},{t:"graph",c:"black"}],zh:"地震仪"},
  ],
  log: [
    {parts:[{t:"log",c:"black"},{t:"ic",c:"red"}],zh:"逻辑"},
    {parts:[{t:"eu",c:"red"},{t:"log",c:"black"},{t:"y",c:"red"}],zh:"颂词"},
    {parts:[{t:"eco",c:"red"},{t:"log",c:"black"},{t:"y",c:"red"}],zh:"生态学"},
    {parts:[{t:"neo",c:"red"},{t:"log",c:"black"},{t:"ism",c:"red"}],zh:"新词"},
  ],
  man: [
    {parts:[{t:"man",c:"black"},{t:"date",c:"red"}],zh:"命令"},
    {parts:[{t:"man",c:"black"},{t:"oeuvre",c:"red"}],zh:"演习"},
    {parts:[{t:"man",c:"black"},{t:"ifest",c:"red"}],zh:"明显的"},
    {parts:[{t:"main",c:"red"},{t:"tain",c:"black"}],zh:"维持"},
  ],
  mob: [
    {parts:[{t:"mob",c:"black"}],zh:"暴民"},
    {parts:[{t:"re",c:"red"},{t:"mote",c:"black"}],zh:"遥远的"},
    {parts:[{t:"loco",c:"red"},{t:"mot",c:"black"},{t:"ive",c:"red"}],zh:"火车头"},
    {parts:[{t:"mob",c:"black"},{t:"ility",c:"red"}],zh:"流动性"},
  ],
  mort: [
    {parts:[{t:"mort",c:"black"},{t:"al",c:"red"},{t:"ity",c:"red"}],zh:"必死性"},
    {parts:[{t:"mort",c:"black"},{t:"ify",c:"red"},{t:"ing",c:"red"}],zh:"羞辱的"},
    {parts:[{t:"morbid",c:"red"}],zh:"病态的"},
    {parts:[{t:"mort",c:"black"},{t:"ician",c:"red"}],zh:"殡仪业者"},
  ],
  path: [
    {parts:[{t:"path",c:"black"},{t:"ogen",c:"red"}],zh:"病原体"},
    {parts:[{t:"osteo",c:"red"},{t:"path",c:"black"}],zh:"整骨师"},
    {parts:[{t:"path",c:"black"},{t:"os",c:"red"}],zh:"悲怆"},
    {parts:[{t:"homeo",c:"red"},{t:"pathy",c:"black"}],zh:"顺势疗法"},
  ],
  pend: [
    {parts:[{t:"ap",c:"red"},{t:"pend",c:"black"},{t:"ix",c:"red"}],zh:"附录"},
    {parts:[{t:"pend",c:"black"},{t:"ant",c:"red"}],zh:"悬挂的"},
    {parts:[{t:"im",c:"red"},{t:"pend",c:"black"},{t:"ing",c:"red"}],zh:"迫近的"},
    {parts:[{t:"stip",c:"red"},{t:"end",c:"black"}],zh:"规定"},
  ],
  phon: [
    {parts:[{t:"head",c:"red"},{t:"phone",c:"black"}],zh:"耳机"},
    {parts:[{t:"xylo",c:"red"},{t:"phone",c:"black"}],zh:"木琴"},
    {parts:[{t:"phon",c:"black"},{t:"eme",c:"red"}],zh:"音素"},
    {parts:[{t:"phon",c:"black"},{t:"ics",c:"red"}],zh:"声学"},
  ],
};

const fs = require("fs");
let html = fs.readFileSync("src/index.html", "utf8");

// 先恢复被上次脚本破坏的数据：重新构建 src/index.html
// 策略：逐行处理，找到每个词根的 words 数组结束位置，在后面插入新单词

const lines = html.split("\n");
const output = [];

for (let i = 0; i < lines.length; i++) {
  output.push(lines[i]);

  // 检测是否是 words 数组结束行: "    ]}," (每个词根的 words 数组末尾)
  if (/^    \]},$/.test(lines[i])) {
    // 向前找，确认是属于哪个词根的
    let rootId = null;
    for (let j = output.length - 2; j >= 0; j--) {
      const m = output[j].match(/id:"(\w+)"/);
      if (m) { rootId = m[1]; break; }
    }

    if (rootId && extraWords[rootId]) {
      // 在 ]}, 之前插入新的单词行
      // 移除刚才 push 的 ]},
      output.pop();
      // 插入新单词（每行2个单词）
      const words = extraWords[rootId];
      for (let w = 0; w < words.length; w += 2) {
        const pair = [words[w]];
        if (words[w + 1]) pair.push(words[w + 1]);
        const jsonStr = pair.map(x => JSON.stringify(x)).join(",");
        output.push("      " + jsonStr + ",");
      }
      // 再放回 ]},
      output.push("    ]},");
    }
  }
}

fs.writeFileSync("src/index.html", output.join("\n"), "utf8");
console.log("Done! Added words to all roots.");
