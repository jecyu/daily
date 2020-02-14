module.exports = {
  collectCoverage: true,
  transform: {
      '^.+\\.tsx?$': 'ts-jest', // 使用 Jest 测试 TypeScript 代码需要借助 ts-jest 解析器
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};