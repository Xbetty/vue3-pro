<template>
  <teleport to='#modal'>
    <div class="modal-wrap" v-if="isOpen">
      <div id="center" >
        <h2><slot>this is a modal</slot></h2>
        <button @click="btnClick">关闭</button>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  props: {
    isOpen: Boolean
  },
  emits: {
    // 'close-modal': (payload: any)=> {
    //   return payload.type === 'close'
    // }
    'close-modal': null
  },
  setup(props, context) {
    // context.emit('close-modal', {
    //   type: 'hello'
    // })
    context.emit('close-modal')
    const btnClick = ()=>{
      context.emit('close-modal')
    }
    return {
      btnClick
    }
  }
})
</script>
<style scoped>
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0,0,0,0.5);
}
#center {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 200px;
  height: 200px;
  position: fixed;
  left: 50%;
  top: 200px;
  background-color: #eee;
}
</style>