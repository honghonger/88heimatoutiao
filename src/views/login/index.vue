<template>
  <div class="login">
    <!-- elementui -->
<el-card class="login-card">
<!-- 卡片内容 -->
<div class="title">
  <img src="../../assets/img/logo_index.png" alt="">
</div>
<el-form style="margin-top:30px">
  <el-form-item>
    <el-input></el-input>
  </el-form-item>
  <el-form-item>
     <el-input style="width:280px"></el-input>
     <el-button style="float:right" plain>发送验证码</el-button>
  </el-form-item>
  <el-form-item>
<el-checkbox>我已阅读并同意用户协议及条款</el-checkbox>
  </el-form-item>
  <el-form-item>
<el-button style="width:100%" type="primary">登录</el-button>
  </el-form-item>
</el-form>
</el-card>

  </div>
</template>

<script>
export default {

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
