<template>
  <div class="max-w-2xl space-y-8">
    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Uma <span class="text-zinc-100 font-medium">Queue</span> é uma estrutura
        <span class="text-violet-400">FIFO</span> — First In, First Out. Imagina uma fila de supermercado — o primeiro a
        chegar é o primeiro a ser atendido. Elementos entram pelo <span class="text-emerald-400">fim (tail)</span> e
        saem pelo <span class="text-violet-400">início (head)</span>.
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

    <!-- Stack vs Queue -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Stack vs Queue</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600"></div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Stack</div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Queue</div>
        <template v-for="row in comparison" :key="row.label">
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-500">{{ row.label }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-300">{{ row.stack }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-300">{{ row.queue }}</div>
        </template>
      </div>
    </section>

    <!-- Casos de uso reais -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Onde é usada no mundo real</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div v-for="use in realWorld" :key="use.title" class="bg-zinc-900 p-4">
          <p class="font-mono text-sm text-violet-400 mb-1">{{ use.title }}</p>
          <p class="text-sm text-zinc-400">{{ use.desc }}</p>
          <p class="font-mono text-xs text-zinc-600 mt-2">{{ use.example }}</p>
        </div>
      </div>
    </section>

    <!-- BFS -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Queue no BFS</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        O algoritmo <span class="text-violet-400">Breadth-First Search</span> usa uma Queue para explorar grafos e
        árvores nível a nível — garante que os nós mais próximos são visitados primeiro.
      </p>
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <pre
          class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"
        ><span class="text-violet-400">function</span> <span class="text-emerald-400">bfs</span>(graph, start) {
  <span class="text-violet-400">const</span> queue = <span class="text-violet-400">new</span> <span class="text-emerald-400">Queue</span>()
  <span class="text-violet-400">const</span> visited = <span class="text-violet-400">new</span> Set()

  queue.<span class="text-emerald-400">enqueue</span>(start)
  visited.<span class="text-emerald-400">add</span>(start)

  <span class="text-violet-400">while</span> (!queue.<span class="text-emerald-400">isEmpty</span>()) {
    <span class="text-violet-400">const</span> node = queue.<span class="text-emerald-400">dequeue</span>()
    <span class="text-zinc-500">// processa node...</span>

    <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> neighbor <span class="text-violet-400">of</span> graph[node]) {
      <span class="text-violet-400">if</span> (!visited.<span class="text-emerald-400">has</span>(neighbor)) {
        visited.<span class="text-emerald-400">add</span>(neighbor)
        queue.<span class="text-emerald-400">enqueue</span>(neighbor)
      }
    }
  }
}</pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const operations = [
  { name: 'enqueue(x)', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Adiciona elemento no fim' },
  { name: 'dequeue()', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Remove e devolve o elemento do início' },
  { name: 'peek()', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Lê o início sem remover' },
  { name: 'isEmpty()', complexity: 'O(1)', color: 'text-emerald-400', desc: 'Verifica se a queue está vazia' },
]

const comparison = [
  { label: 'Ordem', stack: 'LIFO', queue: 'FIFO' },
  { label: 'Inserção em', stack: 'topo', queue: 'tail' },
  { label: 'Remoção em', stack: 'topo', queue: 'head' },
  { label: 'Operação add', stack: 'push()', queue: 'enqueue()' },
  { label: 'Operação rem', stack: 'pop()', queue: 'dequeue()' },
]

const realWorld = [
  {
    title: 'Sistemas de impressão',
    desc: 'Documentos são impressos pela ordem em que chegaram.',
    example: 'Print spooler do OS',
  },
  {
    title: 'BFS em grafos',
    desc: 'Explora nós nível a nível — caminho mais curto em grafos não pesados.',
    example: 'GPS, redes sociais',
  },
  {
    title: 'Event loop',
    desc: 'O JavaScript processa eventos e callbacks numa queue.',
    example: 'Node.js, browsers',
  },
  {
    title: 'Sistemas de mensagens',
    desc: 'Mensagens são processadas pela ordem de chegada.',
    example: 'RabbitMQ, Kafka, SQS',
  },
]
</script>
