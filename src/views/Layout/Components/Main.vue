<template>
  <el-main id="main-wrap">
    <router-view></router-view>
  </el-main>
</template>

<script>
export default {
  name: ""
};
</script>

<style lang="scss" scoped>
#main-wrap {
  height: calc(100vh - 75px);
  overflow: auto;
  border: 30px solid #f7f7f7;
  border-bottom: 0px solid #f7f7f7;
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
