<template>
  <div>
    <img :src="res&&res.message" width="100"/>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import axios from 'axios'
export default defineComponent({
  async setup() {
    const res  = await axios.get('https://dog.ceo/api/breeds/image/random')
    return {
      res: res.data
    }
  }
})
</script>
