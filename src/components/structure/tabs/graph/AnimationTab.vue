<template>
  <div class="max-w-3xl space-y-8">
    <!-- Algorithm selector -->
    <div class="flex gap-2">
      <button
        v-for="algo in algorithms"
        :key="algo.id"
        @click="activeAlgo = algo.id"
        :disabled="isAnimating"
        class="font-mono text-sm px-4 py-2 border transition-colors disabled:opacity-40"
        :class="
          activeAlgo === algo.id
            ? 'border-violet-400 text-violet-400 bg-violet-400/10'
            : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
        "
      >
        {{ algo.label }}
      </button>
    </div>

    <!-- Graph visual -->
    <div class="bg-zinc-900 border border-zinc-800 p-6">
      <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
        {{ activeAlgo === 'bfs' ? 'BFS — explora nível a nível' : 'DFS — explora o mais fundo possível' }}
      </p>

      <svg viewBox="0 0 500 280" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr-g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#3f3f5a" />
          </marker>
        </defs>

        <!-- Edges -->
        <line
          v-for="edge in graphEdges"
          :key="`${edge.from}-${edge.to}`"
          :x1="getVertex(edge.from).x"
          :y1="getVertex(edge.from).y"
          :x2="getVertex(edge.to).x"
          :y2="getVertex(edge.to).y"
          :stroke="getEdgeColor(edge)"
          stroke-width="1.5"
          class="transition-all duration-300"
        />

        <!-- Vertices -->
        <g v-for="vertex in graphVertices" :key="vertex.id">
          <circle
            :cx="vertex.x"
            :cy="vertex.y"
            r="24"
            :fill="getVertexFill(vertex.id)"
            :stroke="getVertexStroke(vertex.id)"
            stroke-width="1.5"
            class="transition-all duration-300"
          />
          <text
            :x="vertex.x"
            :y="vertex.y"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#e8e8f0"
            font-family="JetBrains Mono, monospace"
            font-size="14"
            font-weight="500"
          >
            {{ vertex.label }}
          </text>
          <!-- Visit order -->
          <text
            v-if="visitOrder[vertex.id] !== undefined"
            :x="vertex.x + 18"
            :y="vertex.y - 18"
            fill="#7c6dfa"
            font-family="JetBrains Mono, monospace"
            font-size="11"
          >
            {{ visitOrder[vertex.id] }}
          </text>
        </g>
      </svg>

      <!-- Queue/Stack state -->
      <div class="mt-4 flex items-center gap-3">
        <span class="font-mono text-xs text-zinc-600 uppercase tracking-widest shrink-0">
          {{ activeAlgo === 'bfs' ? 'queue:' : 'stack:' }}
        </span>
        <div class="flex gap-1 flex-wrap">
          <span
            v-for="(item, i) in structureState"
            :key="i"
            class="font-mono text-xs px-2 py-1 border border-violet-500/40 text-violet-400"
            >{{ item }}</span
          >
          <span v-if="structureState.length === 0" class="font-mono text-xs text-zinc-700">vazia</span>
        </div>
      </div>

      <!-- Visited -->
      <div class="mt-2 flex items-center gap-3">
        <span class="font-mono text-xs text-zinc-600 uppercase tracking-widest shrink-0">visitado:</span>
        <div class="flex gap-1 flex-wrap">
          <span
            v-for="(item, i) in visitedOrder"
            :key="i"
            class="font-mono text-xs px-2 py-1 border border-emerald-500/40 text-emerald-400"
            >{{ item }}</span
          >
        </div>
      </div>

      <!-- Message -->
      <p class="font-mono text-xs mt-3 h-4" :class="messageColor">{{ message }}</p>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Start node -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Nó inicial</p>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="v in graphVertices"
            :key="v.id"
            @click="startNode = v.id"
            :disabled="isAnimating"
            class="font-mono text-sm px-3 py-1.5 border transition-colors disabled:opacity-40"
            :class="
              startNode === v.id
                ? 'border-violet-400 text-violet-400 bg-violet-400/10'
                : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
            "
          >
            {{ v.label }}
          </button>
        </div>
      </div>

      <!-- Run -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Executar</p>
        <button
          @click="runAlgorithm"
          :disabled="isAnimating"
          class="w-full px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors"
        >
          ▶ {{ activeAlgo.toUpperCase() }} desde {{ getVertex(startNode).label }}
        </button>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex gap-6 flex-wrap">
      <span class="flex items-center gap-2 font-mono text-xs text-zinc-500">
        <span class="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600 inline-block"></span>
        não visitado
      </span>
      <span class="flex items-center gap-2 font-mono text-xs text-zinc-500">
        <span class="w-3 h-3 rounded-full bg-violet-500/20 border border-violet-500/50 inline-block"></span>
        a visitar
      </span>
      <span class="flex items-center gap-2 font-mono text-xs text-zinc-500">
        <span class="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 inline-block"></span>
        visitado
      </span>
    </div>

    <!-- Reset -->
    <button
      @click="reset"
      :disabled="isAnimating"
      class="font-mono text-sm text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-4 py-2 transition-colors disabled:opacity-40"
    >
      ↺ Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Vertex = { id: string; label: string; x: number; y: number }
type Edge = { from: string; to: string }

const graphVertices: Vertex[] = [
  { id: 'A', label: 'A', x: 250, y: 40 },
  { id: 'B', label: 'B', x: 100, y: 120 },
  { id: 'C', label: 'C', x: 400, y: 120 },
  { id: 'D', label: 'D', x: 60, y: 230 },
  { id: 'E', label: 'E', x: 200, y: 230 },
  { id: 'F', label: 'F', x: 340, y: 230 },
  { id: 'G', label: 'G', x: 450, y: 230 },
]

const graphEdges: Edge[] = [
  { from: 'A', to: 'B' },
  { from: 'A', to: 'C' },
  { from: 'B', to: 'D' },
  { from: 'B', to: 'E' },
  { from: 'C', to: 'F' },
  { from: 'C', to: 'G' },
  { from: 'E', to: 'F' },
]

// Adjacency list
const adjacency: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F', 'G'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
  G: ['C'],
}

const algorithms = [
  { id: 'bfs', label: 'BFS' },
  { id: 'dfs', label: 'DFS' },
]

const activeAlgo = ref('bfs')
const startNode = ref('A')
const isAnimating = ref(false)
const message = ref('Seleciona um algoritmo e clica em executar')
const messageColor = ref('text-zinc-600')
const visiting = ref<string | null>(null)
const visited = ref<Set<string>>(new Set())
const visitOrder = ref<Record<string, number>>({})
const visitedOrder = ref<string[]>([])
const structureState = ref<string[]>([])
const visitedEdges = ref<Set<string>>(new Set())

function getVertex(id: string): Vertex {
  return graphVertices.find((v) => v.id === id) ?? graphVertices[0]!
}

function getVertexFill(id: string) {
  if (visiting.value === id) return '#1e1b4b'
  if (visited.value.has(id)) return '#0d2b1e'
  return '#18181f'
}

function getVertexStroke(id: string) {
  if (visiting.value === id) return '#7c6dfa'
  if (visited.value.has(id)) return '#3de0c0'
  return '#3f3f5a'
}

function getEdgeColor(edge: Edge) {
  const key1 = `${edge.from}-${edge.to}`
  const key2 = `${edge.to}-${edge.from}`
  if (visitedEdges.value.has(key1) || visitedEdges.value.has(key2)) return '#7c6dfa'
  return '#3f3f5a'
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function clearHighlights() {
  visiting.value = null
  visited.value = new Set()
  visitOrder.value = {}
  visitedOrder.value = []
  structureState.value = []
  visitedEdges.value = new Set()
  message.value = ''
}

async function runBFS() {
  const queue: string[] = [startNode.value]
  const seen = new Set<string>([startNode.value])
  let order = 1

  structureState.value = [...queue]

  while (queue.length > 0) {
    const current = queue.shift()!
    structureState.value = [...queue]

    visiting.value = current
    message.value = `a visitar ${current}`
    messageColor.value = 'text-violet-400'
    await sleep(600)

    visited.value = new Set([...visited.value, current])
    visitOrder.value = { ...visitOrder.value, [current]: order++ }
    visitedOrder.value = [...visitedOrder.value, current]
    visiting.value = null

    const neighbors = adjacency[current] ?? []
    for (const neighbor of neighbors) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor)
        queue.push(neighbor)
        visitedEdges.value = new Set([...visitedEdges.value, `${current}-${neighbor}`])
        message.value = `enqueue ${neighbor} (vizinho de ${current})`
        messageColor.value = 'text-amber-400'
        structureState.value = [...queue]
        await sleep(400)
      }
    }
  }

  message.value = `BFS completo: [${visitedOrder.value.join(' → ')}]`
  messageColor.value = 'text-emerald-400'
}

async function runDFS() {
  const stack: string[] = [startNode.value]
  const seen = new Set<string>()
  let order = 1

  structureState.value = [...stack]

  while (stack.length > 0) {
    const current = stack.pop()!
    structureState.value = [...stack]

    if (seen.has(current)) continue
    seen.add(current)

    visiting.value = current
    message.value = `a visitar ${current}`
    messageColor.value = 'text-violet-400'
    await sleep(600)

    visited.value = new Set([...visited.value, current])
    visitOrder.value = { ...visitOrder.value, [current]: order++ }
    visitedOrder.value = [...visitedOrder.value, current]
    visiting.value = null

    const neighbors = [...(adjacency[current] ?? [])].reverse()
    for (const neighbor of neighbors) {
      if (!seen.has(neighbor)) {
        stack.push(neighbor)
        visitedEdges.value = new Set([...visitedEdges.value, `${current}-${neighbor}`])
        message.value = `push ${neighbor} na stack`
        messageColor.value = 'text-amber-400'
        structureState.value = [...stack]
        await sleep(300)
      }
    }
  }

  message.value = `DFS completo: [${visitedOrder.value.join(' → ')}]`
  messageColor.value = 'text-emerald-400'
}

async function runAlgorithm() {
  if (isAnimating.value) return
  isAnimating.value = true
  clearHighlights()

  if (activeAlgo.value === 'bfs') await runBFS()
  else await runDFS()

  isAnimating.value = false
}

function reset() {
  clearHighlights()
  message.value = 'Seleciona um algoritmo e clica em executar'
  messageColor.value = 'text-zinc-600'
}
</script>
