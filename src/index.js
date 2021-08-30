import MenuManage from "../packages/menu-manage/index.js";

const components = [
  MenuManage
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue);
}

export default{
  install,
  MenuManage
}