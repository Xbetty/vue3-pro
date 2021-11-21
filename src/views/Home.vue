<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <h1>{{count}}</h1>
    <h2>{{double}}</h2>
    <button @click="increse">+1</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, computed } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup(){
    const count = ref(0)
    const double = computed(()=>{
      return count.value * 2
    })
    const increse = ()=>{
      count.value++
    }
    return {
      count,
      double,
      increse
    }
  }
});
</script>
