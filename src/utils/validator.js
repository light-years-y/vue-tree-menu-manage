import * as va from './validate.js'

const validator = {
  rulesNotEmpty: { required: true, trigger:"blur", trigger: "change", message: "请填写" },
  rulesNotEmpty1: { required: true, trigger:"blur", message: "请选择" },
  rulesNotEmpty2: { required: true, trigger:"blur", message: "请输入正确的版本" },
  rulesNotEmpty3: { required: true, trigger:"blur", message: "请输入正确的版本号" },
  rulesNotEmpty4: { required: true, trigger:"blur", message: "请输入下载地址" },
  rulesNotEmpty5: { required: true, trigger:"blur", message: "请输入描述" },
  rulesLength200: { min: 0, max: 200, message: "最多输入200个汉字" },
  rulesLength40: { min: 0, max: 40, message: "最多输入40个汉字" },
  rulesLength50: { min: 0, max: 50, message: "最多输入50个汉字" },
  rulesLength10: { min: 0, max: 10, message: "最多输入10个汉字" },
  picture:{ required: true, trigger: 'blur', validator: va.validatePicture },
  email: [{ required: true, trigger: 'blur', validator: va.validateEmail }],
  mobileNo: [{ required: true, trigger: 'blur', validator: va.validateMobileNo }],
  password: [{ required: true, trigger: 'blur', validator: va.validatePassword }],
  captcha: [{ required: true, trigger: 'blur', validator: va.validateCaptcha }],
  rulesNotEmptyMax100:[
    {required: true, trigger:"blur", message: "请填写" },
    { min: 0, max: 100, message: "最多输入100个汉字" }
  ],
  account: [{ required: true, trigger: 'blur', validator: va.validateAccount }],
}

export default validator