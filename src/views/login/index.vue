<template>
  <div class="login">
    <!-- Form 组件 -->
    <el-form ref="form" :model="form" label-width="80px"
      label-position='top'
    >
      <el-form-item label="手机号"
        prop='phone'
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码"
        prop='password'
      >
        <el-input type="password" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-form {
      background-color: white;
      padding: 20px;
      width: 300px;
      border-radius: 10px;
    }

    .el-button {
      width: 100%;
    }
  }
</style>
