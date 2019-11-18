<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>标题</span>
  </div>
   <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="380">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
       <el-table-column
        label="评论状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onStatusChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template>
            <el-button type="primary" size="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="allPage"
  @current-change="onPageChange">
</el-pagination>
</el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      allPage: 0
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles (page) {
      this.$axios({
        url: '/articles',
        method: 'GET',
        params: {
          response_type: 'comment',
          page

        }
      }).then(res => {
        console.log(res)
        this.articles = res.data.data.results
        this.allPage = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取失败')
      })
    },
    onStatusChange (article) {
      console.log(article)
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        console.log(res)

        this.$message({
          message: `${article.comment_status ? '开启' : '关闭'}成功`,
          type: 'success'
        })
      }).catch(err => {
        console.log(err, '请求失败')
      })
    },
    onPageChange (page) {
      this.loadArticles(page)
    }
  }
}
</script>

<style>

</style>
