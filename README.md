# vue-tree-menu-manage

> light-years-y


## display
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb580977ec354ca29f7aaaae2fee610d~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp)
## install

```bash
# install dependencies
npm install vue-tree-menu-manage --save

import menuManage from 'vue-tree-menu-manage'

Vue.use(menuManage)

```

## Example Links

- [ Doc ](https://juejin.cn/post/7002134735279374344)
- [ Example ](https://juejin.cn/post/7002134735279374344)

```bash
<menu-manage
	:parentId="parentId"
	:currentId="currentId"
	:formData="formData"
	:treeProps="treeProps"
	@addEditFormData="addEditFormData"
	@deleteTreeData="deleteTreeData"
></menu-manage>
```

```javascript
<script>
export default {
 data(){
		return {
			currentId: "categoryId", 
			parentId:"parentId", 
			formShow: false, 
			treeProps: { children: "children", label: "categoryName", hideAddBtn: "isLeaf", treeData: []},
			formData: [
    {elItem: "cascader", label: "父级类目", prop: "parentId", defaultValue:"", cascaderLable: "categoryName", cascaderValue: "categoryId"},
				{	label: "类目名称", prop: "categoryName",	placeholder: "请输入类目名称", rules: false},
				{ label: "无子类目", prop: "isLeaf", elItem: "switch", defaultValue: false, editDisable: true}
   ]
	 }
 },
 created(){
  this.treeProps.treeData = [{"categoryId": 94,"parentId": 0,"categoryName": "管理","isLeaf":false,
    "children": [
     {"categoryId": 95,"parentId": 94,"categoryName": "列表","isLeaf": false},
     {"categoryId": 96,"parentId": 94,"categoryName": "详情","isLeaf": true}]
   }]
 },
 methods: {
  `// 获取form表单数据，data:表单数据，type:当前模式，add-新增，edit:编辑`
  addEditFormData(data, type) {},
  `// 删除当前节点，id:获取的是传入的currentId,唯一id`
  deleteTreeData(id) {}
 },
}
</script>
```

## Props

| Props     | type   | description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| parentId  | string | Parent node ID name                                                           |
| currentId | string | current node ID name                                                          |
| formData  | Array  | right form field, Currently, input textarea, cascade and switch are supported |
| treeProps | Object | left tree props                                                               |
| formShow  | Object | right form show hide                                                          |

### treeProps

| treeProps  | Object | left tree props                                     |
| ---------- | ------ | --------------------------------------------------- |
| label      | String | left tree, elementUI Props, tree render label filed |
| children   | String | left tree, elementUI Props, tree render filed       |
| hideAddBtn | String | left tree, hide addBtn condition filed              |
| treeData   | Array  | left tree render data                               |

### formData

| formData      | Array   | right form field                                                           |
| ------------- | ------- | -------------------------------------------------------------------------- |
| elItem        | String  | default input, support input, textarea, cascader, switch                   |
| label         | String  | elementUI Props, form label                                                |
| prop          | String  | elementUI Props, form prop                                                 |
| placeholder   | String  |                                                                            |
| defaultValue  | String  |                                                                            |
| rules         | Object  | filed verification rules, defalut not empty verify, value:false,not verify |
| cascaderLable | String  | elItem:'cascader', elementUI cascader prop                                 |
| cascaderValue | String  | elItem:'cascader', elementUI cascader prop                                 |
| editDisable   | Boolean | In editing status, it cannot be edited                                     |

## Methods

| method name     | params     | description            |
| --------------- | ---------- | ---------------------- |
| addEditFormData | data ,type | return form data ,type |
| deleteTreeData  | id         | return delete id       |

## Keywords

vue tree menuManagement categoryManagement menu-manage vue-tree-menu-manage elementui vue-components
