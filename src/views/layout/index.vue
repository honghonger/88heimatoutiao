<template>
<!-- 先定义一个大容器 -->
  <el-container>
    <!-- 先放置一个左侧 -->
    <el-aside class="left" style="width:220px">
      <div class="menu-title" style="background-color:#2e2f32">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <el-menu router style="width:221px" active-text-color=" #ffd04b" background-color="#353b4c" text-color="#adafb5">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title">内容管理</template>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="image">素材管理</el-menu-item>
        </el-submenu>
 <el-submenu index="2">
          <template slot="title">粉丝管理</template>
          <el-menu-item index="/fans">图文数据</el-menu-item>
          <el-menu-item>粉丝概况</el-menu-item>
          <el-menu-item>粉丝画像</el-menu-item>
          <el-menu-item>粉丝列表</el-menu-item>
        </el-submenu>

        <el-menu-item index="/users">账户信息</el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container class="mine">
      <!-- 头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 中部区域 -->
      <el-main>
        <!-- 二级路由容器 -->
         <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from '../../components/layout-header.vue'
export default {
  // name: '/home',
  components: {
    'layout-header': layoutHeader
  }
}
</script>
<style lang='less' scoped>
.left {
  position: fixed;
  width:220px;
  height: 100vh;
  background-color:#353b4e;
  overflow:hidden;
  .menu-title {
  padding: 15px 0;
  text-align: center;
  img {
    height:30px;
  }
 }
}
.mine{
  margin-left: 220px;
}
</style>
