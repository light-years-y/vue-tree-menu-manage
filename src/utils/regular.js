const mailReg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/ // 邮箱
const phoneReg = /^1\d{10}$/  // 手机号
const versionReg = /^1\d{10}$/  // 版本号

const reg = {
  mailReg,
  phoneReg,
  versionReg
}

export default reg
