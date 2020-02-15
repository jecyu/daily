export default function(bu: string, callback: Function) {
  setTimeout(() => callback(`Hello ${bu}`), 1000);
}
