module.exports = {
  // parserOptions: {
  //   // parser: "babel-eslint"
  // },
  parser:  '@typescript-eslint/parser', //定义ESLint的解析器
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "plugin:@typescript-eslint/recommended"], // 为插件启动建议的规则
  plugins: ["@typescript-eslint"],// 添加 ts eslint的规则插件处理
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 禁止使用 var 
    "no-var": "error"
  },

};
