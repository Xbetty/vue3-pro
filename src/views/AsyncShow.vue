<template>
  <div class="about">
    <h1>{{retult}}</h1>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  setup() {
    return new Promise((resolve)=>{
      setTimeout(() => {
        return resolve({
          retult: 42
        })
      }, 3000);
    })
  }
})
</script>
