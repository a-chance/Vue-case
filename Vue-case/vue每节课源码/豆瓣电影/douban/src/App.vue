<template>
  <div id="app">
    <home-title :title="title" v-if='show'></home-title>
    <!--<home-content></home-content>-->
    <router-view></router-view>
  </div>
</template>

<script>
  //导入  HomeTitle组件  @表示src所在的目录
  import HomeTitle from '@/components/HomeTitle'

export default {

  data(){
    return {
      title:'',
      show:true
    }
  },
  components:{
    HomeTitle,
  },
  async created(){
    let {data:{title}} = await this.$axios.get('/api/v2/movie/top250?count=20&&start=0')
    this.title = title
  }

}
</script>

<style>
  *{
    margin: 0;
    padding:0;
  }
  body{
    background: #222;
  }
</style>
