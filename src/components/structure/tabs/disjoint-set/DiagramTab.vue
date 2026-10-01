<template>
  <div class="max-w-3xl space-y-10">
    <!-- Union-Find visual -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Union-Find passo a passo</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Vê como o array <span class="text-violet-400">parent[]</span> evolui a cada operação union.
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

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Tree visualization -->
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">árvore</p>
          <svg viewBox="0 0 280 200" class="w-full" xmlns="http://www.w3.org/2000/svg">
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
                r="20"
                :fill="node.isRoot ? '#1e1b4b' : '#18181f'"
                :stroke="node.isRoot ? '#7c6dfa' : '#3f3f5a'"
                stroke-width="1.5"
              />
              <text
                :x="getPos(node.id).x"
                :y="getPos(node.id).y"
                text-anchor="middle"
                dominant-baseline="middle"
                :fill="node.isRoot ? '#a78bfa' : '#e8e8f0'"
                font-family="JetBrains Mono, monospace"
                font-size="14"
                font-weight="500"
              >
                {{ node.id }}
              </text>
            </g>
          </svg>
        </div>

        <!-- Parent array -->
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">parent[]</p>
          <div class="space-y-2">
            <div v-for="(p, i) in currentStep.parent" :key="i" class="flex items-center gap-3">
              <span class="font-mono text-sm text-zinc-500 w-4">{{ i }}</span>
              <div
                class="flex-1 h-8 flex items-center px-3 border font-mono text-sm"
                :class="
                  p === i
                    ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                    : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                "
              >
                {{ p }}
              </div>
              <span class="font-mono text-xs text-zinc-600">
                {{ p === i ? '← raiz' : `→ pai: ${p}` }}
              </span>
            </div>
          </div>

          <!-- Rank array -->
          <div class="mt-4 pt-4 border-t border-zinc-800">
            <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">rank[]</p>
            <div class="flex gap-px">
              <div
                v-for="(r, i) in currentStep.rank"
                :key="i"
                class="flex-1 flex flex-col items-center border border-zinc-700 bg-zinc-800 py-2"
              >
                <span class="font-mono text-sm text-zinc-100">{{ r }}</span>
                <span class="font-mono text-xs text-zinc-600 mt-1">{{ i }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step description -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 mt-4">
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">operação</p>
        <p class="font-mono text-sm text-violet-400">{{ currentStep.op }}</p>
        <p class="text-sm text-zinc-400 mt-1">{{ currentStep.desc }}</p>
      </div>
    </section>

    <!-- Path compression -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Path Compression</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Sem path compression, find(4) percorre 4→3→2→1→0. Com path compression, todos os nós passam a apontar
        diretamente para a raiz.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-red-400 uppercase tracking-widest mb-4">sem path compression</p>
          <svg viewBox="0 0 120 220" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="60" y1="35" x2="60" y2="65" stroke="#3f3f5a" stroke-width="1.5" />
            <line x1="60" y1="95" x2="60" y2="125" stroke="#3f3f5a" stroke-width="1.5" />
            <line x1="60" y1="155" x2="60" y2="185" stroke="#3f3f5a" stroke-width="1.5" />

            <g v-for="(node, i) in linearNodes" :key="i">
              <circle :cx="60" :cy="node.y" r="18" fill="#18181f" stroke="#3f3f5a" stroke-width="1.5" />
              <text
                x="60"
                :y="node.y"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="#e8e8f0"
                font-family="JetBrains Mono, monospace"
                font-size="13"
              >
                {{ node.label }}
              </text>
            </g>
            <text x="85" y="25" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="9">raiz</text>
          </svg>
          <p class="font-mono text-xs text-zinc-600 mt-2">find(4) → 4 passos</p>
        </div>

        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-4">com path compression</p>
          <svg viewBox="0 0 200 160" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="100" y1="35" x2="40" y2="110" stroke="#3de0c0" stroke-width="1.5" />
            <line x1="100" y1="35" x2="80" y2="110" stroke="#3de0c0" stroke-width="1.5" />
            <line x1="100" y1="35" x2="120" y2="110" stroke="#3de0c0" stroke-width="1.5" />
            <line x1="100" y1="35" x2="160" y2="110" stroke="#3de0c0" stroke-width="1.5" />

            <!-- Root -->
            <circle cx="100" cy="25" r="18" fill="#1e1b4b" stroke="#7c6dfa" stroke-width="1.5" />
            <text
              x="100"
              y="25"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#a78bfa"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              0
            </text>

            <!-- Children -->
            <g v-for="(node, i) in flatNodes" :key="i">
              <circle :cx="node.x" cy="120" r="18" fill="#18181f" stroke="#3de0c0" stroke-width="1.5" />
              <text
                :x="node.x"
                y="120"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="#3de0c0"
                font-family="JetBrains Mono, monospace"
                font-size="13"
              >
                {{ node.label }}
              </text>
            </g>
            <text x="128" y="15" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="9">raiz</text>
          </svg>
          <p class="font-mono text-xs text-zinc-600 mt-2">find(4) → 1 passo</p>
        </div>
      </div>
    </section>

    <!-- Connected components -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Connected Components</h2>
      <p class="text-zinc-500 text-sm mb-4">O caso de uso mais clássico — encontrar grupos conectados num grafo.</p>
      <svg
        viewBox="0 0 500 160"
        class="w-full bg-zinc-900 border border-zinc-800 p-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Group 1 edges -->
        <line x1="60" y1="80" x2="130" y2="40" stroke="#7c6dfa" stroke-width="1.5" />
        <line x1="60" y1="80" x2="130" y2="120" stroke="#7c6dfa" stroke-width="1.5" />
        <line x1="130" y1="40" x2="130" y2="120" stroke="#7c6dfa" stroke-width="1.5" />

        <!-- Group 2 edges -->
        <line x1="230" y1="80" x2="300" y2="80" stroke="#3de0c0" stroke-width="1.5" />

        <!-- Group 3 edges -->
        <line x1="380" y1="40" x2="450" y2="40" stroke="#f7a541" stroke-width="1.5" />
        <line x1="380" y1="120" x2="450" y2="120" stroke="#f7a541" stroke-width="1.5" />
        <line x1="380" y1="40" x2="380" y2="120" stroke="#f7a541" stroke-width="1.5" />

        <!-- Group 1 nodes -->
        <g v-for="node in group1" :key="node.id">
          <circle :cx="node.x" :cy="node.y" r="20" fill="#1e1b4b" stroke="#7c6dfa" stroke-width="1.5" />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#a78bfa"
            font-family="JetBrains Mono, monospace"
            font-size="13"
          >
            {{ node.label }}
          </text>
        </g>

        <!-- Group 2 nodes -->
        <g v-for="node in group2" :key="node.id">
          <circle :cx="node.x" :cy="node.y" r="20" fill="#0d2b1e" stroke="#3de0c0" stroke-width="1.5" />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#3de0c0"
            font-family="JetBrains Mono, monospace"
            font-size="13"
          >
            {{ node.label }}
          </text>
        </g>

        <!-- Group 3 nodes -->
        <g v-for="node in group3" :key="node.id">
          <circle :cx="node.x" :cy="node.y" r="20" fill="#1a1400" stroke="#f7a541" stroke-width="1.5" />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#f7a541"
            font-family="JetBrains Mono, monospace"
            font-size="13"
          >
            {{ node.label }}
          </text>
        </g>

        <!-- Labels -->
        <text x="95" y="150" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="10">
          componente 1
        </text>
        <text
          x="265"
          y="150"
          text-anchor="middle"
          fill="#3de0c0"
          font-family="JetBrains Mono, monospace"
          font-size="10"
        >
          componente 2
        </text>
        <text
          x="415"
          y="150"
          text-anchor="middle"
          fill="#f7a541"
          font-family="JetBrains Mono, monospace"
          font-size="10"
        >
          componente 3
        </text>
      </svg>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeStep = ref(0)

const positions: Record<number, { x: number; y: number }> = {
  0: { x: 140, y: 30 },
  1: { x: 60, y: 100 },
  2: { x: 220, y: 100 },
  3: { x: 30, y: 170 },
  4: { x: 100, y: 170 },
}

function getPos(id: number) {
  return positions[id] ?? { x: 140, y: 30 }
}

const steps = [
  {
    label: 'Inicial',
    op: 'makeSet(0,1,2,3,4)',
    desc: 'Cada elemento é o seu próprio pai — 5 conjuntos disjuntos.',
    parent: [0, 1, 2, 3, 4],
    rank: [0, 0, 0, 0, 0],
    nodes: [
      { id: 0, isRoot: true },
      { id: 1, isRoot: true },
      { id: 2, isRoot: true },
      { id: 3, isRoot: true },
      { id: 4, isRoot: true },
    ],
    edges: [] as { from: number; to: number }[],
  },
  {
    label: 'union(0,1)',
    op: 'union(0, 1)',
    desc: 'Une os conjuntos de 0 e 1. Como têm o mesmo rank, 1 passa a filho de 0.',
    parent: [0, 0, 2, 3, 4],
    rank: [1, 0, 0, 0, 0],
    nodes: [
      { id: 0, isRoot: true },
      { id: 1, isRoot: false },
      { id: 2, isRoot: true },
      { id: 3, isRoot: true },
      { id: 4, isRoot: true },
    ],
    edges: [{ from: 0, to: 1 }],
  },
  {
    label: 'union(2,3)',
    op: 'union(2, 3)',
    desc: 'Une os conjuntos de 2 e 3. 3 passa a filho de 2.',
    parent: [0, 0, 2, 2, 4],
    rank: [1, 0, 1, 0, 0],
    nodes: [
      { id: 0, isRoot: true },
      { id: 1, isRoot: false },
      { id: 2, isRoot: true },
      { id: 3, isRoot: false },
      { id: 4, isRoot: true },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 2, to: 3 },
    ],
  },
  {
    label: 'union(0,2)',
    op: 'union(0, 2)',
    desc: 'Une os conjuntos de 0 e 2. Mesmo rank — 2 passa a filho de 0. Rank de 0 sobe para 2.',
    parent: [0, 0, 0, 2, 4],
    rank: [2, 0, 1, 0, 0],
    nodes: [
      { id: 0, isRoot: true },
      { id: 1, isRoot: false },
      { id: 2, isRoot: false },
      { id: 3, isRoot: false },
      { id: 4, isRoot: true },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 2, to: 3 },
    ],
  },
  {
    label: 'union(0,4)',
    op: 'union(0, 4)',
    desc: 'Une todos — 4 passa a filho de 0. Agora todos estão no mesmo conjunto.',
    parent: [0, 0, 0, 2, 0],
    rank: [2, 0, 1, 0, 0],
    nodes: [
      { id: 0, isRoot: true },
      { id: 1, isRoot: false },
      { id: 2, isRoot: false },
      { id: 3, isRoot: false },
      { id: 4, isRoot: false },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 2, to: 3 },
      { from: 0, to: 4 },
    ],
  },
]

const currentStep = computed(() => steps[activeStep.value]!)

const linearNodes = [
  { label: '0', y: 25 },
  { label: '1', y: 85 },
  { label: '2', y: 135 },
  { label: '3', y: 185 },
]

const flatNodes = [
  { label: '1', x: 40 },
  { label: '2', x: 80 },
  { label: '3', x: 120 },
  { label: '4', x: 160 },
]

const group1 = [
  { id: 'A', label: 'A', x: 60, y: 80 },
  { id: 'B', label: 'B', x: 130, y: 40 },
  { id: 'C', label: 'C', x: 130, y: 120 },
]

const group2 = [
  { id: 'D', label: 'D', x: 230, y: 80 },
  { id: 'E', label: 'E', x: 300, y: 80 },
]

const group3 = [
  { id: 'F', label: 'F', x: 380, y: 40 },
  { id: 'G', label: 'G', x: 450, y: 40 },
  { id: 'H', label: 'H', x: 380, y: 120 },
  { id: 'I', label: 'I', x: 450, y: 120 },
]
</script>
