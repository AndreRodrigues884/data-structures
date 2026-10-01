<template>
  <div class="max-w-3xl space-y-10">
    <!-- Max Heap visual -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Max Heap — visualização</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Cada pai é sempre maior que os seus filhos. A raiz é sempre o <span class="text-violet-400">máximo</span>.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Tree view -->
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">tree view</p>
          <svg viewBox="0 0 300 220" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <!-- Edges -->
            <line x1="150" y1="35" x2="80" y2="95" stroke="#3f3f5a" stroke-width="1.5" />
            <line x1="150" y1="35" x2="220" y2="95" stroke="#3f3f5a" stroke-width="1.5" />
            <line x1="80" y1="115" x2="45" y2="175" stroke="#3f3f5a" stroke-width="1.5" />
            <line x1="80" y1="115" x2="115" y2="175" stroke="#3f3f5a" stroke-width="1.5" />
            <line x1="220" y1="115" x2="185" y2="175" stroke="#3f3f5a" stroke-width="1.5" />
            <line x1="220" y1="115" x2="255" y2="175" stroke="#3f3f5a" stroke-width="1.5" />

            <!-- Nodes -->
            <g v-for="node in treeNodes" :key="node.id">
              <circle
                :cx="node.x"
                :cy="node.y"
                r="20"
                :fill="node.isRoot ? '#1e1b4b' : '#18181f'"
                :stroke="node.isRoot ? '#7c6dfa' : '#3f3f5a'"
                stroke-width="1.5"
              />
              <text
                :x="node.x"
                :y="node.y"
                text-anchor="middle"
                dominant-baseline="middle"
                :fill="node.isRoot ? '#a78bfa' : '#e8e8f0'"
                font-family="JetBrains Mono, monospace"
                font-size="13"
                font-weight="500"
              >
                {{ node.value }}
              </text>
            </g>

            <!-- Max label -->
            <text x="178" y="22" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="10">max</text>
          </svg>
        </div>

        <!-- Array view -->
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">array view</p>
          <div class="space-y-2">
            <div v-for="(val, i) in heapArray" :key="i" class="flex items-center gap-3">
              <span class="font-mono text-xs text-zinc-600 w-4">{{ i }}</span>
              <div
                class="flex-1 h-10 flex items-center px-3 border font-mono text-sm"
                :class="
                  i === 0
                    ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                    : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                "
              >
                {{ val }}
              </div>
              <span class="font-mono text-xs text-zinc-600">
                {{ i === 0 ? 'root' : `pai: arr[${Math.floor((i - 1) / 2)}]=${heapArray[Math.floor((i - 1) / 2)]}` }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bubble Up -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Bubble Up — inserção</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Ao inserir <span class="text-violet-400">50</span> num Max Heap, o novo nó sobe enquanto for maior que o pai.
      </p>

      <div class="flex gap-2 mb-4">
        <button
          v-for="(step, i) in bubbleUpSteps"
          :key="i"
          @click="activeBubbleUp = i"
          class="font-mono text-xs px-3 py-1.5 border transition-colors"
          :class="
            activeBubbleUp === i
              ? 'border-violet-400 text-violet-400 bg-violet-400/10'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
          "
        >
          passo {{ i + 1 }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <svg
          viewBox="0 0 300 220"
          class="w-full bg-zinc-900 border border-zinc-800 p-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="150" y1="35" x2="80" y2="95" stroke="#3f3f5a" stroke-width="1.5" />
          <line x1="150" y1="35" x2="220" y2="95" stroke="#3f3f5a" stroke-width="1.5" />
          <line x1="80" y1="115" x2="45" y2="175" stroke="#3f3f5a" stroke-width="1.5" />
          <line x1="80" y1="115" x2="115" y2="175" stroke="#3f3f5a" stroke-width="1.5" />
          <line x1="220" y1="115" x2="185" y2="175" stroke="#3f3f5a" stroke-width="1.5" />
          <line x1="220" y1="115" x2="255" y2="175" stroke="#3f3f5a" stroke-width="1.5" />

          <g v-for="node in currentBubbleStep.nodes" :key="node.id">
            <circle
              :cx="node.x"
              :cy="node.y"
              r="20"
              :fill="node.highlight === 'new' ? '#0d2b1e' : node.highlight === 'swap' ? '#1e1b4b' : '#18181f'"
              :stroke="node.highlight === 'new' ? '#3de0c0' : node.highlight === 'swap' ? '#7c6dfa' : '#3f3f5a'"
              stroke-width="1.5"
            />
            <text
              :x="node.x"
              :y="node.y"
              text-anchor="middle"
              dominant-baseline="middle"
              :fill="node.highlight === 'new' ? '#3de0c0' : node.highlight === 'swap' ? '#a78bfa' : '#e8e8f0'"
              font-family="JetBrains Mono, monospace"
              font-size="13"
              font-weight="500"
            >
              {{ node.value }}
            </text>
          </g>
        </svg>

        <div class="bg-zinc-900 border border-zinc-800 p-4 flex flex-col justify-center">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">estado</p>
          <p class="text-sm text-zinc-300 mb-3">{{ currentBubbleStep.desc }}</p>
          <div class="flex gap-px">
            <div
              v-for="(val, i) in currentBubbleStep.array"
              :key="i"
              class="flex-1 flex flex-col items-center border py-2"
              :class="
                currentBubbleStep.highlight.includes(i)
                  ? 'border-violet-500/50 bg-violet-500/10'
                  : 'border-zinc-700 bg-zinc-800'
              "
            >
              <span
                class="font-mono text-xs"
                :class="currentBubbleStep.highlight.includes(i) ? 'text-violet-300' : 'text-zinc-100'"
              >
                {{ val }}
              </span>
              <span class="font-mono text-xs text-zinc-600 mt-1">{{ i }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bubble Down -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Bubble Down — remoção da raiz</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Ao remover a raiz, o último nó vai para o topo e desce até restaurar a heap property.
      </p>

      <div class="space-y-px border border-zinc-800">
        <div v-for="(step, i) in bubbleDownSteps" :key="i" class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3 font-mono text-xs text-zinc-600">passo {{ i + 1 }}</div>
          <div class="bg-zinc-900 px-4 py-3 col-span-2 text-sm text-zinc-400">{{ step.desc }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-xs text-violet-400">{{ step.array }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const heapArray = [100, 19, 36, 17, 3, 25, 1]

const treeNodes = [
  { id: 'a', value: 100, x: 150, y: 25, isRoot: true },
  { id: 'b', value: 19, x: 80, y: 95, isRoot: false },
  { id: 'c', value: 36, x: 220, y: 95, isRoot: false },
  { id: 'd', value: 17, x: 45, y: 175, isRoot: false },
  { id: 'e', value: 3, x: 115, y: 175, isRoot: false },
  { id: 'f', value: 25, x: 185, y: 175, isRoot: false },
  { id: 'g', value: 1, x: 255, y: 175, isRoot: false },
]

const activeBubbleUp = ref(0)

const bubbleUpSteps = [
  {
    desc: 'Inserimos 50 no fim do array — índice 7.',
    array: [100, 19, 36, 17, 3, 25, 1, 50],
    highlight: [7],
    nodes: [
      { id: 'a', value: 100, x: 150, y: 25, highlight: '' },
      { id: 'b', value: 19, x: 80, y: 95, highlight: '' },
      { id: 'c', value: 36, x: 220, y: 95, highlight: '' },
      { id: 'd', value: 17, x: 45, y: 175, highlight: '' },
      { id: 'e', value: 3, x: 115, y: 175, highlight: '' },
      { id: 'f', value: 25, x: 185, y: 175, highlight: '' },
      { id: 'g', value: 1, x: 255, y: 175, highlight: '' },
      { id: 'h', value: 50, x: 45, y: 255, highlight: 'new' },
    ],
  },
  {
    desc: '50 > pai (17) → troca. pai = ⌊(7-1)/2⌋ = 3',
    array: [100, 19, 36, 50, 3, 25, 1, 17],
    highlight: [3, 7],
    nodes: [
      { id: 'a', value: 100, x: 150, y: 25, highlight: '' },
      { id: 'b', value: 19, x: 80, y: 95, highlight: '' },
      { id: 'c', value: 36, x: 220, y: 95, highlight: '' },
      { id: 'd', value: 50, x: 45, y: 175, highlight: 'swap' },
      { id: 'e', value: 3, x: 115, y: 175, highlight: '' },
      { id: 'f', value: 25, x: 185, y: 175, highlight: '' },
      { id: 'g', value: 1, x: 255, y: 175, highlight: '' },
      { id: 'h', value: 17, x: 45, y: 255, highlight: 'new' },
    ],
  },
  {
    desc: '50 > pai (19) → troca. pai = ⌊(3-1)/2⌋ = 1',
    array: [100, 50, 36, 19, 3, 25, 1, 17],
    highlight: [1, 3],
    nodes: [
      { id: 'a', value: 100, x: 150, y: 25, highlight: '' },
      { id: 'b', value: 50, x: 80, y: 95, highlight: 'swap' },
      { id: 'c', value: 36, x: 220, y: 95, highlight: '' },
      { id: 'd', value: 19, x: 45, y: 175, highlight: 'new' },
      { id: 'e', value: 3, x: 115, y: 175, highlight: '' },
      { id: 'f', value: 25, x: 185, y: 175, highlight: '' },
      { id: 'g', value: 1, x: 255, y: 175, highlight: '' },
      { id: 'h', value: 17, x: 45, y: 255, highlight: '' },
    ],
  },
  {
    desc: '50 < pai (100) → heap property restaurada!',
    array: [100, 50, 36, 19, 3, 25, 1, 17],
    highlight: [1],
    nodes: [
      { id: 'a', value: 100, x: 150, y: 25, highlight: '' },
      { id: 'b', value: 50, x: 80, y: 95, highlight: 'swap' },
      { id: 'c', value: 36, x: 220, y: 95, highlight: '' },
      { id: 'd', value: 19, x: 45, y: 175, highlight: '' },
      { id: 'e', value: 3, x: 115, y: 175, highlight: '' },
      { id: 'f', value: 25, x: 185, y: 175, highlight: '' },
      { id: 'g', value: 1, x: 255, y: 175, highlight: '' },
      { id: 'h', value: 17, x: 45, y: 255, highlight: '' },
    ],
  },
]

const currentBubbleStep = computed(() => bubbleUpSteps[activeBubbleUp.value]!)

const bubbleDownSteps = [
  { desc: 'Remove a raiz (100). Último elemento (1) vai para o topo.', array: '[1, 19, 36, 17, 3, 25]' },
  { desc: '1 < filhos (19, 36) → troca com o maior filho (36).', array: '[36, 19, 1, 17, 3, 25]' },
  { desc: '1 < filhos (25) → troca com 25.', array: '[36, 19, 25, 17, 3, 1]' },
  { desc: '1 não tem filhos → heap property restaurada!', array: '[36, 19, 25, 17, 3, 1]' },
]
</script>
