const fs = require("fs");
const JavaScriptObfuscator = require("javascript-obfuscator");

// 读取源文件
const source = fs.readFileSync("src/index.html", "utf8");

// 提取 <script> 标签之间的 JS 代码
const scriptMatch = source.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error("No <script> tag found in source!");
  process.exit(1);
}

const jsCode = scriptMatch[1];
const before = source.substring(0, scriptMatch.index + 8); // 包括 <script>
const after = source.substring(scriptMatch.index + scriptMatch[0].length); // </script> 之后

// 混淆 JS
const result = JavaScriptObfuscator.obfuscate(jsCode, {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: 2000,
  disableConsoleOutput: true,
  identifierNamesGenerator: "hexadecimal",
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayEncoding: ["base64"],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersType: "function",
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
});

// 拼接
const protected = before + "\n" + result.getObfuscatedCode() + "\n" + after;

fs.writeFileSync("index.html", protected, "utf8");
console.log("✓ Build complete: index.html (protected)");
console.log(`  Original: ${(source.length / 1024).toFixed(1)} KB`);
console.log(`  Protected: ${(protected.length / 1024).toFixed(1)} KB`);
