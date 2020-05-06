<template>
   <div class="">
      <demand-head></demand-head>
		<demand-video></demand-video>
		<demand-foot></demand-foot>
   </div>
</template>

<script>
import DemandHead from './base/DemandHead.vue'
import DemandVideo from './base/DemandVideo.vue'
import DemandFoot from './base/DemandFoot.vue'

export default {
   name: "Video",
   data(){
      return  {
         
      }
   },
   components: {
      DemandHead,
      DemandVideo,
      DemandFoot,
   }
}
</script>

<style scoped>

</style>