<template>
  <el-aside :width="asideWidth" id="nav-wrap">
    <img src="@/assets/logo.png" alt="vue" class="logo" width="30px">
    <el-menu 
    default-active="/index" 
    class="el-menu-vertical" 
    background-color="transparent" 
    text-color="#fff" 
    active-text-color="#fff" 
    :collapse="isCollapse" 
    :router="true">
      <template v-for="(item, index) in routes">
        <el-submenu 
        :index="item.path" 
        :key="index" 
        v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon 
            :iconClass="item.meta.icon" 
            :className="item.meta.icon" class="svg" />
            <!-- <i :class="item.meta.icon"></i> -->
            <span>{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item 
          :index="submenu.path" 
          v-for="(submenu, indey) in item.children" 
          :key="indey">{{ submenu.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root, refs }) {
    /* 
    数据部分
     */
    const navWidth = ref("200px");
    const routes = reactive(root.$router.options.routes);
    /* 
    函数部分
    */
    // computed监听state.isCollapse的变化
    const isCollapse = computed(() => {
      return root.$store.state.isCollapse;
    });
    const asideWidth = computed(() => {
      return root.$store.state.navWidth;
    });

    /* 
    生命周期部分
    */
    /* 
    抛出数据
    */
    return {
      //ref数据
      navWidth,
      //reactive数据
      routes,
      //方法
      isCollapse,
      asideWidth
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
.logo {
  width: 75px;
  display: block;
  margin: 15px auto;
}
.svg {
  padding-right: 0.5em;
}
</style>
