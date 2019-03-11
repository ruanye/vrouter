<template>
  <div class="home">
   HOME
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { constants } from 'fs';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  beforeCreate(){
    console.log(this.$router,this.$route)
  }
}
</script>
