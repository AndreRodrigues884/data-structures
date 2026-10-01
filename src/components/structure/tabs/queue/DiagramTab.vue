<template>
  <div class="max-w-3xl space-y-10">
    <!-- Estrutura visual -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Estrutura FIFO</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Elementos entram pelo <span class="text-emerald-400">tail</span> e saem pelo
        <span class="text-violet-400">head</span>.
      </p>

      <svg viewBox="0 0 640 140" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr-enq" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0" />
          </marker>
          <marker id="arr-deq" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#7c6dfa" />
          </marker>
        </defs>

        <!-- Enqueue arrow -->
        <line x1="580" y1="70" x2="548" y2="70" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-enq)" />
        <text x="590" y="60" text-anchor="middle" fill="#3de0c0" font-family="JetBrains Mono, monospace" font-size="11">
          enqueue
        </text>
        <text x="590" y="82" text-anchor="middle" fill="#3de0c0" font-family="JetBrains Mono, monospace" font-size="11">
          O(1)
        </text>

        <!-- Dequeue arrow -->
        <line x1="52" y1="70" x2="20" y2="70" stroke="#7c6dfa" stroke-width="1.5" marker-end="url(#arr-deq)" />
        <text x="10" y="60" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="11">
          dequeue
        </text>
        <text x="10" y="82" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="11">
          O(1)
        </text>

        <!-- Nodes -->
        <g v-for="(node, i) in nodes" :key="node.value">
          <rect
            :x="node.x"
            y="44"
            width="80"
            height="52"
            :fill="i === 0 ? '#1e1b4b' : i === nodes.length - 1 ? '#0d2b1e' : '#18181f'"
            :stroke="i === 0 ? '#7c6dfa' : i === nodes.length - 1 ? '#3de0c0' : '#3f3f5a'"
            stroke-width="1"
          />
          <text
            :x="node.x + 40"
            y="74"
            text-anchor="middle"
            dominant-baseline="middle"
            :fill="i === 0 ? '#a78bfa' : i === nodes.length - 1 ? '#3de0c0' : '#e8e8f0'"
            font-family="JetBrains Mono, monospace"
            font-size="16"
            font-weight="500"
          >
            {{ node.value }}
          </text>
        </g>

        <!-- Head label -->
        <text x="92" y="112" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="11">
          head
        </text>

        <!-- Tail label -->
        <text
          x="548"
          y="112"
          text-anchor="middle"
          fill="#3de0c0"
          font-family="JetBrains Mono, monospace"
          font-size="11"
        >
          tail
        </text>
      </svg>
    </section>

    <!-- Enqueue vs Dequeue -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Enqueue vs Dequeue</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Enqueue -->
        <div class="bg-zinc-900 border border-zinc-800 p-5">
          <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-4">enqueue — adicionar no tail</p>
          <svg viewBox="0 0 200 100" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arr-e" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0" />
              </marker>
            </defs>
            <!-- Existing -->
            <rect x="10" y="30" width="44" height="40" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <rect x="54" y="30" width="44" height="40" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <rect x="98" y="30" width="44" height="40" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <text
              x="32"
              y="54"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#e8e8f0"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              12
            </text>
            <text
              x="76"
              y="54"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#e8e8f0"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              45
            </text>
            <text
              x="120"
              y="54"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#e8e8f0"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              7
            </text>
            <!-- New -->
            <rect
              x="142"
              y="30"
              width="44"
              height="40"
              fill="#0d2b1e"
              stroke="#3de0c0"
              stroke-width="1.5"
              stroke-dasharray="4,2"
            />
            <text
              x="164"
              y="54"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#3de0c0"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              99
            </text>
            <!-- Arrow -->
            <line x1="190" y1="50" x2="188" y2="50" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-e)" />
            <text
              x="100"
              y="88"
              text-anchor="middle"
              fill="#3de0c0"
              font-family="JetBrains Mono, monospace"
              font-size="10"
            >
              enqueue(99)
            </text>
          </svg>
        </div>

        <!-- Dequeue -->
        <div class="bg-zinc-900 border border-zinc-800 p-5">
          <p class="font-mono text-xs text-violet-400 uppercase tracking-widest mb-4">dequeue — remover do head</p>
          <svg viewBox="0 0 200 100" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arr-dq" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 Z" fill="#7c6dfa" />
              </marker>
            </defs>
            <!-- Leaving -->
            <rect
              x="10"
              y="30"
              width="44"
              height="40"
              fill="#1e1b4b"
              stroke="#7c6dfa"
              stroke-width="1.5"
              stroke-dasharray="4,2"
            />
            <text
              x="32"
              y="54"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#a78bfa"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              12
            </text>
            <!-- Arrow out -->
            <line x1="8" y1="50" x2="2" y2="50" stroke="#7c6dfa" stroke-width="1.5" marker-end="url(#arr-dq)" />
            <!-- Remaining -->
            <rect x="54" y="30" width="44" height="40" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <rect x="98" y="30" width="44" height="40" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <rect x="142" y="30" width="44" height="40" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <text
              x="76"
              y="54"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#e8e8f0"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              45
            </text>
            <text
              x="120"
              y="54"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#e8e8f0"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              7
            </text>
            <text
              x="164"
              y="54"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="#e8e8f0"
              font-family="JetBrains Mono, monospace"
              font-size="13"
            >
              99
            </text>
            <text
              x="100"
              y="88"
              text-anchor="middle"
              fill="#7c6dfa"
              font-family="JetBrains Mono, monospace"
              font-size="10"
            >
              dequeue() → 12
            </text>
          </svg>
        </div>
      </div>
    </section>

    <!-- Passos do enqueue/dequeue -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Como funciona internamente</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-2">
          <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3">enqueue(x)</p>
          <div
            v-for="(step, i) in enqueueSteps"
            :key="i"
            class="flex items-start gap-3 p-3 border border-zinc-800 bg-zinc-900"
            :class="activeEnq === i ? 'border-emerald-500/40 bg-emerald-500/5' : ''"
            @click="activeEnq = i"
          >
            <span class="font-mono text-xs text-emerald-400 shrink-0">{{ i + 1 }}</span>
            <div>
              <p class="text-sm text-zinc-300">{{ step.desc }}</p>
              <p class="font-mono text-xs text-zinc-500 mt-1">{{ step.code }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="font-mono text-xs text-violet-400 uppercase tracking-widest mb-3">dequeue()</p>
          <div
            v-for="(step, i) in dequeueSteps"
            :key="i"
            class="flex items-start gap-3 p-3 border border-zinc-800 bg-zinc-900"
            :class="activeDeq === i ? 'border-violet-500/40 bg-violet-500/5' : ''"
            @click="activeDeq = i"
          >
            <span class="font-mono text-xs text-violet-400 shrink-0">{{ i + 1 }}</span>
            <div>
              <p class="text-sm text-zinc-300">{{ step.desc }}</p>
              <p class="font-mono text-xs text-zinc-500 mt-1">{{ step.code }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nodes = [
  { value: 12, x: 52 },
  { value: 45, x: 142 },
  { value: 7, x: 232 },
  { value: 93, x: 322 },
  { value: 31, x: 412 },
  { value: 58, x: 502 },
]

const activeEnq = ref(0)
const activeDeq = ref(0)

const enqueueSteps = [
  { desc: 'Cria um novo nó com o valor.', code: 'node = new Node(value)' },
  { desc: 'O tail atual aponta para o novo nó.', code: 'tail.next = node' },
  { desc: 'O tail passa a ser o novo nó.', code: 'tail = node' },
]

const dequeueSteps = [
  { desc: 'Guarda o valor do head.', code: 'val = head.value' },
  { desc: 'O head avança para o próximo nó.', code: 'head = head.next' },
  { desc: 'Devolve o valor removido.', code: 'return val' },
]
</script>
