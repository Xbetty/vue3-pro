import { ref, onMounted, onUnmounted } from 'vue'
function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  console.log('222',x,y)
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
  return { x, y }
}
export default useMousePosition