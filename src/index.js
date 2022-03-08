import data from './data/name.json'
// 结论：webpack能处理js/json

import './index.less';
import './second.css';
import './assets/font/iconfont.css';
function add (x, y) {
  return x + y;
}
console.log('data', data);
console.log(add(1,2));