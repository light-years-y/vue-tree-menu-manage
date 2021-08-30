/**
 * sxy
 */

 import reg from './regular.js'

 /**
  * @param {string} path
  * @returns {Boolean}
  */
 export function isExternal(path) {
   return /^(https?:|mailto:|tel:)/.test(path)
 }
 
 // 图片上传校验
 export function validatePicture (rule, value, callback) {
   if (!value) {
     return callback(new Error('请选择图片')) //
   } else {
     callback()
   }
 }
 
 // 账号校验
 export function validateAccount (rule, value, callback) {
   if (!value) {
     return callback(new Error('请输入您的邮箱或者手机号'))
   }
   setTimeout(() => {
     if (reg.mailReg.test(value) || reg.phoneReg.test(value)) {
       callback()
     } else {
       callback(new Error('请输入正确的邮箱或者手机号'))
     }
   }, 100)
 }
 
 // 密码校验
 export function validatePassword (rule, value, callback) {
   if (value.length < 6 || value.length > 16) {
     callback(new Error('请输入6-16位密码'))
   } else {
     callback()
   }
 }
 
 // 邮箱校验
 export function validateEmail (rule, value, callback) {
   if (!value) {
     return callback(new Error('邮箱不能为空'))
   }
   setTimeout(() => {
     if (reg.mailReg.test(value)) {
       callback()
     } else {
       callback(new Error('请输入正确的邮箱格式'))
     }
   }, 100)
 }
 
 // 手机号校验
 export function validateMobileNo (rule, value, callback) {
   if (value.length < 11 ) {
     callback(new Error('请输入11位手机号'))
   } else {
     callback()
   }
 }
 
 // 验证码校验
 export function validateCaptcha (rule, value, callback) {
   if (!value.length ) {
     callback(new Error('请输入验证码'))
   } else {
     callback()
   }
 }
 
 
 