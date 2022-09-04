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
