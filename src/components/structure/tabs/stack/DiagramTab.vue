<template>
  <div class="max-w-3xl space-y-10">

    <!-- Estrutura visual -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Estrutura LIFO</h2>
      <p class="text-zinc-500 text-sm mb-6">
        A Stack cresce para cima. O <span class="text-violet-400">topo</span> é sempre
        o único ponto de acesso — push e pop acontecem aqui.
      </p>

      <svg viewBox="0 0 300 320" class="w-full max-w-xs" xmlns="http://www.w3.org/2000/svg">
        <!-- Stack frames -->
        <g v-for="(item, i) in stackItems" :key="item.value">
          <rect :x="40" :y="item.y" width="160" height="44" :fill="i === stackItems.length - 1 ? '#1e1b4b' : '#18181f'"
            :stroke="i === stackItems.length - 1 ? '#7c6dfa' : '#3f3f5a'" stroke-width="1" />
          <text x="120" :y="item.y + 26" text-anchor="middle" dominant-baseline="middle"
            :fill="i === stackItems.length - 1 ? '#a78bfa' : '#e8e8f0'" font-family="JetBrains Mono, monospace"
            font-size="15" font-weight="500">{{ item.value }}</text>
        </g>

        <!-- Base -->
        <rect x="30" y="246" width="180" height="6" fill="#3f3f5a" />

        <!-- Top arrow -->
        <line x1="220" y1="60" x2="205" y2="60" stroke="#7c6dfa" stroke-width="1.5" marker-end="url(#arr-top)" />
        <text x="225" y="64" fill="#7c6dfa" font-family="JetBrains Mono, monospace" font-size="11">topo</text>

        <!-- Push arrow -->
        <line x1="120" y1="20" x2="120" y2="38" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-push)" />
        <text x="148" y="16" fill="#3de0c0" font-family="JetBrains Mono, monospace" font-size="11">push</text>

        <!-- Base label -->
        <text x="120" y="272" text-anchor="middle" fill="#8888a0" font-family="JetBrains Mono, monospace"
          font-size="10">base</text>

        <defs>
          <marker id="arr-top" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#7c6dfa" />
          </marker>
          <marker id="arr-push" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0" />
          </marker>
        </defs>
      </svg>
    </section>

    <!-- Push vs Pop -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Push vs Pop</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <!-- Push -->
        <div class="bg-zinc-900 border border-zinc-800 p-5">
          <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-4">push — adicionar</p>
          <svg viewBox="0 0 160 180" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <!-- Existing items -->
            <rect x="20" y="80" width="120" height="36" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <rect x="20" y="116" width="120" height="36" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <text x="80" y="100" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
              font-family="JetBrains Mono, monospace" font-size="13">45</text>
            <text x="80" y="136" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
              font-family="JetBrains Mono, monospace" font-size="13">12</text>
            <!-- Base -->
            <rect x="14" y="152" width="132" height="4" fill="#3f3f5a" />
            <!-- New item coming -->
            <rect x="20" y="36" width="120" height="36" fill="#1e1b4b" stroke="#7c6dfa" stroke-width="1.5"
              stroke-dasharray="4,2" />
            <text x="80" y="56" text-anchor="middle" dominant-baseline="middle" fill="#a78bfa"
              font-family="JetBrains Mono, monospace" font-size="13">99</text>
            <!-- Arrow -->
            <line x1="80" y1="28" x2="80" y2="14" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-d)" />
            <text x="80" y="10" text-anchor="middle" fill="#3de0c0" font-family="JetBrains Mono, monospace"
              font-size="10">push(99)</text>
            <defs>
              <marker id="arr-d" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0" />
              </marker>
            </defs>
          </svg>
        </div>

        <!-- Pop -->
        <div class="bg-zinc-900 border border-zinc-800 p-5">
          <p class="font-mono text-xs text-red-400 uppercase tracking-widest mb-4">pop — remover</p>
          <svg viewBox="0 0 160 180" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <!-- Top item leaving -->
            <rect x="20" y="36" width="120" height="36" fill="#2d1515" stroke="#f0545a" stroke-width="1.5"
              stroke-dasharray="4,2" />
            <text x="80" y="56" text-anchor="middle" dominant-baseline="middle" fill="#f0545a"
              font-family="JetBrains Mono, monospace" font-size="13">99</text>
            <!-- Arrow going up -->
            <line x1="80" y1="14" x2="80" y2="28" stroke="#f0545a" stroke-width="1.5" marker-end="url(#arr-up)" />
            <text x="80" y="10" text-anchor="middle" fill="#f0545a" font-family="JetBrains Mono, monospace"
              font-size="10">pop() → 99</text>
            <!-- Remaining -->
            <rect x="20" y="80" width="120" height="36" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <rect x="20" y="116" width="120" height="36" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
            <text x="80" y="100" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
              font-family="JetBrains Mono, monospace" font-size="13">45</text>
            <text x="80" y="136" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
              font-family="JetBrains Mono, monospace" font-size="13">12</text>
            <!-- Base -->
            <rect x="14" y="152" width="132" height="4" fill="#3f3f5a" />
            <defs>
              <marker id="arr-up" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 Z" fill="#f0545a" />
              </marker>
            </defs>
          </svg>
        </div>

      </div>
    </section>

    <!-- Parênteses balanceados -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Caso real — validar parênteses</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Um dos algoritmos clássicos com Stack — verifica se os parênteses de uma expressão estão balanceados.
      </p>
      <div class="space-y-px border border-zinc-800">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">expressão</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">stack final</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">resultado</div>
        </div>
        <div v-for="ex in parenExamples" :key="ex.expr" class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-300">{{ ex.expr }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-500">{{ ex.stack }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="ex.valid ? 'text-emerald-400' : 'text-red-400'">
            {{ ex.valid ? '✓ válido' : '✗ inválido' }}
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const stackItems = [
  { value: 99, y: 42 },
  { value: 45, y: 86 },
  { value: 12, y: 130 },
  { value: 7, y: 174 },
  { value: 31, y: 218 },
]

const parenExamples = [
  { expr: '( [ { } ] )', stack: '[]', valid: true },
  { expr: '( [ ) ]', stack: '[ (', valid: false },
  { expr: '{ ( ) }', stack: '[]', valid: true },
  { expr: '( ( ( )', stack: '( ( (', valid: false },
]
</script>