<template>
    <h1 class="title">
      {{title}}
    </h1>
</template>

<script>
    export default {
      props:['title'],
        data() {
            return {}
        }
    }
</script>

<style scoped>
  h1{
    width:1200px;
    color: #2ad487;
    line-height: 80px;
    border-bottom: 3px solid #2ad487;
    background-color: #222;
    text-indent: 20px;
    margin: 0 auto 20px;
  }
</style>
