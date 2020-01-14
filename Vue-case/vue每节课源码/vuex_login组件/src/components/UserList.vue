<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户列表</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="_id" label="用户ID">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="password" label="用户密码" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import {mapState,mapActions} from 'vuex'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    created() {
      //触发 actions的getUsers函数
      this.getUsers().then(()=>{ //当state的数据保存好之后触发回调函数
        this.tableData = this.userList
      })
    },
    methods: {
      // ...mapActions({
      //   get:'getUsers'
      // }),
      ...mapActions(['getUsers']),
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    computed:{
      ...mapState({
        userList:state=>state.userList
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>