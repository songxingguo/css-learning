/**
 *  1. 如何比较两个数是否相等 a === b
 *  2. 对象中添加属性 a["c"] = 3
 *  3. 如何遍历一个对象 item in arr
 *  4. 如何深度优先遍历
 *  5. 如何标记每个对象
 *  6. 如何判断是否一个对象 typeof x == 'Object'
 * @param originalData
 * @param changeData
 */
// function diff (origin, target) {
//   let  diffData = {};
//   if (typeof origin == "object") {
//     for (let key of Object.keys(origin)) {
//       if (target.hasOwnProperty(key)) {
//         diff(origin[key], target[key])
//       }
//     }
//     let diffs = Object.keys(origin).concat(Object.keys(target))
//       .filter((v, i, arr) => arr.indexOf(v) === arr.lastIndexOf(v)); // 获取不同值
//     // diffData.push(diffs)
//     for (let key of diffs) {
//       diffData[key] = origin[key] ? origin[key] : target[key];
//     }
//     // console.log(diffs)
//   } else  {
//     if (origin != target) {
//       // console.log(target)
//       // diffData.push(target)
//     }
//   }
//   return diffData;
// }

/**
 * 不会保存删除的数据
 * 怎么想处抽离获取值的方法
 * @param oldData
 * @param newData
 */
function diff (oldData, newData) {
  let diffData = {};
  function getValueByPath (path, data) {
    const pathItems = path.split('.');
    let currentValue = data;
    for (let item of pathItems) {
      if (currentValue === null || currentValue === undefined) return currentValue;
      currentValue = currentValue[item];
    }
    return currentValue;
  }
  function compare (data,  keyRoot='') {
   Object.keys(data).forEach(function (key) {
       let currentKey = keyRoot + key;
       let val = getValueByPath(currentKey, newData);
       if (val instanceof Array || val instanceof Object) {
         compare(val, currentKey + '.');
       } else if (val !== getValueByPath(currentKey, oldData)) {
         diffData[currentKey] = val;
       }
   })
  }
  compare(newData);
  return diffData;
}

// 测试数据
let originalData = {
  name: 'lee',
  phone: '17612166874',
  c: [1, 2, {d: 5, e: [2, 3]}]
}
let changeData = {
  phone: '17612166874',
  name: 'lee',
  f: 'df',
  c: [1, 3, {d: 6, e: [1, 3, 4], g: '344'}]
}
let diffDataWithPath = diff(originalData, changeData)
console.log('originalData ==============')
console.log(originalData)
console.log('changeData ==============')
console.log(changeData)
console.log('diffDataWithPath ==============')
console.log(diffDataWithPath)
