<template>
  <div class="max-w-2xl space-y-8">
    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Um <span class="text-zinc-100 font-medium">HashMap</span> é uma estrutura de pares
        <span class="text-violet-400">chave → valor</span> que usa uma
        <span class="text-emerald-400">função de hash</span> para converter a chave num índice de array. Isto permite
        acesso, inserção e remoção em <span class="text-zinc-100">O(1) médio</span> — independente do tamanho.
      </p>
    </section>

    <!-- Como funciona o hash -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Como funciona a função de hash</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        A função de hash converte qualquer chave num número inteiro que serve de índice. Uma boa função de hash
        distribui as chaves uniformemente para evitar
        <span class="text-amber-400">colisões</span>.
      </p>
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <pre
          class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"
        ><span class="text-zinc-500">// Hash simples para strings</span>
<span class="text-violet-400">function</span> <span class="text-emerald-400">hash</span>(key: <span class="text-amber-400">string</span>, size: <span class="text-amber-400">number</span>): <span class="text-amber-400">number</span> {
  <span class="text-violet-400">let</span> hash = <span class="text-emerald-400">0</span>
  <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> char <span class="text-violet-400">of</span> key) {
    hash = (hash + char.<span class="text-emerald-400">charCodeAt</span>(<span class="text-emerald-400">0</span>)) % size
  }
  <span class="text-violet-400">return</span> hash
}

<span class="text-emerald-400">hash</span>(<span class="text-emerald-400">"name"</span>, <span class="text-emerald-400">10</span>)  <span class="text-zinc-500">// → 3</span>
<span class="text-emerald-400">hash</span>(<span class="text-emerald-400">"age"</span>, <span class="text-emerald-400">10</span>)   <span class="text-zinc-500">// → 7</span>
<span class="text-emerald-400">hash</span>(<span class="text-emerald-400">"city"</span>, <span class="text-emerald-400">10</span>)  <span class="text-zinc-500">// → 1</span></pre>
      </div>
    </section>

    <!-- Colisões -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Colisões</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        Uma <span class="text-amber-400">colisão</span> acontece quando duas chaves diferentes produzem o mesmo índice.
        Existem duas estratégias principais para resolver:
      </p>
      <div class="space-y-px border border-zinc-800">
        <div
          v-for="strategy in collisionStrategies"
          :key="strategy.name"
          class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800"
        >
          <div class="bg-zinc-900 px-4 py-3">
            <p class="font-mono text-sm text-violet-400">{{ strategy.name }}</p>
          </div>
          <div class="bg-zinc-900 px-4 py-3 col-span-2">
            <p class="text-sm text-zinc-400">{{ strategy.desc }}</p>
            <p class="font-mono text-xs text-zinc-600 mt-1">{{ strategy.note }}</p>
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
          <div class="flex gap-3 items-baseline">
            <p class="font-mono text-base" :class="op.avgColor">{{ op.avg }}</p>
            <p class="font-mono text-xs text-zinc-600">médio</p>
            <p class="font-mono text-base text-amber-400">{{ op.worst }}</p>
            <p class="font-mono text-xs text-zinc-600">pior</p>
          </div>
          <p class="text-xs text-zinc-600 mt-1">{{ op.note }}</p>
        </div>
      </div>
    </section>

    <!-- Load factor -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Load Factor</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        O <span class="text-violet-400">load factor</span> é a razão entre o número de elementos e o tamanho do array
        interno. Quando ultrapassa <span class="text-amber-400">0.7</span>, o HashMap faz
        <span class="text-emerald-400">rehashing</span> — duplica o tamanho e redistribui todos os elementos para manter
        O(1).
      </p>
      <div class="space-y-px border border-zinc-800">
        <div v-for="lf in loadFactors" :key="lf.value" class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="lf.color">{{ lf.value }}</div>
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-400">{{ lf.desc }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-xs" :class="lf.color">{{ lf.perf }}</div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Onde é vantajoso?</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        O HashMap é a resposta quando a pergunta é
        <span class="text-violet-400">"já vi isto antes?"</span> ou
        <span class="text-emerald-400">"o que está associado a X?"</span>. É a estrutura mais versátil a seguir ao Array
        — vais usá-la em 30 a 40% dos problemas de algoritmos.
      </p>

      <div class="space-y-px border border-zinc-800">
        <div
          v-for="pattern in powerPatterns"
          :key="pattern.question"
          class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800"
        >
          <div class="bg-zinc-900 px-4 py-3">
            <p class="text-sm text-zinc-400 italic">"{{ pattern.question }}"</p>
          </div>
          <div class="bg-zinc-900 px-4 py-3">
            <p class="font-mono text-sm text-violet-400">{{ pattern.solution }}</p>
          </div>
          <div class="bg-zinc-900 px-4 py-3">
            <p class="font-mono text-xs text-zinc-600">{{ pattern.example }}</p>
          </div>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-900 px-4 py-3">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">sem HashMap</p>
          <p class="font-mono text-sm text-red-400">O(n²) — dois loops</p>
          <p class="text-xs text-zinc-600 mt-1">percorre o array para cada elemento</p>
        </div>
        <div class="bg-zinc-900 px-4 py-3">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">com HashMap</p>
          <p class="font-mono text-sm text-emerald-400">O(n) — um loop</p>
          <p class="text-xs text-zinc-600 mt-1">lookup instantâneo em O(1)</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const collisionStrategies = [
  {
    name: 'Chaining',
    desc: 'Cada bucket contém uma Linked List. Colisões são adicionadas à lista.',
    note: 'Mais comum — usado em Java HashMap, Python dict',
  },
  {
    name: 'Open Addressing',
    desc: 'Quando há colisão, procura o próximo bucket vazio.',
    note: 'Linear probing, quadratic probing, double hashing',
  },
]

const operations = [
  { name: 'get(key)', avg: 'O(1)', avgColor: 'text-emerald-400', worst: 'O(n)', note: 'Pior caso com muitas colisões' },
  { name: 'set(key)', avg: 'O(1)', avgColor: 'text-emerald-400', worst: 'O(n)', note: 'Pior caso com muitas colisões' },
  {
    name: 'delete(key)',
    avg: 'O(1)',
    avgColor: 'text-emerald-400',
    worst: 'O(n)',
    note: 'Pior caso com muitas colisões',
  },
  { name: 'has(key)', avg: 'O(1)', avgColor: 'text-emerald-400', worst: 'O(n)', note: 'Pior caso com muitas colisões' },
]

const loadFactors = [
  {
    value: '< 0.5',
    desc: 'Poucos elementos, muito espaço vazio',
    perf: 'Rápido, desperdiça memória',
    color: 'text-emerald-400',
  },
  {
    value: '0.5–0.7',
    desc: 'Equilíbrio ideal entre espaço e speed',
    perf: 'Performance ótima',
    color: 'text-emerald-400',
  },
  { value: '> 0.7', desc: 'Muitas colisões, rehashing necessário', perf: 'Degrada para O(n)', color: 'text-amber-400' },
  { value: '1.0', desc: 'Array completamente cheio', perf: 'O(n) garantido', color: 'text-red-400' },
]

const powerPatterns = [
  { question: 'já vi este valor?', solution: 'HashMap/Set', example: 'detetar duplicados' },
  { question: 'quantas vezes aparece X?', solution: 'HashMap contador', example: 'frequência de letras' },
  { question: 'o que está associado a X?', solution: 'HashMap lookup', example: 'Two Sum, Group Anagrams' },
  { question: 'preciso de cache?', solution: 'HashMap memo', example: 'Fibonacci, DFS' },
]
</script>
