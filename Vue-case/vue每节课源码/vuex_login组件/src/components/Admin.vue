<template>
  <div id="admin">
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color:#545c64">
        <el-menu 
        :default-openeds="['1','2']" 
        :router='true'

        default-active="2"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/" class='title'><i class="el-icon-location"></i>vuex练习</el-menu-item>
          <el-submenu index="1">
            <template slot="title" ><i class="el-icon-info"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="userlist">用户列表</el-menu-item>
              <el-menu-item index="olduser">大龄用户</el-menu-item>
              <el-menu-item index="newuser">年轻用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>分类管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 20px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item index="/">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{$store.state.loginUser.username}}</span>
        </el-header>

        <el-main>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(5).fill(item)
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #admin{
    height:100%
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
.el-container{
  height:100%;
}
  .el-aside {
    color: #333;
  }
  .title{
    font-size:20px;
    background: #333!important;
  }
</style>
