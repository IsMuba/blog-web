<template>
  <div class="layout">
    <MyHeader />
    <div class="main">
      <router-view></router-view>
      <ToolBar></ToolBar>
    </div>
    <MyFooter />
  </div>
</template>

<script>
import MyHeader from './MyHeader.vue'
import MyFooter from './MyFooter.vue'
import ToolBar from './ToolBar.vue'

export default {
  components: {
    MyHeader,
    MyFooter,
    ToolBar
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  .main {
    position: relative;
    flex: 1;
  }
}
</style>
