<template>
  <el-aside width="200px" id="nav-wrap">
    <el-menu
      default-active="/index"
      class="el-menu-vertical"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="(item, index) in routes">
        <el-submenu :index="item.path" :key="index" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
            <!-- <i :class="item.meta.icon"></i> -->
            <span>{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item
            :index="submenu.path"
            v-for="(submenu, indey) in item.children"
            :key="indey"
            >{{ submenu.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root, refs }) {
    /* 
    数据部分
     */
    const routes = reactive(root.$router.options.routes);

    /* 
    函数部分
    */
    const handleOpen = (key, keyPath) => {
      // console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      // console.log(key, keyPath);
    };

    /* 
    生命周期部分
    */
    /* 
    抛出数据
    */
    return {
      //ref数据
      //reactive数据
      routes,
      //方法
      handleOpen,
      handleClose
    };
  }
};
</script>

<style lang="scss" scoped>
#nav-wrap {
  height: 100vh;
  background-color: #344a5f;
  .el-menu-vertical {
    border: none;
  }
}
</style>
