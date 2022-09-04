# chrome-inject-eval

> **use eval in chrome extension v3+**

你可以通过引入本包从而实现在 chrome 插件 v3 版本中使用 eval

## Start

我们推荐你使用npm安装而不是yarn或者pnpm，因为chrome插件开发时（没有webpack/rollup时）如果使用pnpm这种软链接安装的包管理工具是会出问题的
```bash
npm i chrome-inject-eval
```

## Usage

### manifest.json

```json
{
  ...
  "content_scripts": [
    {
      ...
      "js": [
        "./node_modules/chrome-inject-eval/dist/umd.min.js",
        "./src/[your inject].js"
      ],
      ...
    }
  ],
  ...
}
```

### [your inject].js

- 基本

```js
const evil = evalCore.getEvalInstance(window);

evil("const a=1;");
console.log(a); // 1
```

- 高阶

```js
const { evalModule, transformCode } = evalCore;

const { Interpreter } = evalModule;
Interpreter.global = window;
const interpreter = new Interpreter();
// 现在你可以使用eval5的所有功能

interpreter.evaluate(transformCode("const a=1;"));

console.log(a); // 1
```

## Caveats

`chrome-inject-eval`的导出对象有三个属性，其中`evalModule`本质上等于`require("eval5")`，而 transform 则是通过 babel 把字符串编译成 ES5 代码，所以如果想使用更多 eval 相关的功能，可以参考 [eval5官网](https://github.com/bplok20010/eval5)

```js
const evil = require("eval5");
const { transform } = require("@babel/standalone");

const transformCode = (codeStr) =>
  transform(codeStr, { presets: ["env"] }).code;

const getEvalInstance = (obj) => {
  const interpreter = new evil.Interpreter(obj, {
    timeout: 1000,
  });
  return (codeStr) => interpreter.evaluate(transformCode(codeStr));
};

module.exports = {
  evalModule: evil,
  getEvalInstance,
  transformCode,
};
```
