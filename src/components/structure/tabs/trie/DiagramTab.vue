<template>
  <div class="max-w-3xl space-y-10">
    <!-- Trie visual -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Construção passo a passo</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Vê como a árvore cresce ao inserir <span class="text-violet-400">"car"</span>,
        <span class="text-violet-400">"cat"</span>, <span class="text-violet-400">"card"</span> e
        <span class="text-violet-400">"dog"</span>. Nós com círculo preenchido marcam
        <span class="text-emerald-400">fim de palavra</span>.
      </p>

      <div class="flex gap-2 mb-6 flex-wrap">
        <button
          v-for="(step, i) in steps"
          :key="i"
          @click="activeStep = i"
          class="font-mono text-xs px-3 py-1.5 border transition-colors"
          :class="
            activeStep === i
              ? 'border-violet-400 text-violet-400 bg-violet-400/10'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
          "
        >
          {{ step.label }}
        </button>
      </div>

      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <svg viewBox="0 0 460 280" class="w-full" xmlns="http://www.w3.org/2000/svg">
          <!-- Edges -->
          <line
            v-for="edge in currentStep.edges"
            :key="`${edge.from}-${edge.to}`"
            :x1="getPos(edge.from).x"
            :y1="getPos(edge.from).y"
            :x2="getPos(edge.to).x"
            :y2="getPos(edge.to).y"
            stroke="#3f3f5a"
            stroke-width="1.5"
          />

          <!-- Nodes -->
          <g v-for="node in currentStep.nodes" :key="node.id">
            <circle
              :cx="getPos(node.id).x"
              :cy="getPos(node.id).y"
              r="18"
              :fill="node.isNew ? '#1e1b4b' : node.isEnd ? '#0d2b1e' : '#18181f'"
              :stroke="node.isNew ? '#7c6dfa' : node.isEnd ? '#3de0c0' : '#3f3f5a'"
              :stroke-width="node.isEnd ? 2.5 : 1.5"
            />
            <text
              :x="getPos(node.id).x"
              :y="getPos(node.id).y"
              text-anchor="middle"
              dominant-baseline="middle"
              :fill="node.isNew ? '#a78bfa' : node.isEnd ? '#3de0c0' : '#e8e8f0'"
              font-family="JetBrains Mono, monospace"
              font-size="13"
              font-weight="500"
            >
              {{ node.label }}
            </text>
          </g>
        </svg>

        <!-- Step description -->
        <div class="border-t border-zinc-800 mt-2 pt-3">
          <p class="font-mono text-sm text-violet-400">{{ currentStep.op }}</p>
          <p class="text-sm text-zinc-400 mt-1">{{ currentStep.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Prefix sharing -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Partilha de prefixos</h2>
      <p class="text-zinc-500 text-sm mb-4">
        "car", "cat" e "card" partilham o mesmo caminho <span class="text-violet-400">c → a</span> — só divergem a
        partir do 3º caractere. É isto que torna a Trie eficiente em memória para conjuntos de palavras com prefixos
        comuns.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-900 p-4 text-center">
          <p class="font-mono text-sm text-violet-400 mb-1">car</p>
          <p class="font-mono text-xs text-zinc-600">c → a → r●</p>
        </div>
        <div class="bg-zinc-900 p-4 text-center">
          <p class="font-mono text-sm text-violet-400 mb-1">cat</p>
          <p class="font-mono text-xs text-zinc-600">c → a → t●</p>
        </div>
        <div class="bg-zinc-900 p-4 text-center">
          <p class="font-mono text-sm text-violet-400 mb-1">card</p>
          <p class="font-mono text-xs text-zinc-600">c → a → r → d●</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeStep = ref(0)

const positions: Record<string, { x: number; y: number }> = {
  root: { x: 230, y: 25 },
  c: { x: 140, y: 90 },
  d1: { x: 320, y: 90 },
  a: { x: 140, y: 150 },
  o: { x: 320, y: 150 },
  r: { x: 100, y: 210 },
  t: { x: 190, y: 210 },
  g: { x: 320, y: 210 },
  d2: { x: 100, y: 270 },
}

function getPos(id: string) {
  return positions[id] ?? { x: 230, y: 25 }
}

type StepNode = { id: string; label: string; isEnd?: boolean; isNew?: boolean }
type StepEdge = { from: string; to: string }

const steps: {
  label: string
  op: string
  desc: string
  nodes: StepNode[]
  edges: StepEdge[]
}[] = [
  {
    label: 'Vazio',
    op: 'new Trie()',
    desc: 'Apenas o nó raiz, sem caracteres.',
    nodes: [{ id: 'root', label: '•' }],
    edges: [],
  },
  {
    label: 'insert("car")',
    op: 'insert("car")',
    desc: 'Cria os nós c → a → r. O último nó (r) fica marcado como fim de palavra.',
    nodes: [
      { id: 'root', label: '•' },
      { id: 'c', label: 'c', isNew: true },
      { id: 'a', label: 'a', isNew: true },
      { id: 'r', label: 'r', isEnd: true, isNew: true },
    ],
    edges: [
      { from: 'root', to: 'c' },
      { from: 'c', to: 'a' },
      { from: 'a', to: 'r' },
    ],
  },
  {
    label: 'insert("cat")',
    op: 'insert("cat")',
    desc: 'c e a já existem — reutiliza-os. Cria apenas o novo nó t, marcado como fim de palavra.',
    nodes: [
      { id: 'root', label: '•' },
      { id: 'c', label: 'c' },
      { id: 'a', label: 'a' },
      { id: 'r', label: 'r', isEnd: true },
      { id: 't', label: 't', isEnd: true, isNew: true },
    ],
    edges: [
      { from: 'root', to: 'c' },
      { from: 'c', to: 'a' },
      { from: 'a', to: 'r' },
      { from: 'a', to: 't' },
    ],
  },
  {
    label: 'insert("card")',
    op: 'insert("card")',
    desc: 'c, a e r já existem. Cria o nó d como filho de r, marcado como fim de palavra.',
    nodes: [
      { id: 'root', label: '•' },
      { id: 'c', label: 'c' },
      { id: 'a', label: 'a' },
      { id: 'r', label: 'r', isEnd: true },
      { id: 't', label: 't', isEnd: true },
      { id: 'd2', label: 'd', isEnd: true, isNew: true },
    ],
    edges: [
      { from: 'root', to: 'c' },
      { from: 'c', to: 'a' },
      { from: 'a', to: 'r' },
      { from: 'a', to: 't' },
      { from: 'r', to: 'd2' },
    ],
  },
  {
    label: 'insert("dog")',
    op: 'insert("dog")',
    desc: 'Nenhum nó partilhado com "car"/"cat" — cria um novo ramo a partir da raiz: d → o → g.',
    nodes: [
      { id: 'root', label: '•' },
      { id: 'c', label: 'c' },
      { id: 'a', label: 'a' },
      { id: 'r', label: 'r', isEnd: true },
      { id: 't', label: 't', isEnd: true },
      { id: 'd2', label: 'd', isEnd: true },
      { id: 'd1', label: 'd', isNew: true },
      { id: 'o', label: 'o', isNew: true },
      { id: 'g', label: 'g', isEnd: true, isNew: true },
    ],
    edges: [
      { from: 'root', to: 'c' },
      { from: 'c', to: 'a' },
      { from: 'a', to: 'r' },
      { from: 'a', to: 't' },
      { from: 'r', to: 'd2' },
      { from: 'root', to: 'd1' },
      { from: 'd1', to: 'o' },
      { from: 'o', to: 'g' },
    ],
  },
]

const currentStep = computed(() => steps[activeStep.value]!)
</script>
