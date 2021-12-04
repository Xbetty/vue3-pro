<template>
  <div class="home">
    <Suspense>
      <template #default><AsyncShow/></template>
      <template #fallback><h1>loading...</h1></template>
    </Suspense>
    <!-- 弹窗 -->
    <button @click="openModal">打开弹窗</button>
    <Modal :isOpen="modalIsOpen" @close-modal="closeModal"></Modal>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <h1>{{count}}</h1>
    <h2>{{double}}</h2>
    <ul>
      <li v-for="number in numbers" :key="number">
        {{number}}
      </li>
    </ul>
    <h1>{{person.name}}</h1>
    <button @click="increse">+1</button>
    <h1 @click="updateGreeting">{{greetings}}</h1>
    <h1>x: {{x}}, y: {{y}}</h1>
    <h2 v-if="loading">loading...</h2>
    <img v-if="loaded" :src="result.message">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, computed, reactive, toRefs, onMounted, onUpdated, onRenderTriggered, watch, onUnmounted } from 'vue'
import useURLLoader from '../hooks/useURLLoaders'
import Modal from './Modal.vue'
import AsyncShow from './AsyncShow.vue'
// import useMousePosition from '../hooks/useMousePosition'
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
interface DataProps {
  count: number;
  double: number;
  increse: ()=> void;
  numbers: number[];
  person: { name?: string }
}
interface DogResult {
  message: string;
  status: string
}

export default defineComponent({
  name: 'Home',
  components: {
    Modal,
    AsyncShow
  },
  setup(){
    // const count = ref(0)
    // const double = computed(()=>{
    //   return count.value * 2
    // })
    // const increse = ()=>{
    //   count.value++
    // }
    // onMounted(()=>{
    //   console.log('onMounted')
    // })
    // onUpdated(()=>{
    //   console.log('onUpdated')
    // })
    // 调试作用，观察数据的变化
    onRenderTriggered((event)=>{
      console.log('event', event)
    })
    // 生成响应式对象
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increse: ()=> data.count++,
      numbers: [0, 1, 2],
      person: {}
    })

    // console.log('useMousePosition',useMousePosition)
    // const { x, y } = useMousePosition
    
    const {result,loading,loaded,error} =useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
    watch(result, ()=>{
      if(result.value){
        // message上面没有null类型，所以需要给result.value引入完美的类型，即运行时才获得某种类型。因为是函数所以可以使用泛型
        console.log('value',result.value?.message)
      }
    })

    const greetings = ref('title')
    const updateGreeting = () => {
      greetings.value = 'hello'
    }
    // watch(greetings, (newVal, oldVal)=>{
    //   console.log('newVal, oldVal',newVal, oldVal)
    //   document.title = 'updated' + greetings.value
    // })
    // watch多个值，第一个参数可接收数组，newVal和oldVal都变成了数组
    // watch([greetings, data], (newVal, oldVal)=>{
    //   // data的值是proxy
    //   console.log('newVal', newVal, 'oldVal', oldVal)
    //   console.log('greetings',greetings)
    //   console.log('data',data)
    //   document.title = 'updated' + greetings.value
    // })
    // 不监听data的所有对象，只监听单个属性，不可以用data.count，会失去响应式，要用回调函数取
    watch([greetings, ()=> data.count], (newVal, oldVal)=>{
      // data的值是proxy
      console.log('newVal', newVal, 'oldVal', oldVal)
      console.log('greetings',greetings)
      console.log('data',data)
      document.title = 'updated' + greetings.value
    })
    // vue3能响应式更改数组和对象，使$set成为过去时
    data.numbers[0] = 3
    data.person.name="xxx"
    
    // 追踪鼠标 (抽离出来)
    const x = ref(0)
    const y = ref(0)
    const updateMounse = (e: MouseEvent) => {
      x.value = e.pageX
      y.value = e.pageY
    }
    onMounted(() => {
      document.addEventListener('click', updateMounse)
    })
    onUnmounted(()=>{
      document.removeEventListener('click', updateMounse)
    })


    // toRefs 响应式对象作为参数，返回普通对象，但是这个对象的每一项都变成了ref类型的对象
    const refData = toRefs(data)

    // 测试modal
    const modalIsOpen = ref(false)
    const openModal = ()=>{
      modalIsOpen.value = true
    }
    const closeModal = ()=>{
      modalIsOpen.value = false
    }

    // return {
    //   count,
    //   double,
    //   increse
    // }
    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      error,
      modalIsOpen,
      openModal,
      closeModal
      // 响应式类型在模版中才是响应式的，这里的响应式是ref类型，把值从响应式中取出来就失去了响应式的魔力，变成普通的js类型
      // ...data
    }
  }
});
</script>
