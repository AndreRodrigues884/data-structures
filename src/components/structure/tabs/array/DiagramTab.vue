<template>
  <div class="max-w-3xl space-y-10">
    <!-- Memória contígua -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Memória contígua</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Cada elemento ocupa um bloco de memória consecutivo. O índice é calculado como
        <code class="text-violet-400 font-mono">base_address + index × element_size</code>.
      </p>

      <svg viewBox="0 0 640 160" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <!-- Memory blocks -->
        <g v-for="(cell, i) in cells" :key="i">
          <!-- Block -->
          <rect :x="cell.x" y="40" width="72" height="72" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
          <!-- Value -->
          <text
            :x="cell.x + 36"
            y="82"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#e8e8f0"
            font-family="JetBrains Mono, monospace"
            font-size="18"
            font-weight="500"
          >
            {{ cell.value }}
          </text>

          <!-- Index label -->
          <text
            :x="cell.x + 36"
            y="130"
            text-anchor="middle"
            fill="#8888a0"
            font-family="JetBrains Mono, monospace"
            font-size="11"
          >
            [{{ i }}]
          </text>

          <!-- Memory address -->
          <text
            :x="cell.x + 36"
            y="24"
            text-anchor="middle"
            fill="#3f3f5a"
            font-family="JetBrains Mono, monospace"
            font-size="10"
          >
            {{ cell.addr }}
          </text>
        </g>

        <!-- Arrow showing contiguous -->
        <line x1="12" y1="76" x2="628" y2="76" stroke="#2a2a38" stroke-width="1" stroke-dasharray="4,4" />
      </svg>
    </section>

    <!-- Acesso por índice -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Acesso por índice</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Para aceder ao elemento no índice <code class="text-violet-400 font-mono">i</code>, o CPU calcula diretamente o
        endereço — não precisa de percorrer o array.
      </p>

      <svg viewBox="0 0 640 200" class="w-full" xmlns="http://www.w3.org/2000/svg">
        <!-- Blocks -->
        <g v-for="(cell, i) in cells" :key="i">
          <rect
            :x="cell.x"
            y="60"
            width="72"
            height="72"
            :fill="i === highlighted ? '#1e1b4b' : '#18181f'"
            :stroke="i === highlighted ? '#7c6dfa' : '#3f3f5a'"
            :stroke-width="i === highlighted ? 2 : 1"
          />
          <text
            :x="cell.x + 36"
            y="102"
            text-anchor="middle"
            dominant-baseline="middle"
            :fill="i === highlighted ? '#a78bfa' : '#e8e8f0'"
            font-family="JetBrains Mono, monospace"
            font-size="18"
            font-weight="500"
          >
            {{ cell.value }}
          </text>
          <text
            :x="cell.x + 36"
            y="150"
            text-anchor="middle"
            fill="#8888a0"
            font-family="JetBrains Mono, monospace"
            font-size="11"
          >
            [{{ i }}]
          </text>
        </g>

        <!-- Pointer arrow -->
        <template v-if="activeCell">
          <line
            :x1="activeCell.x + 36"
            y1="44"
            :x2="activeCell.x + 36"
            y2="58"
            stroke="#7c6dfa"
            stroke-width="2"
            marker-end="url(#arrow)"
          />
          <text
            :x="activeCell.x + 36"
            y="34"
            text-anchor="middle"
            fill="#7c6dfa"
            font-family="JetBrains Mono, monospace"
            font-size="11"
          >
            arr[{{ highlighted }}]
          </text>
        </template>

        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#7c6dfa" />
          </marker>
        </defs>
      </svg>

      <!-- Index selector -->
      <div class="flex items-center gap-4 mt-4">
        <span class="font-mono text-sm text-zinc-500">Índice:</span>
        <div class="flex gap-2">
          <button
            v-for="i in cells.length"
            :key="i"
            @click="highlighted = i - 1"
            class="w-9 h-9 font-mono text-sm border transition-colors"
            :class="
              highlighted === i - 1
                ? 'border-violet-400 text-violet-400 bg-violet-400/10'
                : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
            "
          >
            {{ i - 1 }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const highlighted = ref(2)

const cells = [
  { value: 12, addr: '0x00', x: 8 },
  { value: 45, addr: '0x04', x: 88 },
  { value: 7, addr: '0x08', x: 168 },
  { value: 93, addr: '0x0C', x: 248 },
  { value: 31, addr: '0x10', x: 328 },
  { value: 58, addr: '0x14', x: 408 },
  { value: 24, addr: '0x18', x: 488 },
  { value: 66, addr: '0x1C', x: 568 },
]

const activeCell = computed(() => cells[highlighted.value])
</script>
