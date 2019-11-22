<template>
  <el-form ref="user" :model="user" label-width="80px">
  <el-form-item>
    <!-- 上传文件 -->

    <el-upload
  class="users"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :http-request='onUpload'
  >
  <img :src="user.photo" class="image">
  <div>点击选择上传用户头像</div>
</el-upload>
  </el-form-item>
   <el-form-item label="用户昵称">
    <el-input v-model="user.name"></el-input>
  </el-form-item>
   <el-form-item label="邮箱">
    <el-input v-model="user.email"></el-input>
  </el-form-item>
   <el-form-item label="手机号">
    <el-input disabled="" v-model="user.mobile"></el-input>
  </el-form-item>
   <el-form-item label="个人简介">
    <el-input type="textarea" v-model="user.intro"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">修改保存</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import eventBus from '../../untis/events-bus'
export default {
  name: 'AccountPage',
  data () {
    return {
      user: {
        photo: '',
        name: '',
        intro: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.loadusernews()
  },
  methods: {
    onSubmit () {
      const { name, intro, email } = this.user
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          intro,
          email
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        eventBus.$emit('abc', this.user)
        // this.$router.push('/home')
      }).catch(err => {
        console.log(err)
        this.$message.error('修改失败')
      })
    },
    loadusernews () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        // 更新用户信息成功后通知头部组件，传个参数，让头部组件接收

        // eventBus.$emit('abc', this.user)
        // console.log(res)
        this.user = res.data.data
      }).catch(err => {
        console.log(err, '获取信息失败')
      })
    },
    onUpload (img) {
      // console.log(img)
      const fn = new FormData()
      fn.append('photo', img.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fn
      }).then(res => {
        this.user.photo = res.data.data.photo
        // console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.users{
    text-align: center;
    img{
      width: 100px;
      height: 100px;
    border-radius: 50%
    }
}

</style>
