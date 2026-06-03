<template>
  <div class="max-w-3xl space-y-8">

    <!-- Heap type selector -->
    <div class="flex gap-2">
      <button v-for="type in heapTypes" :key="type.id" @click="switchHeapType(type.id)" :disabled="isAnimating"
        class="font-mono text-sm px-4 py-2 border transition-colors disabled:opacity-40" :class="heapType === type.id
          ? 'border-violet-400 text-violet-400 bg-violet-400/10'
          : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'">
        {{ type.label }}
      </button>
    </div>

    <!-- Heap visual -->
    <div class="bg-zinc-900 border border-zinc-800 p-6">
      <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
        {{ heapType === 'max' ? 'Max Heap' : 'Min Heap' }} — raiz é sempre o {{ heapType === 'max' ? 'máximo' : 'mínimo'
        }}
      </p>

      <!-- Tree visualization -->
      <svg viewBox="0 0 500 200" class="w-full mb-4" xmlns="http://www.w3.org/2000/svg">
        <!-- Edges -->
        <template v-for="edge in treeEdges" :key="`${edge.from}-${edge.to}`">
          <line :x1="getPos(edge.from).x" :y1="getPos(edge.from).y" :x2="getPos(edge.to).x" :y2="getPos(edge.to).y"
            stroke="#3f3f5a" stroke-width="1.5" />
        </template>

        <!-- Nodes -->
        <g v-for="(val, i) in heap" :key="i">
          <circle :cx="getPos(i).x" :cy="getPos(i).y" r="20" :fill="getNodeFill(i)" :stroke="getNodeStroke(i)"
            stroke-width="1.5" class="transition-all duration-300" />
          <text :x="getPos(i).x" :y="getPos(i).y" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
            font-family="JetBrains Mono, monospace" font-size="13" font-weight="500">{{ val }}</text>
        </g>
      </svg>

      <!-- Array view -->
      <div class="flex gap-px mb-3">
        <div v-for="(val, i) in heap" :key="i"
          class="flex-1 flex flex-col items-center border py-2 transition-all duration-300" :class="getArrayClass(i)">
          <span class="font-mono text-sm">{{ val }}</span>
          <span class="font-mono text-xs text-zinc-600 mt-1">{{ i }}</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex gap-6 pt-3 border-t border-zinc-800">
        <div class="flex gap-2 font-mono text-sm">
          <span class="text-zinc-500">{{ heapType === 'max' ? 'máximo' : 'mínimo' }}:</span>
          <span class="text-violet-400">{{ heap[0] ?? 'null' }}</span>
        </div>
        <div class="flex gap-2 font-mono text-sm">
          <span class="text-zinc-500">tamanho:</span>
          <span class="text-zinc-100">{{ heap.length }}</span>
        </div>
      </div>

      <!-- Message -->
      <p class="font-mono text-xs mt-3 h-4" :class="messageColor">{{ message }}</p>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-2 gap-4">

      <!-- Push -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">push — O(log n)</p>
        <div class="flex gap-2">
          <input v-model="pushValue" type="number" placeholder="valor"
            class="flex-1 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
            @keyup.enter="push" />
          <button @click="push" :disabled="isAnimating"
            class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
        </div>
      </div>

      <!-- Pop -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">pop — O(log n)</p>
        <button @click="pop" :disabled="isAnimating || heap.length === 0"
          class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
          pop() → remove {{ heapType === 'max' ? 'máximo' : 'mínimo' }}
        </button>
      </div>

      <!-- Peek -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">peek — O(1)</p>
        <button @click="peek" :disabled="isAnimating || heap.length === 0"
          class="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
          peek() → ver raiz
        </button>
      </div>

      <!-- Heap Sort -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">heap sort — O(n log n)</p>
        <button @click="heapSort" :disabled="isAnimating || heap.length === 0"
          class="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
          ordenar array
        </button>
      </div>

    </div>

    <!-- Sort result -->
    <div v-if="sortResult.length > 0" class="bg-zinc-900 border border-zinc-800 p-4">
      <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">resultado heap sort</p>
      <div class="flex gap-2 flex-wrap">
        <span v-for="(val, i) in sortResult" :key="i"
          class="font-mono text-sm px-2 py-1 border border-emerald-500/40 text-emerald-400">{{ val }}</span>
      </div>
    </div>

    <!-- Reset -->
    <button @click="reset" :disabled="isAnimating"
      class="font-mono text-sm text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-4 py-2 transition-colors disabled:opacity-40">
      ↺ Reset
    </button>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const heapTypes: { id: 'max' | 'min', label: string }[] = [
  { id: 'max', label: 'Max Heap' },
  { id: 'min', label: 'Min Heap' },
]

const heapType = ref<'max' | 'min'>('max')
const heap = ref<number[]>([100, 19, 36, 17, 3, 25, 1])
const pushValue = ref<number | null>(null)
const sortResult = ref<number[]>([])

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<number[]>([])
const swapping = ref<number[]>([])
const removed = ref<number | null>(null)

// Tree positions for up to 15 nodes
const positions = [
  { x: 250, y: 25 },
  { x: 140, y: 85 }, { x: 360, y: 85 },
  { x: 80, y: 155 }, { x: 200, y: 155 }, { x: 310, y: 155 }, { x: 430, y: 155 },
  { x: 50, y: 190 }, { x: 110, y: 190 }, { x: 170, y: 190 }, { x: 230, y: 190 },
  { x: 280, y: 190 }, { x: 340, y: 190 }, { x: 400, y: 190 }, { x: 460, y: 190 },
]

function getPos(i: number) {
  return positions[i] ?? { x: 250, y: 190 }
}

const treeEdges = computed(() => {
  const edges: { from: number; to: number }[] = []
  for (let i = 1; i < heap.value.length; i++) {
    edges.push({ from: Math.floor((i - 1) / 2), to: i })
  }
  return edges
})

function getNodeFill(i: number) {
  if (removed.value === i) return '#2d1515'
  if (swapping.value.includes(i)) return '#1e1b4b'
  if (highlighted.value.includes(i)) return '#0d2b1e'
  if (i === 0) return '#1e1b4b'
  return '#18181f'
}

function getNodeStroke(i: number) {
  if (removed.value === i) return '#f0545a'
  if (swapping.value.includes(i)) return '#7c6dfa'
  if (highlighted.value.includes(i)) return '#3de0c0'
  if (i === 0) return '#7c6dfa'
  return '#3f3f5a'
}

function getArrayClass(i: number) {
  if (removed.value === i) return 'border-red-500/50 bg-red-500/10 text-red-300'
  if (swapping.value.includes(i)) return 'border-violet-500/50 bg-violet-500/10 text-violet-300'
  if (highlighted.value.includes(i)) return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
  if (i === 0) return 'border-violet-500/30 bg-zinc-800 text-zinc-100'
  return 'border-zinc-700 bg-zinc-800 text-zinc-100'
}

function compare(a: number, b: number): boolean {
  return heapType.value === 'max' ? a > b : a < b
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function clearHighlights() {
  highlighted.value = []
  swapping.value = []
  removed.value = null
  message.value = ''
}

async function bubbleUp(arr: number[], idx: number) {
  let i = idx
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2)
    swapping.value = [i, parent]
    message.value = `bubble up: ${arr[i]} vs pai ${arr[parent]}`
    messageColor.value = 'text-amber-400'
    await sleep(600)

    if (compare(arr[i]!, arr[parent]!)) {
      ;[arr[i], arr[parent]] = [arr[parent]!, arr[i]!]
      heap.value = [...arr]
      i = parent
    } else {
      break
    }
  }
  swapping.value = []
}

async function bubbleDown(arr: number[], idx: number) {
  const n = arr.length
  let i = idx
  while (true) {
    let target = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && compare(arr[left]!, arr[target]!)) target = left
    if (right < n && compare(arr[right]!, arr[target]!)) target = right

    if (target === i) break

    swapping.value = [i, target]
    message.value = `bubble down: ${arr[i]} troca com ${arr[target]}`
    messageColor.value = 'text-amber-400'
    await sleep(600)

      ;[arr[i], arr[target]] = [arr[target]!, arr[i]!]
    heap.value = [...arr]
    i = target
    swapping.value = []
  }
}

async function push() {
  if (pushValue.value === null || isAnimating.value) return
  isAnimating.value = true
  clearHighlights()
  sortResult.value = []

  const val = pushValue.value
  const arr = [...heap.value, val]
  heap.value = arr
  const newIdx = arr.length - 1
  highlighted.value = [newIdx]
  message.value = `inserido ${val} no índice ${newIdx}`
  messageColor.value = 'text-emerald-400'
  await sleep(600)

  await bubbleUp(arr, newIdx)

  highlighted.value = [0]
  message.value = `heap property restaurada — raiz: ${heap.value[0]}`
  messageColor.value = 'text-emerald-400'
  await sleep(1000)
  clearHighlights()
  isAnimating.value = false
  pushValue.value = null
}

async function pop() {
  if (isAnimating.value || heap.value.length === 0) return
  isAnimating.value = true
  clearHighlights()
  sortResult.value = []

  const arr = [...heap.value]
  const root = arr[0]

  removed.value = 0
  message.value = `a remover raiz: ${root}`
  messageColor.value = 'text-red-400'
  await sleep(700)

  // move last to root
  arr[0] = arr[arr.length - 1]!
  arr.pop()
  heap.value = [...arr]
  removed.value = null

  if (arr.length > 0) {
    highlighted.value = [0]
    message.value = `último elemento vai para a raiz — a fazer bubble down...`
    messageColor.value = 'text-amber-400'
    await sleep(600)
    await bubbleDown(arr, 0)
  }

  message.value = `pop() → ${root} removido`
  messageColor.value = 'text-emerald-400'
  await sleep(1000)
  clearHighlights()
  isAnimating.value = false
}

async function peek() {
  if (isAnimating.value || heap.value.length === 0) return
  isAnimating.value = true
  clearHighlights()

  highlighted.value = [0]
  message.value = `peek() → ${heap.value[0]} — O(1), apenas lê a raiz`
  messageColor.value = 'text-amber-400'

  await sleep(1500)
  clearHighlights()
  isAnimating.value = false
}

async function heapSort() {
  if (isAnimating.value || heap.value.length === 0) return
  isAnimating.value = true
  clearHighlights()

  const result: number[] = []
  const arr = [...heap.value]

  message.value = `heap sort: a extrair elementos um a um...`
  messageColor.value = 'text-violet-400'
  await sleep(600)

  while (arr.length > 0) {
    const root = arr[0]!
    result.push(root)

    arr[0] = arr[arr.length - 1]!
    arr.pop()
    heap.value = [...arr]

    if (arr.length > 0) {
      await bubbleDown(arr, 0)
      await sleep(300)
    }
  }

  sortResult.value = heapType.value === 'max' ? result : [...result].reverse()
  message.value = `heap sort concluído!`
  messageColor.value = 'text-emerald-400'
  await sleep(500)
  clearHighlights()
  isAnimating.value = false
}

function switchHeapType(type: 'max' | 'min') {
  if (isAnimating.value) return
  heapType.value = type
  reset()
}

function reset() {
  clearHighlights()
  sortResult.value = []
  heap.value = heapType.value === 'max'
    ? [100, 19, 36, 17, 3, 25, 1]
    : [1, 3, 6, 5, 9, 8, 17]
  message.value = 'Experimenta as operações abaixo'
  messageColor.value = 'text-zinc-600'
}
</script>