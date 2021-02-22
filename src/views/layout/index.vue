<template>
  <el-container>
    <el-aside width="200px">
      <!-- 侧边栏组件 -->
      <app-aside></app-aside>
    </el-aside>
        <el-container>
            <el-header>
              <app-header></app-header>
            </el-header>
            <el-main>
              <!-- 设置子路由出口 -->
              <router-view></router-view>
            </el-main>
        </el-container>
  </el-container>
</template>

<script>
// 引入侧边栏
import AppAside from './components/AppAside'

// 引入头部组件
import AppHeader from './components/AppHeader'

export default {
  name: 'Layout',
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100vh;
    min-width: 980px;
  }

  .el-aside {
    background-color: #d3dce6;
  }

  .el-header {
    background-color: white;
  }

  .el-main {
    background-color: #e9eef3;
  }
</style>
