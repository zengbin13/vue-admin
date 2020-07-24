<template>
  <div>
    <el-button type="danger" @click="formLevel1()">添加一级分类</el-button>
    <div class="line"></div>
    <el-row :gutter="35">
      <el-col :span="8" class="categoryWrap">
        <div class="category" v-for="level1Item in categoryData.data" :key="level1Item.id">
          <h4 class="title">
            <svg-icon iconClass="plus" className="plus" class="svgIcon"></svg-icon>
            <span>{{level1Item.category_name}}</span>
            <div class="buttonGroup">
              <el-button type="danger" round size="mini" @click="editLevel1({category:level1Item.category_name, id:level1Item.id})">编辑</el-button>
              <el-button type="success" round size="mini" @click="addLevel2({category:level1Item.category_name, id:level1Item.id})">添加子级</el-button>
              <el-button round size="mini" @click="deleteItem({category:level1Item.category_name, id:level1Item.id})">删除</el-button>
            </div>
          </h4>
          <ul v-if="level1Item.children">
            <li v-for=" level2Item in level1Item.children" :key="level2Item.id">
              {{level2Item.category_name}}
              <div class="buttonGroup">
                <el-button type="danger" round size="mini" @click="editLevel2({category:level2Item.category_name, id:level1Item.id, son_id: level2Item.id})">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="15" class="formWrap">
        <h4>分类编辑</h4>
        <el-form :model="form" ref="form" label-width="120px" style="width:400px">
          <el-form-item label="一级分类名称">
            <el-input v-model="form.value1" :disabled="level1DIsabled"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称" v-show="form.isShow">
            <el-input v-model="form.value2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="mini" @click="addFirstCategory()" v-show="add">新增</el-button>
            <el-button type="danger" size="mini" @click="editFn()" v-show="edit">修改</el-button>
            <el-button type="danger" size="mini" @click="level2Fn()" v-show="level2">子级</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  AddFirstCategory,
  AddChildrenCategory,
  GetCategoryAll,
  GetCategory,
  DeleteCategory
} from "../../api/news.js";
import { reactive, ref, onMounted, root } from "@vue/composition-api";
export default {
  name: "",
  setup(props, { root, refs }) {
    const add = ref(true);
    const edit = ref(false);
    const level2 = ref(false);
    const index = ref(0);
    const level1DIsabled = ref(false);
    const categoryData = reactive({
      data: []
    });
    const form = reactive({
      value1: "",
      value2: "",
      isShow: false
    });
    //方法
    //获取数据
    const getCategoryAll = () => {
      GetCategoryAll()
        .then(response => {
          let data = response.data.data;
          categoryData.data = data;
        })
        .catch();
    };
    //新增一级标题
    const addFirstCategory = () => {
      AddFirstCategory({ categoryName: form.value1 }).then(response => {
        getCategoryAll();
        root.$message.success(response.data.message);
        form.value1 = "";
      });
    };
    //新增一级表单
    const formLevel1 = () => {
      level1DIsabled.value = false;
      add.value = true;
      edit.value = false;
      level2.value = false;
      form.isShow = false;
    };
    //获取编辑的一级数据
    const editLevel1 = data => {
      level1DIsabled.value = false;
      form.isShow = false;
      add.value = false;
      level2.value = false;
      edit.value = true;
      form.value1 = data.category;
      findLevel1Index(data);
    };
    //获取一级的索引
    const findLevel1Index = data => {
      categoryData.data.findIndex((element, indey) => {
        if (element.id == data.id) {
          index.value = indey;
        }
      });
    };
    //获取一级数据
    const editFn = () => {
      categoryData.data[index.value].category_name = form.value1;
    };
    //子类表单
    const addLevel2 = data => {
      add.value = false;
      edit.value = false;
      level2.value = true;
      form.isShow = true;
      findLevel1Index(data);
      form.value1 = data.category;
      level1DIsabled.value = true;
    };
    //添加子类2
    const level2Fn = () => {
      let categoryName = form.value2;
      let parentId = categoryData.data[index.value].id;
      let data = {
        categoryName,
        parentId
      };
      AddChildrenCategory(data).then(response => {
        form.value2 = "";
        getCategoryAll();
      });
    };
    //删除一级数据
    const deleteItem = data => {
      root
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          DeleteCategory({ categoryId: data.id }).then(response => {
            root.$message.success(response.data.message);
            getCategoryAll();
          });
        })
        .catch(() => {
          root.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    };
    //子级别函数
    const editLevel2 = data => {
      addLevel2(data);
      console.log(index.value);
    };
    //钩子函数
    onMounted(() => {
      getCategoryAll();
    });
    return {
      add,
      edit,
      level2,
      level1DIsabled,

      categoryData,
      form,

      getCategoryAll,
      addFirstCategory,
      editLevel1,
      formLevel1,
      editFn,
      addLevel2,
      deleteItem,
      level2Fn,
      editLevel2
    };
  }
};
</script>

<style lang="scss" scoped>
.line {
  height: 1px;
  background-color: #e9e9e9;
  margin: 30px auto;
}

.buttonGroup {
  position: absolute;
  top: 0;
  right: 5px;
  display: none;
  font-size: 0;
  .el-button {
    margin-top: 7px;
    font-size: 12px;
  }
}
.category {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 20px;
    bottom: -20px;
    left: 8px;
    border-left: 1px dashed #344a5f;
  }
}
.categoryWrap {
  div:first-child {
    &::before {
      top: 20px;
    }
  }
  div:last-child {
    &::before {
      bottom: 21px;
    }
  }
}
.title {
  height: 44px;
  margin: 0;
  line-height: 44px;
  position: relative;
  .svg-icon {
    color: #000;
    background-color: #fff;
  }
  span {
    display: inline-block;
    margin-left: 5px;
  }
}
ul {
  list-style-type: none;
  line-height: 44px;
  margin: 0;
  li {
    height: 44px;
    position: relative;
    left: -31px;
  }
  li::before {
    content: "";
    display: inline-block;
    width: 30px;
    height: 5px;
    border-bottom: 1px dashed #344a5f;
    position: relative;
    top: -5px;
    margin-right: 10px;
  }
}
.title,
li {
  transition: all 0.5s ease-in-out 0s;
}
.title,
li {
  &:hover {
    background-color: #f3f3f3;
    .buttonGroup {
      display: block;
    }
  }
}
.el-form {
  .el-button {
    margin: 0;
  }
}
</style>
