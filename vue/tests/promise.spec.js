const mylib = require('../src/promise');
describe('异步代码 Promise 测试', () => {
  it('should get "Hello DIST"', () => {
    return mylib('DIST').then(result => {
      expect(result).toBe('Hello DIST');
    })
  });
  // reject
  // it('mylib fails with an error', () => {
  //   expect.assertions(1);
  //   return mylib('').catch(e => expect(e).toMatch('error'))
  // });
})