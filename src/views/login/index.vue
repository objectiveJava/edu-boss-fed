<template>
  <div class="login">
    <!-- Form 组件 -->
    <el-form ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position='top'
    >
      <el-form-item label="手机号"
        prop='phone'
      >
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码"
        prop='password'
      >
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/services/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      // 存储表单数据
      form: {
        phone: '18201288771',
        password: '111111'
      },
      // 设置表单校验规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为6到18位', trigger: 'blur' }
        ]
      },
      // 保存加载状态
      isLoginLoading: false
    }
  },
  methods: {
    // 登录功能
    async onSubmit () {
      try {
        // 1.设置校验
        await this.$refs.form.validate()
        // 2.发送请求
        this.isLoginLoading = true
        /* const { data } = await request({
          method: 'POST',
          url: '/front/user/login',
          // urlencoded 格式 名=值&名=值
          data: qs.stringify(this.form)
        }) */
        const { data } = await login(this.form)
        this.isLoginLoading = false
        // 3.响应处理
        if (data.state === 1) {
          this.$message.success('登陆成功')
          // 将用户信息存储到 Vuex 中
          this.$store.commit('setUser', data.content)
          // 根据可能存储的redirect数据进行跳转设置
          this.$router.push(this.$route.query.redirect || '/')
          console.log(this.$route.query.redirect)
        } else {
          this.$message.error('登录失败')
        }
      } catch (error) {
        // 设置失败后的提示
        console.log('没有验证通过')
      }
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
