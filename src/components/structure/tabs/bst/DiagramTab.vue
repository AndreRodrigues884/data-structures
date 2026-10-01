<template>
  <div class="max-w-3xl space-y-10">
    <!-- BST property -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Propriedade BST</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Clica em qualquer nó para ver quais valores estão à esquerda e à direita.
      </p>

      <svg viewBox="0 0 500 280" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr-bst" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#3f3f5a" />
          </marker>
        </defs>

        <!-- Edges -->
        <line
          v-for="edge in edges"
          :key="`${edge.from}-${edge.to}`"
          :x1="getNode(edge.from).x"
          :y1="getNode(edge.from).y"
          :x2="getNode(edge.to).x"
          :y2="getNode(edge.to).y"
          stroke="#3f3f5a"
          stroke-width="1.5"
        />

        <!-- Nodes -->
        <g v-for="node in nodes" :key="node.id" @click="selectedNode = node" class="cursor-pointer">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="22"
            :fill="getNodeFill(node)"
            :stroke="getNodeStroke(node)"
            stroke-width="1.5"
            class="transition-all duration-200"
          />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="middle"
            :fill="selectedNode?.id === node.id ? '#a78bfa' : '#e8e8f0'"
            font-family="JetBrains Mono, monospace"
            font-size="14"
            font-weight="500"
          >
            {{ node.value }}
          </text>
        </g>

        <!-- Left/Right labels -->
        <text x="80" y="20" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="10">← menores</text>
        <text x="350" y="20" fill="#3de0c0" font-family="JetBrains Mono, monospace" font-size="10">maiores →</text>
      </svg>

      <!-- Node info -->
      <div v-if="selectedNode" class="bg-zinc-900 border border-violet-500/30 p-4">
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">
          nó selecionado: {{ selectedNode.value }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p class="font-mono text-xs text-violet-400 mb-1">← esquerda (menores)</p>
            <p class="font-mono text-sm text-zinc-300">{{ getLeftValues(selectedNode) }}</p>
          </div>
          <div>
            <p class="font-mono text-xs text-amber-400 mb-1">raiz</p>
            <p class="font-mono text-sm text-amber-400">{{ selectedNode.value }}</p>
          </div>
          <div>
            <p class="font-mono text-xs text-emerald-400 mb-1">→ direita (maiores)</p>
            <p class="font-mono text-sm text-zinc-300">{{ getRightValues(selectedNode) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Search path -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Como funciona a pesquisa</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Seleciona um valor para ver o caminho de pesquisa — a cada nó decide esquerda ou direita.
      </p>

      <div class="flex gap-2 mb-4 flex-wrap">
        <button
          v-for="val in searchValues"
          :key="val"
          @click="showSearch(val)"
          class="font-mono text-sm px-3 py-1.5 border transition-colors"
          :class="
            searchTarget === val
              ? 'border-violet-400 text-violet-400 bg-violet-400/10'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
          "
        >
          search({{ val }})
        </button>
      </div>

      <svg viewBox="0 0 500 240" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <line
          v-for="edge in edges"
          :key="`s-${edge.from}-${edge.to}`"
          :x1="getNode(edge.from).x"
          :y1="getNode(edge.from).y"
          :x2="getNode(edge.to).x"
          :y2="getNode(edge.to).y"
          stroke="#3f3f5a"
          stroke-width="1.5"
        />

        <g v-for="node in nodes" :key="`s-${node.id}`">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="22"
            :fill="getSearchFill(node)"
            :stroke="getSearchStroke(node)"
            stroke-width="1.5"
          />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#e8e8f0"
            font-family="JetBrains Mono, monospace"
            font-size="14"
            font-weight="500"
          >
            {{ node.value }}
          </text>
          <!-- Step number -->
          <text
            v-if="searchPath.indexOf(node.id) >= 0"
            :x="node.x + 16"
            :y="node.y - 16"
            fill="#7c6dfa"
            font-family="JetBrains Mono, monospace"
            font-size="11"
          >
            {{ searchPath.indexOf(node.id) + 1 }}
          </text>
        </g>
      </svg>

      <!-- Search steps -->
      <div v-if="searchSteps.length > 0" class="space-y-px border border-zinc-800">
        <div
          v-for="(step, i) in searchSteps"
          :key="i"
          class="flex items-center gap-4 px-4 py-3 bg-zinc-900"
          :class="i === searchSteps.length - 1 ? 'border-l-2 border-violet-400' : ''"
        >
          <span class="font-mono text-xs text-violet-400 shrink-0">{{ i + 1 }}</span>
          <span class="font-mono text-sm text-zinc-300">{{ step }}</span>
        </div>
      </div>
    </section>

    <!-- Inorder = sorted -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Inorder = array ordenado</h2>
      <p class="text-zinc-500 text-sm mb-4">
        O inorder traversal de uma BST produz sempre os valores em ordem crescente. É a forma mais eficiente de ordenar
        uma BST.
      </p>
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">inorder result</p>
        <div class="flex gap-2 flex-wrap">
          <span
            v-for="(val, i) in inorderResult"
            :key="i"
            class="font-mono text-sm px-3 py-1 border border-emerald-500/40 text-emerald-400"
            >{{ val }}</span
          >
        </div>
        <p class="font-mono text-xs text-zinc-600 mt-3">Left → Root → Right em todos os nós → sempre crescente</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type BSTNode = {
  id: string
  value: number
  x: number
  y: number
  left?: string
  right?: string
}

const nodes: BSTNode[] = [
  { id: 'n8', value: 8, x: 250, y: 30, left: 'n3', right: 'n10' },
  { id: 'n3', value: 3, x: 140, y: 100, left: 'n1', right: 'n6' },
  { id: 'n10', value: 10, x: 360, y: 100, right: 'n14' },
  { id: 'n1', value: 1, x: 80, y: 180 },
  { id: 'n6', value: 6, x: 200, y: 180, left: 'n4', right: 'n7' },
  { id: 'n14', value: 14, x: 420, y: 180, left: 'n13' },
  { id: 'n4', value: 4, x: 155, y: 250 },
  { id: 'n7', value: 7, x: 245, y: 250 },
  { id: 'n13', value: 13, x: 375, y: 250 },
]

const edges = [
  { from: 'n8', to: 'n3' },
  { from: 'n8', to: 'n10' },
  { from: 'n3', to: 'n1' },
  { from: 'n3', to: 'n6' },
  { from: 'n10', to: 'n14' },
  { from: 'n6', to: 'n4' },
  { from: 'n6', to: 'n7' },
  { from: 'n14', to: 'n13' },
]

function getNode(id: string): BSTNode {
  return nodes.find((n) => n.id === id) ?? nodes[0]!
}

const selectedNode = ref<BSTNode | null>(null)

function getSubtreeValues(nodeId: string | undefined): number[] {
  if (!nodeId) return []
  const node = getNode(nodeId)
  return [node.value, ...getSubtreeValues(node.left), ...getSubtreeValues(node.right)]
}

function getLeftValues(node: BSTNode): string {
  const vals = getSubtreeValues(node.left).sort((a, b) => a - b)
  return vals.length ? vals.join(', ') : '—'
}

function getRightValues(node: BSTNode): string {
  const vals = getSubtreeValues(node.right).sort((a, b) => a - b)
  return vals.length ? vals.join(', ') : '—'
}

function getNodeFill(node: BSTNode) {
  if (selectedNode.value?.id === node.id) return '#1e1b4b'
  return '#18181f'
}

function getNodeStroke(node: BSTNode) {
  if (selectedNode.value?.id === node.id) return '#7c6dfa'
  if (node.id === 'n8') return '#3de0c0'
  return '#3f3f5a'
}

// Search
const searchTarget = ref<number | null>(null)
const searchPath = ref<string[]>([])
const searchSteps = ref<string[]>([])
const searchValues = [1, 4, 7, 13, 14]

function showSearch(target: number) {
  searchTarget.value = target
  searchPath.value = []
  searchSteps.value = []

  let current: BSTNode | undefined = getNode('n8')
  while (current) {
    searchPath.value.push(current.id)
    if (current.value === target) {
      searchSteps.value.push(`✓ encontrado ${target} no nó ${current.value}`)
      break
    } else if (target < current.value) {
      searchSteps.value.push(`${target} < ${current.value} → vai para a esquerda`)
      current = current.left ? getNode(current.left) : undefined
    } else {
      searchSteps.value.push(`${target} > ${current.value} → vai para a direita`)
      current = current.right ? getNode(current.right) : undefined
    }
    if (!current) searchSteps.value.push(`✗ ${target} não encontrado`)
  }
}

function getSearchFill(node: BSTNode) {
  const idx = searchPath.value.indexOf(node.id)
  if (idx < 0) return '#18181f'
  if (idx === searchPath.value.length - 1) return '#0d2b1e'
  return '#1e1b4b'
}

function getSearchStroke(node: BSTNode) {
  const idx = searchPath.value.indexOf(node.id)
  if (idx < 0) return '#3f3f5a'
  if (idx === searchPath.value.length - 1) return '#3de0c0'
  return '#7c6dfa'
}

// Inorder
function inorder(id: string | undefined, result: number[] = []): number[] {
  if (!id) return result
  const node = getNode(id)
  inorder(node.left, result)
  result.push(node.value)
  inorder(node.right, result)
  return result
}

const inorderResult = computed(() => inorder('n8'))
</script>
