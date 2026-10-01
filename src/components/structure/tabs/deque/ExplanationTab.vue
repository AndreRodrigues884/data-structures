<template>
  <div class="max-w-2xl space-y-8">
    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Um <span class="text-zinc-100 font-medium">Deque</span> (Double-Ended Queue) é uma estrutura que combina o
        melhor do <span class="text-violet-400">Stack</span> e da <span class="text-emerald-400">Queue</span> — podes
        inserir e remover em <span class="text-zinc-100">ambas as extremidades</span> em O(1). É a estrutura mais
        flexível para operações nas pontas.
      </p>
    </section>

    <!-- Operações -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Operações principais</h2>
      <div class="space-y-px border border-zinc-800">
        <div v-for="op in operations" :key="op.name" class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3">
            <p class="font-mono text-sm text-violet-400">{{ op.name }}</p>
          </div>
          <div class="bg-zinc-900 px-4 py-3">
            <p class="font-mono text-sm" :class="op.color">{{ op.complexity }}</p>
          </div>
          <div class="bg-zinc-900 px-4 py-3 col-span-2">
            <p class="text-sm text-zinc-400">{{ op.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Deque vs Stack vs Queue -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Deque vs Stack vs Queue</h2>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600"></div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Stack</div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Queue</div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Deque</div>
        <template v-for="row in comparison" :key="row.label">
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-500">{{ row.label }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.stackColor">{{ row.stack }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.queueColor">{{ row.queue }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.dequeColor">{{ row.deque }}</div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const operations = [
  { name: 'pushFront(x)', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Adiciona no início' },
  { name: 'pushBack(x)', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Adiciona no fim' },
  { name: 'popFront()', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Remove do início' },
  { name: 'popBack()', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Remove do fim' },
  { name: 'peekFront()', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Lê o início sem remover' },
  { name: 'peekBack()', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Lê o fim sem remover' },
]

const comparison = [
  {
    label: 'Insert front',
    stack: 'push ✓',
    stackColor: 'text-emerald-400',
    queue: '✗',
    queueColor: 'text-red-400',
    deque: '✓',
    dequeColor: 'text-emerald-400',
  },
  {
    label: 'Insert back',
    stack: '✗',
    stackColor: 'text-red-400',
    queue: 'enqueue ✓',
    queueColor: 'text-emerald-400',
    deque: '✓',
    dequeColor: 'text-emerald-400',
  },
  {
    label: 'Remove front',
    stack: '✓',
    stackColor: 'text-emerald-400',
    queue: 'dequeue ✓',
    queueColor: 'text-emerald-400',
    deque: '✓',
    dequeColor: 'text-emerald-400',
  },
  {
    label: 'Remove back',
    stack: '✗',
    stackColor: 'text-red-400',
    queue: '✗',
    queueColor: 'text-red-400',
    deque: '✓',
    dequeColor: 'text-emerald-400',
  },
]
</script>
