<template>
  <div class="max-w-3xl space-y-10">
    <!-- Anatomia da tree -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Anatomia de uma Tree</h2>
      <p class="text-zinc-500 text-sm mb-6">Clica em cada nó para ver a sua informação.</p>

      <svg viewBox="0 0 500 300" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr-tree" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#3f3f5a" />
          </marker>
        </defs>

        <!-- Edges -->
        <line x1="250" y1="55" x2="140" y2="115" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="250" y1="55" x2="360" y2="115" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="140" y1="135" x2="80" y2="195" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="140" y1="135" x2="200" y2="195" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="360" y1="135" x2="310" y2="195" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="360" y1="135" x2="420" y2="195" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="80" y1="215" x2="50" y2="265" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="80" y1="215" x2="110" y2="265" stroke="#3f3f5a" stroke-width="1.5" />

        <!-- Nodes -->
        <g v-for="node in nodes" :key="node.id" @click="selectedNode = node" class="cursor-pointer">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="20"
            :fill="selectedNode?.id === node.id ? '#1e1b4b' : '#18181f'"
            :stroke="
              selectedNode?.id === node.id
                ? '#7c6dfa'
                : node.type === 'root'
                  ? '#3de0c0'
                  : node.type === 'leaf'
                    ? '#f7a541'
                    : '#3f3f5a'
            "
            :stroke-width="selectedNode?.id === node.id ? 2 : 1.5"
          />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="middle"
            :fill="selectedNode?.id === node.id ? '#a78bfa' : '#e8e8f0'"
            font-family="JetBrains Mono, monospace"
            font-size="13"
            font-weight="500"
          >
            {{ node.value }}
          </text>
        </g>

        <!-- Labels -->
        <text x="285" y="35" fill="#3de0c0" font-family="JetBrains Mono, monospace" font-size="10">root</text>
        <text x="435" y="205" fill="#f7a541" font-family="JetBrains Mono, monospace" font-size="10">leaf</text>
        <text x="220" y="205" fill="#f7a541" font-family="JetBrains Mono, monospace" font-size="10">leaf</text>
        <text x="325" y="205" fill="#f7a541" font-family="JetBrains Mono, monospace" font-size="10">leaf</text>
        <text x="10" y="275" fill="#f7a541" font-family="JetBrains Mono, monospace" font-size="10">leaf</text>
        <text x="115" y="275" fill="#f7a541" font-family="JetBrains Mono, monospace" font-size="10">leaf</text>

        <!-- Depth indicators -->
        <text x="10" y="45" fill="#3f3f5a" font-family="JetBrains Mono, monospace" font-size="10">depth 0</text>
        <text x="10" y="130" fill="#3f3f5a" font-family="JetBrains Mono, monospace" font-size="10">depth 1</text>
        <text x="10" y="210" fill="#3f3f5a" font-family="JetBrains Mono, monospace" font-size="10">depth 2</text>
        <text x="10" y="275" fill="#3f3f5a" font-family="JetBrains Mono, monospace" font-size="10">depth 3</text>
      </svg>

      <!-- Node info -->
      <div v-if="selectedNode" class="bg-zinc-900 border border-violet-500/30 p-4 mt-2">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-sm">
          <div>
            <p class="text-zinc-600 text-xs mb-1">valor</p>
            <p class="text-violet-400">{{ selectedNode.value }}</p>
          </div>
          <div>
            <p class="text-zinc-600 text-xs mb-1">tipo</p>
            <p
              :class="
                selectedNode.type === 'root'
                  ? 'text-emerald-400'
                  : selectedNode.type === 'leaf'
                    ? 'text-amber-400'
                    : 'text-zinc-300'
              "
            >
              {{ selectedNode.type }}
            </p>
          </div>
          <div>
            <p class="text-zinc-600 text-xs mb-1">depth</p>
            <p class="text-zinc-300">{{ selectedNode.depth }}</p>
          </div>
          <div>
            <p class="text-zinc-600 text-xs mb-1">filhos</p>
            <p class="text-zinc-300">{{ selectedNode.children }}</p>
          </div>
          <div>
            <p class="text-zinc-600 text-xs mb-1">pai</p>
            <p class="text-zinc-300">{{ selectedNode.parent ?? 'none' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Traversals -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Traversals</h2>
      <p class="text-zinc-500 text-sm mb-4">Seleciona um traversal e vê a ordem em que os nós são visitados.</p>

      <div class="flex gap-2 mb-4 flex-wrap">
        <button
          v-for="t in traversalTypes"
          :key="t.id"
          @click="activeTraversal = t.id"
          class="font-mono text-sm px-4 py-2 border transition-colors"
          :class="
            activeTraversal === t.id
              ? 'border-violet-400 text-violet-400 bg-violet-400/10'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
          "
        >
          {{ t.label }}
        </button>
      </div>

      <!-- Tree with order numbers -->
      <svg viewBox="0 0 500 240" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <!-- Edges -->
        <line x1="250" y1="45" x2="140" y2="105" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="250" y1="45" x2="360" y2="105" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="140" y1="125" x2="80" y2="185" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="140" y1="125" x2="200" y2="185" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="360" y1="125" x2="300" y2="185" stroke="#3f3f5a" stroke-width="1.5" />
        <line x1="360" y1="125" x2="420" y2="185" stroke="#3f3f5a" stroke-width="1.5" />

        <!-- Nodes with traversal order -->
        <g v-for="node in traversalNodes" :key="node.id">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="22"
            fill="#18181f"
            :stroke="getTraversalColor(node.id)"
            stroke-width="1.5"
          />
          <text
            :x="node.x"
            :y="node.y - 4"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#e8e8f0"
            font-family="JetBrains Mono, monospace"
            font-size="13"
            font-weight="500"
          >
            {{ node.value }}
          </text>
          <text
            :x="node.x"
            :y="node.y + 10"
            text-anchor="middle"
            :fill="getTraversalColor(node.id)"
            font-family="JetBrains Mono, monospace"
            font-size="9"
          >
            {{ getTraversalOrder(node.id) }}
          </text>
        </g>
      </svg>

      <!-- Order display -->
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">ordem de visita</p>
        <div class="flex gap-2 flex-wrap">
          <span
            v-for="(val, i) in currentTraversal.order"
            :key="i"
            class="font-mono text-sm px-2 py-1 border"
            :style="{
              borderColor: getTraversalColor(currentTraversal.ids[i] ?? ''),
              color: getTraversalColor(currentTraversal.ids[i] ?? ''),
            }"
          >
            {{ val }}
          </span>
        </div>
        <p class="font-mono text-xs text-zinc-600 mt-3">{{ currentTraversal.desc }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type TreeNode = {
  id: string
  value: number
  x: number
  y: number
  type: 'root' | 'internal' | 'leaf'
  depth: number
  children: number
  parent: number | null
}

const selectedNode = ref<TreeNode | null>(null)

const nodes: TreeNode[] = [
  { id: 'A', value: 1, x: 250, y: 35, type: 'root', depth: 0, children: 2, parent: null },
  { id: 'B', value: 2, x: 140, y: 125, type: 'internal', depth: 1, children: 2, parent: 1 },
  { id: 'C', value: 3, x: 360, y: 125, type: 'internal', depth: 1, children: 2, parent: 1 },
  { id: 'D', value: 4, x: 80, y: 205, type: 'internal', depth: 2, children: 2, parent: 2 },
  { id: 'E', value: 5, x: 200, y: 205, type: 'leaf', depth: 2, children: 0, parent: 2 },
  { id: 'F', value: 6, x: 310, y: 205, type: 'leaf', depth: 2, children: 0, parent: 3 },
  { id: 'G', value: 7, x: 420, y: 205, type: 'leaf', depth: 2, children: 0, parent: 3 },
  { id: 'H', value: 8, x: 50, y: 265, type: 'leaf', depth: 3, children: 0, parent: 4 },
  { id: 'I', value: 9, x: 110, y: 265, type: 'leaf', depth: 3, children: 0, parent: 4 },
]

const traversalNodes = [
  { id: 'A', value: 1, x: 250, y: 35 },
  { id: 'B', value: 2, x: 140, y: 115 },
  { id: 'C', value: 3, x: 360, y: 115 },
  { id: 'D', value: 4, x: 80, y: 195 },
  { id: 'E', value: 5, x: 200, y: 195 },
  { id: 'F', value: 6, x: 300, y: 195 },
  { id: 'G', value: 7, x: 420, y: 195 },
]

const activeTraversal = ref('inorder')

const traversalTypes = [
  { id: 'inorder', label: 'Inorder' },
  { id: 'preorder', label: 'Preorder' },
  { id: 'postorder', label: 'Postorder' },
  { id: 'bfs', label: 'BFS' },
]

const traversals: Record<string, { order: number[]; ids: string[]; desc: string; colors: Record<string, string> }> = {
  inorder: {
    order: [4, 2, 5, 1, 6, 3, 7],
    ids: ['D', 'B', 'E', 'A', 'F', 'C', 'G'],
    desc: 'Left → Root → Right — numa BST produz valores em ordem crescente',
    colors: { D: '#7c6dfa', B: '#7c6dfa', E: '#7c6dfa', A: '#7c6dfa', F: '#7c6dfa', C: '#7c6dfa', G: '#7c6dfa' },
  },
  preorder: {
    order: [1, 2, 4, 5, 3, 6, 7],
    ids: ['A', 'B', 'D', 'E', 'C', 'F', 'G'],
    desc: 'Root → Left → Right — útil para copiar ou serializar a tree',
    colors: { A: '#3de0c0', B: '#3de0c0', D: '#3de0c0', E: '#3de0c0', C: '#3de0c0', F: '#3de0c0', G: '#3de0c0' },
  },
  postorder: {
    order: [4, 5, 2, 6, 7, 3, 1],
    ids: ['D', 'E', 'B', 'F', 'G', 'C', 'A'],
    desc: 'Left → Right → Root — útil para apagar a tree ou avaliar expressões',
    colors: { D: '#f7a541', E: '#f7a541', B: '#f7a541', F: '#f7a541', G: '#f7a541', C: '#f7a541', A: '#f7a541' },
  },
  bfs: {
    order: [1, 2, 3, 4, 5, 6, 7],
    ids: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    desc: 'Nível a nível — usa Queue internamente, garante caminho mais curto',
    colors: { A: '#f0545a', B: '#f0545a', C: '#f0545a', D: '#f0545a', E: '#f0545a', F: '#f0545a', G: '#f0545a' },
  },
}

const currentTraversal = computed(() => traversals[activeTraversal.value]!)

function getTraversalColor(id: string): string {
  return currentTraversal.value.colors[id] ?? '#3f3f5a'
}

function getTraversalOrder(id: string): string {
  const idx = currentTraversal.value.ids.indexOf(id)
  return idx >= 0 ? `#${idx + 1}` : ''
}
</script>
