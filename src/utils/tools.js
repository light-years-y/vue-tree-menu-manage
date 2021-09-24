/**
 * 单层对象赋值
 * @param {*} obj1 
 * @param {*} obj2 
 */
export function objShallowAssignment(obj1, obj2) {
  Object.keys(obj1).forEach(key => { obj1[key] = obj2[key] })
}
/**
 * 判断是否-对象
 * @param {*} data
 * @returns
 */
export function isObjF(data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}
/**
 * 判断是否-数组
 * @param {*} arr
 * @returns
 */
export function isArrF(arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
}
// 判断是否为undefined
export function isUndefined(va) {
  return typeof va == 'undefined'
}