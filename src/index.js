import data from './data/name.json';
// 结论：webpack能处理js/json

import './index.less';
import './second.css';
import './assets/font/iconfont.css';

//直接引入 不是babel插件，
// import '@babel/polyfill'

const a = 1;
function add(x, y) {
  return x + y;
}
console.log('data', data);
console.log(add(1, 2));

const jian = () => {
  return x - y;
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11);
  }, 1000);
})
