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
import { ref, computed, reactive, toRefs } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
interface DataProps {
  count: number;
  double: number;
  increse: ()=> void;
}

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup(){
    // const count = ref(0)
    // const double = computed(()=>{
    //   return count.value * 2
    // })
    // const increse = ()=>{
    //   count.value++
    // }
    // 生成响应式对象
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increse: ()=> data.count++
    })
    // toRefs 响应式对象作为参数，返回普通对象，但是这个对象的每一项都变成了ref类型的对象
    const refData = toRefs(data)
    // return {
    //   count,
    //   double,
    //   increse
    // }
    return {
      ...refData
      // 响应式类型在模版中才是响应式的，这里的响应式是ref类型，把值从响应式中取出来就失去了响应式的魔力，变成普通的js类型
      // ...data
    }
  }
});
</script>
