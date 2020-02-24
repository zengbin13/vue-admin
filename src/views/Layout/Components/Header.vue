<template>
  <el-header height="75px" id="header-wrap">
    <div class="pull-left header-left" @click="toggleMenu(50)">
      <svg-icon iconClass="menu" className="menu" class="menu"></svg-icon>
    </div>
    <div class="pull-right header-right">
      <div class="user-info">
        <img src="@/assets/avatar.jpeg" alt="avatar" class="avatar">
        <span>管理员</span>
      </div>
      <div class="powerBox">
        <svg-icon iconClass="power" className="power"></svg-icon>
      </div>
    </div>
  </el-header>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "",
  setup(props, { root }) {
    /* 数据 */
    /* 方法 */
    const toggleMenu = (width) => {   
      root.$store.commit("SET_COLLAPSE");
      root.$store.commit("SET_NAVWIDTH", {width});
    };
    return {
      toggleMenu
    };
  }
};
</script>

<style lang="scss" scoped>
#header-wrap {
  box-shadow: 0 3px 16px 0px rgba(0, 0, 0, 0.1);
  z-index: 30;
  line-height: 75px;
  padding: 0;
}
.header-left {
  height: 75px;
  padding-left: 1em;
  .menu {
    padding-left: 1em;
    cursor: pointer;
  }
}
.header-right {
  height: 75px;
  display: flex;
  justify-content: end;
  .user-info {
    span {
      padding: 0 20px 0 10px;
    }
    .avatar {
      width: 2.2em;
      height: 2.2em;
      border-radius: 50%;
      vertical-align: -0.7em;
    }
  }
  .powerBox {
    width: 75px;
    height: 75px;
    border-left: 1px solid #ededed;
    box-sizing: border-box;
    cursor: pointer;
    .power {
      padding: 0 21px;
      cursor: pointer;
    }
  }
}
</style>
