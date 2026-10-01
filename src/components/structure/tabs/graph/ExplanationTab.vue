<template>
  <div class="max-w-2xl space-y-8">
    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Um <span class="text-zinc-100 font-medium">Graph</span> é um conjunto de
        <span class="text-violet-400">vértices (nós)</span> ligados por
        <span class="text-emerald-400">arestas (edges)</span>. Ao contrário de uma Tree, um Graph não tem raiz, pode ter
        ciclos, e cada nó pode ligar-se a qualquer outro nó. É a estrutura mais
        <span class="text-zinc-100">geral e poderosa</span>
        para modelar relações do mundo real.
      </p>
    </section>

    <!-- Tipos -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Tipos de Graph</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div v-for="type in types" :key="type.name" class="bg-zinc-900 p-4">
          <p class="font-mono text-sm text-violet-400 mb-1">{{ type.name }}</p>
          <p class="text-sm text-zinc-400">{{ type.desc }}</p>
          <p class="font-mono text-xs text-zinc-600 mt-2">{{ type.example }}</p>
        </div>
      </div>
    </section>

    <!-- Representações -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Representações em memória</h2>
      <div class="space-y-4">
        <!-- Adjacency List -->
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3">Adjacency List — mais comum</p>
          <pre
            class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"
          ><span class="text-violet-400">const</span> graph = {
  <span class="text-emerald-400">A</span>: [<span class="text-amber-400">'B'</span>, <span class="text-amber-400">'C'</span>],
  <span class="text-emerald-400">B</span>: [<span class="text-amber-400">'A'</span>, <span class="text-amber-400">'D'</span>],
  <span class="text-emerald-400">C</span>: [<span class="text-amber-400">'A'</span>, <span class="text-amber-400">'D'</span>],
  <span class="text-emerald-400">D</span>: [<span class="text-amber-400">'B'</span>, <span class="text-amber-400">'C'</span>],
}
<span class="text-zinc-500">// Espaço: O(V + E)</span></pre>
        </div>

        <!-- Adjacency Matrix -->
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">Adjacency Matrix — lookup O(1)</p>
          <pre
            class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"
          ><span class="text-zinc-500">//   A  B  C  D</span>
<span class="text-violet-400">const</span> matrix = [
  [<span class="text-emerald-400">0</span>, <span class="text-emerald-400">1</span>, <span class="text-emerald-400">1</span>, <span class="text-emerald-400">0</span>],  <span class="text-zinc-500">// A</span>
  [<span class="text-emerald-400">1</span>, <span class="text-emerald-400">0</span>, <span class="text-emerald-400">0</span>, <span class="text-emerald-400">1</span>],  <span class="text-zinc-500">// B</span>
  [<span class="text-emerald-400">1</span>, <span class="text-emerald-400">0</span>, <span class="text-emerald-400">0</span>, <span class="text-emerald-400">1</span>],  <span class="text-zinc-500">// C</span>
  [<span class="text-emerald-400">0</span>, <span class="text-emerald-400">1</span>, <span class="text-emerald-400">1</span>, <span class="text-emerald-400">0</span>],  <span class="text-zinc-500">// D</span>
]
<span class="text-zinc-500">// Espaço: O(V²) — melhor para grafos densos</span></pre>
        </div>
      </div>
    </section>

    <!-- Complexidade -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Complexidade</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600"></div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Adj. List</div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Adj. Matrix</div>
        <template v-for="row in complexity" :key="row.op">
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-500">{{ row.op }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.listColor">{{ row.list }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.matrixColor">{{ row.matrix }}</div>
        </template>
      </div>
    </section>

    <!-- Algoritmos -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Algoritmos principais</h2>
      <div class="space-y-px border border-zinc-800">
        <div v-for="algo in algorithms" :key="algo.name" class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3">
            <p class="font-mono text-sm text-violet-400">{{ algo.name }}</p>
            <p class="font-mono text-xs text-zinc-600 mt-1">{{ algo.complexity }}</p>
          </div>
          <div class="bg-zinc-900 px-4 py-3 col-span-2">
            <p class="text-sm text-zinc-400">{{ algo.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quando usar -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">No mundo real</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div v-for="use in realWorld" :key="use.title" class="bg-zinc-900 p-4">
          <p class="font-mono text-sm text-violet-400 mb-1">{{ use.title }}</p>
          <p class="text-sm text-zinc-400">{{ use.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const types = [
  { name: 'Undirected', desc: 'Arestas sem direção — A-B implica B-A.', example: 'Amizades no Facebook' },
  { name: 'Directed (Digraph)', desc: 'Arestas com direção — A→B não implica B→A.', example: 'Seguidores no Twitter' },
  { name: 'Weighted', desc: 'Arestas com peso — distância, custo, tempo.', example: 'Google Maps, rotas' },
  { name: 'Cyclic', desc: 'Tem pelo menos um ciclo — podes voltar ao início.', example: 'Redes de estradas' },
  { name: 'Acyclic (DAG)', desc: 'Sem ciclos — Directed Acyclic Graph.', example: 'Dependências npm, Git' },
  { name: 'Connected', desc: 'Existe caminho entre qualquer par de vértices.', example: 'Internet, redes sociais' },
]

const complexity = [
  { op: 'Add vertex', list: 'O(1)', listColor: 'text-emerald-400', matrix: 'O(V²)', matrixColor: 'text-amber-400' },
  { op: 'Add edge', list: 'O(1)', listColor: 'text-emerald-400', matrix: 'O(1)', matrixColor: 'text-emerald-400' },
  { op: 'Remove edge', list: 'O(E)', listColor: 'text-amber-400', matrix: 'O(1)', matrixColor: 'text-emerald-400' },
  { op: 'Has edge?', list: 'O(V)', listColor: 'text-amber-400', matrix: 'O(1)', matrixColor: 'text-emerald-400' },
  { op: 'BFS / DFS', list: 'O(V + E)', listColor: 'text-emerald-400', matrix: 'O(V²)', matrixColor: 'text-amber-400' },
  { op: 'Espaço', list: 'O(V + E)', listColor: 'text-emerald-400', matrix: 'O(V²)', matrixColor: 'text-amber-400' },
]

const algorithms = [
  { name: 'BFS', complexity: 'O(V + E)', desc: 'Explora nível a nível — caminho mais curto em grafos não pesados.' },
  { name: 'DFS', complexity: 'O(V + E)', desc: 'Explora o mais fundo possível — deteção de ciclos, topological sort.' },
  { name: 'Dijkstra', complexity: 'O(E log V)', desc: 'Caminho mais curto em grafos pesados com pesos positivos.' },
  { name: 'Topological Sort', complexity: 'O(V + E)', desc: 'Ordena vértices de um DAG — dependências, scheduling.' },
  {
    name: 'Kruskal / Prim',
    complexity: 'O(E log E)',
    desc: 'Minimum Spanning Tree — rede mínima que liga todos os nós.',
  },
]

const realWorld = [
  { title: 'GPS & Mapas', desc: 'Dijkstra encontra o caminho mais curto entre dois pontos.' },
  { title: 'Redes sociais', desc: 'Sugestões de amigos — BFS encontra conexões a N graus de distância.' },
  { title: 'Dependências npm', desc: 'DAG de pacotes — topological sort garante ordem de instalação correta.' },
  { title: 'Web crawling', desc: 'O Google usa BFS para indexar páginas a partir de links.' },
]
</script>
