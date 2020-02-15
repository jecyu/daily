module.exports = bu => {
  return new Promise((resolve, reject) => {
    if (!bu) {
      reject("Empty string");
      return;
    }
    setTimeout(() => {
      resolve(`Hello ${bu}`);
    }, 1000);
  });
};
