<template>
  <div class="max-w-2xl space-y-8">

    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Um <span class="text-zinc-100 font-medium">Heap</span> é uma
        <span class="text-violet-400">Binary Tree completa</span> com uma
        propriedade especial — o <span class="text-emerald-400">heap property</span>.
        Num <span class="text-violet-400">Max Heap</span> o pai é sempre
        <span class="text-zinc-100">maior ou igual</span> aos filhos.
        Num <span class="text-emerald-400">Min Heap</span> o pai é sempre
        <span class="text-zinc-100">menor ou igual</span> aos filhos.
        O elemento mais importante está sempre na <span class="text-amber-400">raiz</span>.
      </p>
    </section>

    <!-- Max vs Min -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Max Heap vs Min Heap</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-900 p-5">
          <p class="font-mono text-sm text-violet-400 mb-3">Max Heap</p>
          <p class="text-sm text-zinc-400 mb-3">Pai ≥ filhos. A raiz é sempre o <span
              class="text-violet-400">máximo</span>.</p>
          <pre
            class="font-mono text-xs text-zinc-300 overflow-x-auto">       <span class="text-violet-400">100</span>
      /     \
    <span class="text-zinc-300">19</span>       <span class="text-zinc-300">36</span>
   /  \    /  \
  <span class="text-zinc-300">17</span>   <span class="text-zinc-300">3</span>  <span class="text-zinc-300">25</span>   <span class="text-zinc-300">1</span></pre>
        </div>
        <div class="bg-zinc-900 p-5">
          <p class="font-mono text-sm text-emerald-400 mb-3">Min Heap</p>
          <p class="text-sm text-zinc-400 mb-3">Pai ≤ filhos. A raiz é sempre o <span
              class="text-emerald-400">mínimo</span>.</p>
          <pre
            class="font-mono text-xs text-zinc-300 overflow-x-auto">        <span class="text-emerald-400">1</span>
      /     \
    <span class="text-zinc-300">3</span>        <span class="text-zinc-300">6</span>
   /  \    /  \
  <span class="text-zinc-300">5</span>   <span class="text-zinc-300">9</span>  <span class="text-zinc-300">8</span>   <span class="text-zinc-300">17</span></pre>
        </div>
      </div>
    </section>

    <!-- Array representation -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Representado como Array</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        O Heap é armazenado num <span class="text-violet-400">array simples</span> — não
        precisas de ponteiros. Para um nó no índice <code class="text-emerald-400 font-mono">i</code>:
      </p>
      <div class="space-y-px border border-zinc-800 mb-4">
        <div v-for="formula in formulas" :key="formula.name" class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-400">{{ formula.name }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-violet-400">{{ formula.formula }}</div>
        </div>
      </div>
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">exemplo — Max Heap</p>
        <div class="flex gap-px mb-2">
          <div v-for="(val, i) in heapArray" :key="i"
            class="flex-1 flex flex-col items-center border border-zinc-700 bg-zinc-800 py-2">
            <span class="font-mono text-sm text-zinc-100">{{ val }}</span>
            <span class="font-mono text-xs text-zinc-600 mt-1">{{ i }}</span>
          </div>
        </div>
        <p class="font-mono text-xs text-zinc-600 mt-1">
          pai de arr[3]=17 → arr[⌊(3-1)/2⌋] = arr[1] = 19 ✓
        </p>
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

    <!-- Heapify -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Heapify — o segredo</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        Após inserir ou remover, o Heap pode violar a heap property.
        O <span class="text-violet-400">heapify</span> restaura a propriedade
        trocando nós até tudo estar correto.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-900 p-4">
          <p class="font-mono text-xs text-violet-400 uppercase tracking-widest mb-2">bubble up</p>
          <p class="text-sm text-zinc-400">Após inserção — o novo nó sobe até encontrar o seu lugar.</p>
          <p class="font-mono text-xs text-zinc-600 mt-2">usado em: push()</p>
        </div>
        <div class="bg-zinc-900 p-4">
          <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">bubble down</p>
          <p class="text-sm text-zinc-400">Após remoção da raiz — o último nó desce até ao seu lugar.</p>
          <p class="font-mono text-xs text-zinc-600 mt-2">usado em: pop()</p>
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
const formulas = [
  { name: 'filho esquerdo', formula: '2i + 1' },
  { name: 'filho direito', formula: '2i + 2' },
  { name: 'pai', formula: '⌊(i - 1) / 2⌋' },
]

const heapArray = [100, 19, 36, 17, 3, 25, 1]

const operations = [
  { name: 'peek() — ver máx/mín', complexity: 'O(1)', color: 'text-emerald-400', note: 'Sempre na raiz (índice 0)' },
  { name: 'push() — inserir', complexity: 'O(log n)', color: 'text-amber-400', note: 'Insere no fim + bubble up' },
  { name: 'pop() — remover raiz', complexity: 'O(log n)', color: 'text-amber-400', note: 'Remove raiz + bubble down' },
  { name: 'heapify array', complexity: 'O(n)', color: 'text-amber-400', note: 'Construir heap a partir de array' },
]

const useCases = [
  { type: 'pro', text: 'Priority Queue — processar tarefas por prioridade' },
  { type: 'pro', text: 'Top K elements — encontrar os K maiores/menores em O(n log k)' },
  { type: 'pro', text: 'Heap Sort — ordenação em O(n log n) e O(1) espaço' },
  { type: 'pro', text: 'Dijkstra e A* — algoritmos de caminho mais curto' },
  { type: 'con', text: 'Pesquisa por valor — usa BST ou HashMap' },
  { type: 'con', text: 'Acesso aleatório — usa Array' },
]
</script>