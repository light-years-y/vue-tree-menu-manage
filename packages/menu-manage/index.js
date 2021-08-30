import menuManage from './src/menuManage';

menuManage.install = function(Vue) {
  Vue.component(menuManage.name, menuManage);
};

export default menuManage;
