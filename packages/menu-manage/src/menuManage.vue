<template>
  <!-- sxy 菜单管理 类目管理 -->
  <div>
    <el-row class="elRow" :gutter="20">
      <el-col :span="8">
        <div class="elTree">
          <el-input
            v-model="filterText"
            class="mgb2"
            placeholder="输入关键字进行过滤"
          >
          </el-input>
          <el-row>
            <el-button type="text" @click="handleAddRoot()" class="fr">{{
              addRootBtnTitle
            }}</el-button>
          </el-row>
          <el-tree
            ref="menuTree"
            :data="treeDataArr"
            :props="treeProps"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            :default-expand-all="defaultExpand"
            node-key="currentId"
            empty-text="暂无"
            highlight-current
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span class="fr">
                <i
                  class="el-icon-edit"
                  @click="() => handleEditAdd(node, data, 'edit')"
                ></i>
                <i
                  class="el-icon-remove-outline grey mgl1"
                  @click="() => handleRemove(node, data)"
                ></i>
                <i
                  class="el-icon-circle-plus-outline grey mgl1"
                  @click="() => handleEditAdd(node, data, 'add')"
                ></i>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never" v-show="elTreeShow">
          <h3 v-if="currentType == 'add'">{{ addFormTitle }}</h3>
          <h3 v-else>{{ editFormTitle }}</h3>
          <el-form
            ref="elForm"
            :model="formParam"
            label-width="120px"
            :rules="formRules"
          >
            <template v-for="(item, i) in formData">
              <template v-if="item.label">
                <el-form-item
                  v-if="item.elItem == 'textarea'"
                  :label="item.label"
                  :prop="item.prop"
                  :key="i"
                >
                  <el-input
                    v-model="formParam[item.prop]"
                    :placeholder="item.placeholder || '请输入'"
                    type="textarea"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  v-else-if="item.elItem == 'switch'"
                  :label="item.label"
                  :prop="item.prop"
                  :key="i"
                >
                  <el-switch
                    v-model="formParam[item.prop]"
                    :active-color="item.activeColor"
                  ></el-switch>
                </el-form-item>
                <el-form-item
                  v-else-if="item.elItem == 'cascader'"
                  :label="item.label"
                  :prop="item.prop"
                  :key="i"
                >
                  <el-cascader
                    ref="menuCascader"
                    :options="treeDataArr"
                    :props="{ checkStrictly: true }"
                    :placeholder="item.placeholder || '请选择'"
                    v-model="parentIdArr"
                    @change="handleParentSelect"
                    clearable
                    class="width100"
                  ></el-cascader>
                </el-form-item>
                <el-form-item
                  v-else
                  :label="item.label"
                  :prop="item.prop"
                  :key="i"
                >
                  <el-input
                    v-model="formParam[item.prop]"
                    :placeholder="item.placeholder || '请输入'"
                  ></el-input>
                </el-form-item>
              </template>
            </template>
            <slot></slot>
            <el-form-item>
              <el-button type="primary" @click="validateForm()">{{
                submitBtnTitle
              }}</el-button>
              <el-button @click="resetForm('elForm')">清空</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Card,
  Form,
  FormItem,
  Input,
  Switch,
  Button,
  Cascader,
  Tree,
} from "element-ui";
import validator from "@/utils/validator";

export default {
  name: "menuManage",
  props: {
    ...Input.props, //继承elementUI原有的props
    ...Button.props,
    ...Cascader.props,
    ...Switch.props,
    ...Tree.props,
    formData: Array,
    currentId:[String, Number],
    parentId: [String, Number],
    treeDataArr: {
      type: Array,
      default: function() {
        return [];
      },
    },
    formShow: {
      type: Boolean, // 菜单编辑区域显示隐藏
      default: false,
    },
    cascaderOptions: {
      type: Object,
      default: function () {
        return { label: 'permissionName', value: "permissionId", }
      }
    },
    treeProps: {
      type: Object,
      default: function () {
        return { children: 'children', label: "label", }
      }
    },
    addRootBtnTitle: {
      type: String,
      default: "添加一级目录",
    },
    addFormTitle: {
      type: String,
      default: "添加菜单",
    },
    editFormTitle: {
      type: String,
      default: "编辑菜单",
    },
    submitBtnTitle: {
      type: String,
      default: "提交",
    },
    defaultExpand: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let formRawData = this.dealFormData(this.formData);

    return {
      formRawData,
      formParam: Object.assign({}, formRawData.formParam),
      formRules: Object.assign({}, formRawData.formRules),
      currentType: "add",
      filterText: "", // 过滤
      parentIdArr: [], // 父级菜单已选id
      elTreeShow: this.formShow,
    };
  },
  watch: {
    treeDataArr(val) {
      this.recursionCascaderFuncMixin(val, this.cascaderOptions);
    },
    filterText(val) {
      this.$refs.menuTree.filter(val);
    },
  },
  created() {},
  methods: {
    isObjF(data) {
      return Object.prototype.toString.call(data) === "[object Object]";
    },
    dealFormData(arr) {
      let formParam = {};
      let formRules = {};
      arr.forEach((item) => {
        formParam[item.prop] =
          item.defaultValue != "undefined" ? item.defaultValue : "";

        if (typeof item.rules == "undefined") {
          formRules[item.prop] = validator.rulesNotEmpty;
        } else if (this.isObjF(item.rules)) {
          formRules[item.prop] = item.rules;
        } else if (!item.rules) {
          return;
        }
      });

      return {
        formParam,
        formRules,
      };
    },
    validateForm() {
      this.$refs.elForm.validate((valid) => {
        if (valid) {
          this.$emit("addEditFormData", this.formParam, this.currentType);
          this.elTreeShow = false;
        } else {
          return false;
        }
      });
    },
    handleRemove(node, data) {
      this.$emit("deleteTreeData", data[this.currentId]);
    },
    handleParentSelect(arr) {
      // 父级菜单选择赋值
      arr.length != 0
        ? (this.formParam[this.parentId] = arr[arr.length - 1])
        : (this.formParam[this.parentId] = 0);
      this.$refs.menuCascader.dropDownVisible = false;
    },
    handleAddRoot() {
      this.currentType = "add";
      this.elTreeShow = true;
      this.resetForm("elForm");
      this.formParam = Object.assign({}, this.formRawData.formParam);
      this.parentIdArr = [];
      this.formParam[this.parentId] = "";
    },
    handleEditAdd(node, data, type) {
      this.currentType = type;
      this.elTreeShow = true;
      this.parentIdArr = []; // 莫删

      this.$nextTick(() => {
        this.parentIdArr = []; // 莫删

        if (type == "add") {
          this.resetForm("elForm");
          this.formParam[this.parentId] = data[this.currentId];
          this.recursionParentIdFunc(node);
        } else if (type == "edit") {
          this.formParam = { ...data };
          this.formParam[this.parentId] = data[this.parentId];
          this.recursionParentIdFunc(node.parent);
        }
      });
    },
    // 父级菜单回显
    recursionParentIdFunc(node) {
      this.parentIdArr.unshift(node.data[this.currentId]);
      if (
        node.parent &&
        Object.prototype.toString.call(node.parent.data) != "[object Array]"
      ) {
        this.recursionParentIdFunc(node.parent);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /**
     * 递归处理数据-级联菜单使用
     * @param {待处理数据} data
     * @param {取值key} nameMap
     */
    recursionCascaderFuncMixin(data, nameMap) {
      data.forEach((item) => {
        item.label = item[nameMap.label];
        item.value = item[nameMap.value];

        if (item.children) {
          this.recursionCascaderFuncMixin(item.children, nameMap);
        }
      });
    },
    resetForm(elForm) {
      var that = this;
      this.parentIdArr = [];

      if (this.currentType == "add") {
        this.$refs[elForm].resetFields();
      } else {
        // 编辑模式清空
        Object.keys(that.formRawData.formParam).forEach((key) => {
          that.formParam[key] = that.formRawData.formParam[key];
        });
      }
    },
  },
};
</script>

<style>
#app .main-container {
  background: rgba(240, 242, 245);
}

.elRow {
  padding: 20px;
}
</style>

<style scoped>
.fr{
  float: right;
}
.elRow {
  padding: 20px;
}
.elInputWidth2 {
  width: 80%;
}
.elTree {
  min-width: 300px;
  padding: 20px;
  background: #fff;
}

.elTree .custom-tree-node {
  width: 100%;
}

.elCascaderStyle .el-cascader {
  width: 100%;
}
</style>
