module.exports = (bu: string, callback: Function) =>
  setTimeout(() => callback(`Hello ${bu}`), 1000);
