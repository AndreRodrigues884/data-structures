<template>
  <div class="max-w-3xl space-y-10">

    <!-- Estrutura de um nó -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Estrutura de um nó</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Cada nó tem dois campos — o valor e o ponteiro para o próximo nó.
      </p>

      <svg viewBox="0 0 400 100" class="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
        <!-- Node box -->
        <rect x="20" y="20" width="160" height="60" fill="#18181f" stroke="#3f3f5a" stroke-width="1"/>
        <!-- Divider -->
        <line x1="100" y1="20" x2="100" y2="80" stroke="#3f3f5a" stroke-width="1"/>
        <!-- Labels -->
        <text x="60" y="38" text-anchor="middle" fill="#8888a0" font-family="JetBrains Mono, monospace" font-size="10">value</text>
        <text x="60" y="58" text-anchor="middle" fill="#e8e8f0" font-family="JetBrains Mono, monospace" font-size="16" font-weight="500">42</text>
        <text x="130" y="38" text-anchor="middle" fill="#8888a0" font-family="JetBrains Mono, monospace" font-size="10">next</text>
        <text x="130" y="58" text-anchor="middle" fill="#3de0c0" font-family="JetBrains Mono, monospace" font-size="11">0x1B00</text>
        <!-- Arrow -->
        <line x1="180" y1="50" x2="230" y2="50" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr1)"/>
        <text x="240" y="54" fill="#8888a0" font-family="JetBrains Mono, monospace" font-size="12">próximo nó</text>
        <defs>
          <marker id="arr1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0"/>
          </marker>
        </defs>
      </svg>
    </section>

    <!-- Lista completa -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Linked List completa</h2>
      <p class="text-zinc-500 text-sm mb-6">
        O <span class="text-violet-400">head</span> aponta para o primeiro nó.
        O último nó aponta para <span class="text-red-400">null</span>.
      </p>

      <svg viewBox="0 0 640 120" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0"/>
          </marker>
          <marker id="arr3" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#f0545a"/>
          </marker>
        </defs>

        <!-- Head label -->
        <text x="30" y="30" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="11">head</text>
        <line x1="30" y1="34" x2="30" y2="48" stroke="#7c6dfa" stroke-width="1.5" marker-end="url(#arr-head)"/>
        <defs>
          <marker id="arr-head" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#7c6dfa"/>
          </marker>
        </defs>

        <!-- Nodes -->
        <g v-for="(node, i) in nodes" :key="node.value">
          <!-- Box -->
          <rect :x="node.x" y="50" width="100" height="50" fill="#18181f" stroke="#3f3f5a" stroke-width="1"/>
          <!-- Divider -->
          <line :x1="node.x + 60" y1="50" :x2="node.x + 60" y2="100" stroke="#3f3f5a" stroke-width="1"/>
          <!-- Value -->
          <text :x="node.x + 30" y="80" text-anchor="middle" fill="#e8e8f0" font-family="JetBrains Mono, monospace" font-size="16" font-weight="500">{{ node.value }}</text>
          <!-- Next pointer -->
          <text :x="node.x + 80" y="72" text-anchor="middle" fill="#8888a0" font-family="JetBrains Mono, monospace" font-size="9">next</text>
          <!-- Arrow to next -->
          <line
            v-if="i < nodes.length - 1"
            :x1="node.x + 100" y1="75"
            :x2="node.x + 130" y2="75"
            stroke="#3de0c0" stroke-width="1.5"
            marker-end="url(#arr2)"
          />
          <!-- Null -->
          <text
            v-if="i === nodes.length - 1"
            :x="node.x + 80" y="80"
            text-anchor="middle"
            fill="#f0545a"
            font-family="JetBrains Mono, monospace"
            font-size="10"
          >null</text>
        </g>

        <!-- Tail label -->
        <text x="580" y="30" text-anchor="middle" fill="#3de0c0" font-family="JetBrains Mono, monospace" font-size="11">tail</text>
        <line x1="580" y1="34" x2="580" y2="48" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr2)"/>
      </svg>
    </section>

    <!-- Inserção no início -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Inserção no início — O(1)</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Apenas dois passos — independente do tamanho da lista.
      </p>

      <div class="space-y-3">
        <div
          v-for="(step, i) in insertSteps"
          :key="i"
          class="flex items-start gap-4 p-4 border border-zinc-800 bg-zinc-900"
          :class="i === activeStep ? 'border-violet-500/50 bg-violet-500/5' : ''"
        >
          <span class="font-mono text-xs text-violet-400 mt-0.5 shrink-0">{{ i + 1 }}</span>
          <div>
            <p class="text-sm text-zinc-300">{{ step.desc }}</p>
            <p class="font-mono text-xs text-emerald-400 mt-1">{{ step.code }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nodes = [
  { value: 12, x: 10  },
  { value: 45, x: 140 },
  { value: 7,  x: 270 },
  { value: 93, x: 400 },
  { value: 31, x: 530 },
]

const activeStep = ref(0)

const insertSteps = [
  {
    desc: 'Cria um novo nó com o valor desejado.',
    code: 'const newNode = { value: 99, next: null }'
  },
  {
    desc: 'O ponteiro next do novo nó aponta para o head atual.',
    code: 'newNode.next = head'
  },
  {
    desc: 'O head passa a ser o novo nó. Operação concluída em O(1).',
    code: 'head = newNode'
  },
]
</script>