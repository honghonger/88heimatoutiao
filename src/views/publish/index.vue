<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>发布文章</span>
  </div>
  <el-form ref="form" :model="article" label-width="80px">
  <el-form-item label="标题">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
   <el-form-item label="内容">
   <!-- bidirectional data binding（双向数据绑定） -->
  <quill-editor v-model="article.content"
                ref="myQuillEditor"
                :options="editorOption">
                <!-- @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)" -->
  </quill-editor>
  <!-- Or manually control the data synchronization（或手动控制数据流） -->
  <!-- <quill-editor :content="content"
                :options="editorOption"
                @change="onEditorChange($event)">
  </quill-editor> -->
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="article.channel_id" placeholder="请选择活动区域">
      <!-- <el-option label="所有频道" :value="null"></el-option> -->
      <el-option v-for="channel in channels" :key="channel.id" :label="channel.name" :value="channel.id"></el-option>
    </el-select>
  </el-form-item>
  <!-- <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item> -->
  <el-form-item>
    <el-button type="primary" @click="onSubmit(false)">发表</el-button>
    <el-button @click="onSubmit(true)">存入草稿</el-button>
  </el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片，无图就是空数组即可
        },
        channel_id: ''
      },
      channels: [],
      editorOption: {}
    }
  },
  created () {
    this.loadchannels()
  },
  methods: {
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}` },
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err, '获取失败')
      })
    },
    loadchannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '请求失败')
      })
    }
  }
}
</script>

<style>

</style>
