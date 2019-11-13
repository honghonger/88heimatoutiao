<template>
  <div class="login">
    <!-- elementui -->
<el-card class="login-card">
<!-- 卡片内容 -->
<div class="title">
  <img src="../../assets/img/logo_index.png" alt="">
</div>
<!-- 表单 -->

<el-form ref="formObj" style="margin-top:30px" :model="loginForm" :rules="loginRules">
  <!-- 一个表单域就是一个form-item -->
  <el-form-item prop="mobile">
    <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
  </el-form-item>
  <el-form-item prop="code">
     <el-input v-model="loginForm.code" placeholder="请输入您的验证码" style="width:280px"></el-input>
     <el-button style="float:right" plain>发送验证码</el-button>
  </el-form-item>
  <el-form-item prop="checked">
<el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议及条款</el-checkbox>
  </el-form-item>
  <el-form-item>
<el-button @click="login" style="width:100%" type="primary">登录</el-button>
  </el-form-item>
</el-form>
</el-card>

  </div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        // 校验规则对象
        mobile: [
          {
            required: true,
            message: '请输入您的手机号'
          },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [{ required: true,
          message: '请输入您的验证码' },
        { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        checked: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('您需要勾选用户协议'))
          }
        } }]
        // rule当前的规则
        // value代表当前的值 checked的值
        // callback回调函数
      }
    }
  },
  methods: {
    login () {
      this.$refs.formObj.validate((isok) => {
        if (isok) {
          // 如果成功，调用接口登录
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'post'
          }).then(result => {
            console.log(result.data.data.token)
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '手机号或者验证码错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
background-image: url("../../assets/img/login_bg.jpg");
background-size: cover;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
.login-card{
  width: 440px;
  height: 360px;
  .title{
    text-align: center;
    img{
      height: 45px;
    }
  }
}
}
</style>
