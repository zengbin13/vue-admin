<template>
  <div>

    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型:</label>
          <div class="wrap-content">
            <el-select v-model="value" placeholder="请选择" style="width:100%">
              <el-option v-for="item in infoOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期:&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker style="width:100%" v-model="timeValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap key-word">
          <label for="">关键字:&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="selectKey" placeholder="请选择" style="width:100%">
              <el-option v-for="item in keywordOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap input">
          <div class="wrap-content">
            <el-input v-model="inputValue" placeholder="请输入内容" style="width:100%"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="label-wrap button">
          <div class="wrap-content">
            <el-button type="danger" style="width:100%">搜索</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <div class="label-wrap button">
          <div class="wrap-content">
            <el-button type="danger" style="width:100%" @click="dialogFormVisible = true">新增</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%" class="margin-top-35">
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="400">
      </el-table-column>
      <el-table-column prop="category" label="类别" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="user" label="管理人" width="120">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="">
          <el-button size="mini" type="danger" @click="deletaItem()">删除</el-button>
          <el-button size="mini" type="success" @click="dialogFormVisible = true">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <el-row class="margin-top-35">
      <el-col :span="12">
        <el-button size="mini" @click="deletaItem('all')">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination background layout="prev, pager, next, jumper" :total="100" class="pull-right">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- dialog 新增 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="新增" width="30%" modal>
      <el-form v-model="addFormData">
        <el-form-item label="类型:" label-width="50px">
          <el-select v-model="addFormData.type" placeholder="请选择">
            <el-option v-for="item in addFormData.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" label-width="50px">
          <el-input placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="概况:" label-width="50px">
          <el-input placeholder="请输入内容" type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="buttonCenter">
            <el-button>取消</el-button>
          <el-button type="danger">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>    
  </div>
</template>

<script>
import { reactive, ref, onMounted, root } from "@vue/composition-api";
export default {
  name: "infoList",
  setup(props, {root}) {
    const infoOptions = reactive([
      {
        value: "选项1",
        label: "国际信息"
      },
      {
        value: "选项2",
        label: "国内信息"
      },
      {
        value: "选项3",
        label: "行业信息"
      }
    ]);
    const keywordOptions = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    const tableData = reactive([
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员"
      },
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员"
      },
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员"
      },
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员"
      }
    ]);

    const addFormData = reactive({
      type: "",
      options: [
        {
          value: "选项1",
          label: "国际信息"
        },
        {
          value: "选项2",
          label: "国内信息"
        },
        {
          value: "选项3",
          label: "行业信息"
        }
      ]
    });

    const value = ref("");
    const timeValue = ref("");
    const selectKey = ref("id");
    const inputValue = ref("");
    const dialogFormVisible = ref(false);

    const deletaItem = (all) => {
      let mark = ""
      all ? mark = "全部" :  mark = "该条"
      root.$confirm( `确定删除${mark}信息`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        root.$message({
          message: "成功删除数据",
          type: "success"
        })
      }).catch(() => {
        root.$message({
          message: "取消删除",
          type: "info"
        })
      })
    }
    return {
      value,
      timeValue,
      selectKey,
      inputValue,
      dialogFormVisible,

      infoOptions,
      keywordOptions,
      tableData,
      addFormData,

      deletaItem
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelWrap(left, 60);
  }
  &.date {
    @include labelWrap(center, 80);
  }
  &.key-word {
    @include labelWrap(center, 80);
  }
  &.input {
    @include labelWrap(right, 0);
  }
  &.button {
    @include labelWrap(right, 0);
    button {
      height: 40px;
      padding: 0;
    }
  }
}
.buttonCenter {
  text-align: center;
}
.el-dialog .el-button {
  width: 120px;
  margin: 0 10px;
}
.el-form-item:last-child {
  margin-bottom: 10px;
}
</style>
