<template>
  <div class="app-header">
      <!-- 左侧面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧用户信息展示 -->
    <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="30"
          :src="userInfo.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
          ></el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/user'

export default {
  name: 'AppHeader',
  created () {
    this.loadUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 加载用户信息功能
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
      console.log(this.userInfo)
    },
    // 退出登录
    logout () {
      this.$confirm('确定退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1. 清除 store 中的用户的信息
        this.$store.commit('setUser', null)
        // 2. 跳转登录页
        this.$router.push('/login')
        console.log('退出')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
    .app-header {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
</style>
