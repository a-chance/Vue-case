<template>
  <div class="filmslist">
    <ul>
      <!--<li v-for="subject in subjects">-->
        <!--<img :src="subject.images.medium" alt="">-->
        <!--<p>{{subject.original_title}}</p>-->
        <!--<p>-->
          <!--<span v-for="genre in subject.genres">-->
            <!--{{genre}}-->
          <!--</span>-->
        <!--</p>-->
      <!--</li>-->

      <router-link :to="{name:'filmlink',params:{id:subject.id}}" v-for="(subject,index) in subjects" tag="li" :key="index">
        <img :src="subject.images.medium" alt="">
        <p>{{subject.original_title}}</p>
        <p>
          <span v-for="genre in subject.genres">
            {{genre}}
          </span>
        </p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return  {
      subjects:[]
    }
  },
  async created(){
    let {data:{subjects}} = await this.$axios.get('/api/v2/movie/top250?count=20&&start=0')
    this.subjects = subjects
  },
  watch:{
    $route:{
      async handler(){

        //this.$root.$children[0].show = false;
        let {data:{subjects}} = await this.$axios.get('/api/v2/movie/top250?count=20&&start='+this.$route.query.page*20)
        console.log(subjects)
        this.subjects = subjects
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filmslist ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
  }

  .filmslist ul li {
    width:22%;
    margin: 10px auto;
    background: #222;
    cursor:pointer;
  }

  .filmslist ul li img{
    width: 100%;
  }

  .filmslist ul li h4 {
    color: #ccc
  }

  .filmslist ul li p {
    color: #666;
  }

</style>
