// style1: separate variable (类似refs)
let x = 0
let y = 0

function undateNum() {
  x = 2
  y = 3
}

// === compare to  ===
// style2: single object （类似reactive）
const pos = {
  x: 0,
  y: 0
}

function updateObj() {
  // 必须和对象在一起才能保持引用
  pos.x = 2,
  pos.y = 3
}

// 先取值再更新，（单独使用属性）会丧失响应式，拿到的依然是旧值
const { x } = pos
pos.x = 3

// ref和reactive选择场景
// 1. 原始类型or对象类型
// 2. 所有场景都用reactive，但是记得使用toRefs保证reactive对象的属性保证响应式