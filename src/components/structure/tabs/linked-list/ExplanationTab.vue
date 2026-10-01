<template>
  <div class="max-w-2xl space-y-8">
    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Uma <span class="text-zinc-100 font-medium">Linked List</span> é uma sequência de
        <span class="text-violet-400">nós</span> onde cada nó contém um <span class="text-violet-400">valor</span> e um
        <span class="text-emerald-400">ponteiro</span> para o nó seguinte. Ao contrário do Array, os nós
        <span class="text-zinc-100">não estão em memória contígua</span>
        — estão espalhados e ligados por referências.
      </p>
    </section>

    <!-- Tipos -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Tipos de Linked List</h2>
      <div class="space-y-px border border-zinc-800">
        <div v-for="type in types" :key="type.name" class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3">
            <p class="font-mono text-sm text-zinc-100">{{ type.name }}</p>
          </div>
          <div class="bg-zinc-900 px-4 py-3 col-span-2">
            <p class="text-sm text-zinc-400">{{ type.desc }}</p>
            <p class="font-mono text-xs text-violet-400 mt-1">{{ type.example }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Complexidade -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Complexidade</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div v-for="op in operations" :key="op.name" class="bg-zinc-900 px-5 py-4">
          <p class="font-mono text-sm text-zinc-100 mb-1">{{ op.name }}</p>
          <p class="font-mono text-lg" :class="op.color">{{ op.complexity }}</p>
          <p class="text-xs text-zinc-600 mt-1">{{ op.note }}</p>
        </div>
      </div>
    </section>

    <!-- Array vs Linked List -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Array vs Linked List</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-950 px-4 py-3 font-mono text-xs text-zinc-600 uppercase tracking-widest">Operação</div>
        <div class="bg-zinc-950 px-4 py-3 font-mono text-xs text-zinc-600 uppercase tracking-widest">Array</div>
        <div class="bg-zinc-950 px-4 py-3 font-mono text-xs text-zinc-600 uppercase tracking-widest">Linked List</div>
        <template v-for="row in comparison" :key="row.op">
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-400">{{ row.op }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.arrayColor">{{ row.array }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.llColor">{{ row.ll }}</div>
        </template>
      </div>
    </section>

    <!-- Como o computador vê -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Como o computador vê</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        Cada nó é um objeto em memória com dois campos — o <span class="text-violet-400">valor</span> e o
        <span class="text-emerald-400">endereço</span> do próximo nó. O último nó aponta para
        <code class="text-red-400 font-mono">null</code>.
      </p>
      <div class="space-y-px border border-zinc-800">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">nó</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">endereço</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">valor</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">next →</div>
        </div>
        <div v-for="node in memoryView" :key="node.addr" class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-500">{{ node.name }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-violet-400">{{ node.addr }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-100">{{ node.value }}</div>
          <div
            class="bg-zinc-900 px-4 py-3 font-mono text-sm"
            :class="node.next === 'null' ? 'text-red-400' : 'text-emerald-400'"
          >
            {{ node.next }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const types = [
  {
    name: 'Singly Linked',
    desc: 'Cada nó aponta apenas para o seguinte.',
    example: 'A → B → C → null',
  },
  {
    name: 'Doubly Linked',
    desc: 'Cada nó aponta para o seguinte e para o anterior.',
    example: 'null ← A ⇄ B ⇄ C → null',
  },
  {
    name: 'Circular',
    desc: 'O último nó aponta de volta para o primeiro.',
    example: 'A → B → C → A',
  },
]

const operations = [
  { name: 'Acesso por índice', complexity: 'O(n)', color: 'text-amber-400', note: 'Tem de percorrer desde o head' },
  { name: 'Pesquisa', complexity: 'O(n)', color: 'text-amber-400', note: 'Linear scan' },
  { name: 'Inserção no início', complexity: 'O(1)', color: 'text-emerald-400', note: 'Apenas atualiza o head' },
  { name: 'Inserção no fim', complexity: 'O(n)', color: 'text-amber-400', note: 'O(1) se tiver tail pointer' },
  { name: 'Inserção no meio', complexity: 'O(n)', color: 'text-amber-400', note: 'Percorre até à posição' },
  { name: 'Remoção no início', complexity: 'O(1)', color: 'text-emerald-400', note: 'Apenas atualiza o head' },
]

const comparison = [
  { op: 'Acesso por índice', array: 'O(1)', arrayColor: 'text-emerald-400', ll: 'O(n)', llColor: 'text-amber-400' },
  { op: 'Inserção no início', array: 'O(n)', arrayColor: 'text-amber-400', ll: 'O(1)', llColor: 'text-emerald-400' },
  { op: 'Inserção no fim', array: 'O(1)', arrayColor: 'text-emerald-400', ll: 'O(n)*', llColor: 'text-amber-400' },
  { op: 'Inserção no meio', array: 'O(n)', arrayColor: 'text-amber-400', ll: 'O(n)', llColor: 'text-amber-400' },
  { op: 'Memória extra', array: 'O(1)', arrayColor: 'text-emerald-400', ll: 'O(n)', llColor: 'text-amber-400' },
  { op: 'Cache friendly', array: 'Sim', arrayColor: 'text-emerald-400', ll: 'Não', llColor: 'text-red-400' },
]

const memoryView = [
  { name: 'head', addr: '0x1A00', value: 12, next: '0x1B00' },
  { name: 'nó 2', addr: '0x1B00', value: 45, next: '0x1C00' },
  { name: 'nó 3', addr: '0x1C00', value: 7, next: '0x1D00' },
  { name: 'tail', addr: '0x1D00', value: 93, next: 'null' },
]
</script>
