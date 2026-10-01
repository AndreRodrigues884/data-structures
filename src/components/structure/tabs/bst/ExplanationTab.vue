<template>
  <div class="max-w-2xl space-y-8">
    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Uma <span class="text-zinc-100 font-medium">BST</span> é uma Binary Tree com uma regra fundamental — para cada
        nó, todos os valores à <span class="text-violet-400">esquerda são menores</span> e todos os valores à
        <span class="text-emerald-400">direita são maiores</span>. Esta propriedade permite pesquisa, inserção e remoção
        em <span class="text-zinc-100">O(log n)</span> numa árvore balanceada.
      </p>
    </section>

    <!-- Propriedade BST -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">A propriedade BST</h2>
      <div class="bg-zinc-900 border border-zinc-800 p-4 mb-4">
        <pre
          class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"
        >         <span class="text-amber-400">8</span>
        / \
      <span class="text-violet-400">3</span>     <span class="text-emerald-400">10</span>
     / \      \
   <span class="text-violet-400">1</span>   <span class="text-violet-400">6</span>     <span class="text-emerald-400">14</span>
      / \    /
    <span class="text-violet-400">4</span>   <span class="text-violet-400">7</span>  <span class="text-emerald-400">13</span>

<span class="text-zinc-500">// Para o nó 8 (root):</span>
<span class="text-zinc-500">// tudo à esquerda (3,1,6,4,7) &lt; 8</span>
<span class="text-zinc-500">// tudo à direita (10,14,13) &gt; 8</span></pre>
      </div>
    </section>

    <!-- Complexidade -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Complexidade</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div v-for="op in operations" :key="op.name" class="bg-zinc-900 px-5 py-4">
          <p class="font-mono text-sm text-zinc-100 mb-1">{{ op.name }}</p>
          <div class="flex gap-3 items-baseline">
            <p class="font-mono text-base" :class="op.avgColor">{{ op.avg }}</p>
            <p class="font-mono text-xs text-zinc-600">médio</p>
            <p class="font-mono text-base text-red-400">{{ op.worst }}</p>
            <p class="font-mono text-xs text-zinc-600">pior</p>
          </div>
          <p class="text-xs text-zinc-600 mt-1">{{ op.note }}</p>
        </div>
      </div>
    </section>

    <!-- BST vs Array vs HashMap -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">BST vs Array vs HashMap</h2>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600"></div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Array</div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">HashMap</div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">BST</div>
        <template v-for="row in comparison" :key="row.op">
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-500">{{ row.op }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.arrayColor">{{ row.array }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.hashColor">{{ row.hash }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.bstColor">{{ row.bst }}</div>
        </template>
      </div>
    </section>

    <!-- Balanceamento -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O problema do balanceamento</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        Se inserires elementos em ordem crescente, a BST degenera numa
        <span class="text-red-400">Linked List</span> — O(n) em tudo. Árvores auto-balanceadas como
        <span class="text-violet-400">AVL</span> e <span class="text-violet-400">Red-Black Tree</span> resolvem isto
        garantindo sempre O(log n).
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3">balanceada ✓</p>
          <pre class="font-mono text-xs text-zinc-300 overflow-x-auto">    <span class="text-emerald-400">4</span>
   / \
  <span class="text-zinc-300">2</span>   <span class="text-zinc-300">6</span>
 / \ / \
<span class="text-zinc-300">1</span> <span class="text-zinc-300">3</span><span class="text-zinc-300">5</span> <span class="text-zinc-300">7</span>

height = 2 → O(log n)</pre>
        </div>
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-red-400 uppercase tracking-widest mb-3">desbalanceada ✗</p>
          <pre class="font-mono text-xs text-zinc-300 overflow-x-auto"><span class="text-red-400">1</span>
 \
  <span class="text-zinc-300">2</span>
   \
    <span class="text-zinc-300">3</span>
     \
      <span class="text-zinc-300">4</span>

height = 3 → O(n)</pre>
        </div>
      </div>
    </section>

    <!-- Quando usar -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Quando usar</h2>
      <div class="space-y-2">
        <div v-for="item in useCases" :key="item.text" class="flex items-start gap-3 text-zinc-400 text-sm">
          <span :class="item.type === 'pro' ? 'text-emerald-400' : 'text-red-400'" class="mt-0.5">
            {{ item.type === 'pro' ? '✓' : '✗' }}
          </span>
          {{ item.text }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const operations = [
  {
    name: 'Search',
    avg: 'O(log n)',
    avgColor: 'text-emerald-400',
    worst: 'O(n)',
    note: 'Pior caso: árvore desbalanceada',
  },
  {
    name: 'Insert',
    avg: 'O(log n)',
    avgColor: 'text-emerald-400',
    worst: 'O(n)',
    note: 'Pior caso: árvore desbalanceada',
  },
  {
    name: 'Delete',
    avg: 'O(log n)',
    avgColor: 'text-emerald-400',
    worst: 'O(n)',
    note: 'Pior caso: árvore desbalanceada',
  },
  { name: 'Min/Max', avg: 'O(log n)', avgColor: 'text-emerald-400', worst: 'O(n)', note: 'Leftmost / rightmost node' },
]

const comparison = [
  {
    op: 'Search',
    array: 'O(n)',
    arrayColor: 'text-amber-400',
    hash: 'O(1)',
    hashColor: 'text-emerald-400',
    bst: 'O(log n)',
    bstColor: 'text-emerald-400',
  },
  {
    op: 'Insert',
    array: 'O(1)',
    arrayColor: 'text-emerald-400',
    hash: 'O(1)',
    hashColor: 'text-emerald-400',
    bst: 'O(log n)',
    bstColor: 'text-emerald-400',
  },
  {
    op: 'Delete',
    array: 'O(n)',
    arrayColor: 'text-amber-400',
    hash: 'O(1)',
    hashColor: 'text-emerald-400',
    bst: 'O(log n)',
    bstColor: 'text-emerald-400',
  },
  {
    op: 'Ordenado',
    array: 'O(n log n)',
    arrayColor: 'text-amber-400',
    hash: 'N/A',
    hashColor: 'text-red-400',
    bst: 'O(n)',
    bstColor: 'text-emerald-400',
  },
  {
    op: 'Min/Max',
    array: 'O(n)',
    arrayColor: 'text-amber-400',
    hash: 'O(n)',
    hashColor: 'text-amber-400',
    bst: 'O(log n)',
    bstColor: 'text-emerald-400',
  },
]

const useCases = [
  { type: 'pro', text: 'Precisas de dados ordenados e pesquisa eficiente' },
  { type: 'pro', text: 'Encontrar min/max rapidamente' },
  { type: 'pro', text: 'Range queries — todos os valores entre X e Y' },
  { type: 'pro', text: 'Floor/Ceiling — valor mais próximo de X' },
  { type: 'con', text: 'Lookup simples por chave — usa HashMap' },
  { type: 'con', text: 'Dados não ordenados e sem range queries — usa HashMap' },
  { type: 'con', text: 'Precisas de garantir O(log n) — usa AVL ou Red-Black Tree' },
]
</script>
