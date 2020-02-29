<template>
  <el-aside :width="navWidth(64)" id="nav-wrap" :class="{ close: isCollapse }">
    <img src="@/assets/logo.png" alt="vue" class="logo" :width="logoWidth">
    <el-menu 
    default-active="/index" 
    class="el-menu-vertical" 
    background-color="transparent" 
    text-color="#fff" 
    active-text-color="#fff" 
    :collapse="isCollapse" 
    :router="true">
      <template v-for="(item, index) in routes">
        <el-submenu :index="item.path" :key="index" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon 
            :iconClass="item.meta.icon" 
            :className="item.meta.icon" 
            class="svg" />
            <span>{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item 
          :index="submenu.path" 
          v-for="(submenu, indey) in item.children" 
          :key="indey"
          >{{ submenu.meta.name }}</el-menu-item>
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
    const logoWidth = ref("75px")
    const routes = reactive(root.$router.options.routes);
    /* 
    函数部分
    */
    // computed监听state.isCollapse的变化
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse;
    });
    const navWidth = (width) => {
      if (root.$store.state.app.isCollapse) {
        logoWidth.value = "40px"
        return width + "px"
      } else {
        logoWidth.value = "75px"
        return "200px"
      }
    }
    /* 
    生命周期部分
    */
    /* 
    抛出数据
    */
    return {
      //ref数据
      logoWidth,
      //reactive数据
      routes,
      //方法
      isCollapse,
      navWidth
    };
  }
};
</script>

<style lang="scss" scoped>
#nav-wrap {
  height: 100vh;
  background-color: #344a5f;
  transition: all 1s ease;
  .el-menu-vertical {
    border: none;
  }
}
.logo {
  display: block;
  margin: 15px auto;
  transition: all 1s ease;
}
.svg {
  padding-right: 0.5em;
}
</style>
