# vue-tree-menu-manage

> light-years-y

## install

```bash
# install dependencies
npm install vue-tree-menu-manage --save

import menuManage from 'vue-tree-menu-manage'

Vue.use(menuManage)

```

## Example



```bash
<menu-manage
		:parentId="parentId"
		:currentId="currentId"
		:formData="formData"
		:treeProps="treeProps"
		:treeDataArr="treeDataArr"
		:cascaderOptions="cascaderOptions"
		@addEditFormData="addEditFormData"
		@deleteTreeData="deleteTreeData"
	></menu-manage>

<script>
export default {
  data() {
		return {
			currentId: "categoryId", // 当前节点唯一id名称
			parentId: "parentId", // 父节点id名称
			treeDataArr: [],
			formShow: false,
			cascaderOptions: {
				label: "categoryName",
				value: "categoryId",
			},
			treeProps: {
				children: "children",
				label: "categoryName",
			},
			formData: [
				{
					label: "父级类目", // 字段不传，不渲染元素, 做数据提交用
					prop: "parentId",
					elItem: "cascader", // 字段不传，默认input，目前支持input textarea, cascader, switch
					placeholder: "请选择-新增一级不需要选择父级菜单", // 字段不传，默认请输入
					defaultValue: "", // 字段不传，默认值为空
					rules: false, // 字段不传，默认非空判断， false-不做判断， {},其他判断规则
				},
				{
					label: "类目名称",
					prop: "categoryName",
					placeholder: "请输入类目名称",
				},
				{ label: "介绍", prop: "remark", rules: false },
				{ label: "顺序", prop: "priority" },
			],
		}
	},
  created(){
    // 获取树形结构数据
    getData().then(res => {
      
    })
  },
  methods: {
    /**
		 * 点击提交按钮后，获取form表单数据，书写提交接口
		 * @param {form表单数据} data
		 * @param {模式：add-新增，edit-编辑} type
		 */
    addEditFormData(data, type) {
			
		},
    /**
		 * 删除当前节点方法
		 * @param {所选树节点的id，获取的是传入的currentId,唯一id} id
		 */
		deleteTreeData(id) {
			
		},
  },
}
</script>

```

## Props

| Props     | type   | description         |
| --------- | ------ | ------------------- |
| parentId  | string  | Parent node ID name |
| currentId | string  | current node ID name |
| formData | Array  | form field, Currently, input textarea, cascade and switch are supported  |
| treeDataArr | Array  | left tree data |
| treeProps | Object  | left tree  props |
| cascaderOptions | Object  | cascader Options label and value name, Parent category echo in the form |

## Methods

| method name          | params | description       |
| -------------------- | ------ | ----------------- |
| addEditFormData | data ,type   | return form data ,type  |
| deleteTreeData  | id   | return delete id |

## Keywords
vue tree menuManagement categoryManagement menu-manage vue-tree-menu-manage elementui vue-components
