<template>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>图片管理</span>
     <!-- <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button> -->
  </div>
   <el-radio-group v-model="type" @change="onFind">
      <el-radio-button label="全部">全部</el-radio-button>
      <el-radio-button label="收藏">收藏</el-radio-button>
    </el-radio-group>

<el-upload
  class="upload-demo"
  style="float: right; padding: 3px 0"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
   :headers="uploadHeaders"
    name="image"
   :on-success="onUploadSuccess"
  :show-file-list="false">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>

 <el-row :gutter="20">
  <el-col :span="6" v-for="item in images" :key="item.id" class="col">
      <el-card :body-style="{ padding: '0px' }">
      <img height="250" :src="item.url" class="image">
      <div style="padding: 14px;" class="icon">
       <i :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" @click="onCollect(item)"></i>
       <i class="el-icon-delete" @click="onDelete(item)"></i>
      </div>
    </el-card>
  </el-col>
</el-row>
</el-card>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  data () {
    return {
      images: [],
      type: '全部',
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  created () {
    this.loadImage()
  },
  methods: {
    loadImage (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect
        }
      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err, '获取失败了')
      })
    },
    onFind (value) {
      // console.log(value)
      this.loadImage(value !== '全部')
    },
    onCollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        item.is_collected = !item.is_collected
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    },
    onDelete (item) {
      this.$axios({
        method: 'DELETE',
        url: `/user/images/${item.id}`
      }).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.loadImage(this.type !== '全部')
      }).catch(err => {
        console.log(err)
        this.$message.error('删除失败')
      })
    },
    onUploadSuccess () {
      // 刷新图片列表
      this.loadImage(this.type !== '全部')
    }
  }
}
</script>

<style lang="less" scoped>
.col{
  margin-bottom: 20px;
  .icon{
    display: flex;
    // justify-content: center;
    justify-content: space-around;
    font-size: 24px;
  }
}
</style>
