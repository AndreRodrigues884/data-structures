<template>
  <div class="max-w-2xl space-y-8">

    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Um <span class="text-zinc-100 font-medium">Disjoint Set</span> (também chamado
        <span class="text-violet-400">Union-Find</span>) é uma estrutura que mantém
        uma coleção de conjuntos <span class="text-zinc-100">disjuntos</span> — sem
        elementos em comum. Permite duas operações fundamentais:
        <span class="text-emerald-400">union</span> (juntar dois conjuntos) e
        <span class="text-violet-400">find</span> (encontrar o representante de um conjunto).
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
            <p class="font-mono text-sm text-emerald-400">{{ op.complexity }}</p>
          </div>
          <div class="bg-zinc-900 px-4 py-3 col-span-2">
            <p class="text-sm text-zinc-400">{{ op.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Como funciona -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Como funciona</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        Internamente usa um array <code class="text-violet-400 font-mono">parent[]</code>
        onde cada elemento aponta para o seu pai. A raiz de cada árvore é o
        <span class="text-emerald-400">representante</span> do conjunto.
      </p>
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <pre class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"><span class="text-zinc-500">// Inicialmente cada elemento é o seu próprio pai</span>
parent = [<span class="text-emerald-400">0</span>, <span class="text-emerald-400">1</span>, <span class="text-emerald-400">2</span>, <span class="text-emerald-400">3</span>, <span class="text-emerald-400">4</span>]
<span class="text-zinc-500">//        ↑   ↑   ↑   ↑   ↑</span>
<span class="text-zinc-500">//        0   1   2   3   4  (cada um é raiz)</span>

<span class="text-violet-400">union</span>(<span class="text-emerald-400">0</span>, <span class="text-emerald-400">1</span>) → parent = [<span class="text-violet-400">0</span>, <span class="text-violet-400">0</span>, <span class="text-emerald-400">2</span>, <span class="text-emerald-400">3</span>, <span class="text-emerald-400">4</span>]
<span class="text-violet-400">union</span>(<span class="text-emerald-400">2</span>, <span class="text-emerald-400">3</span>) → parent = [<span class="text-violet-400">0</span>, <span class="text-violet-400">0</span>, <span class="text-violet-400">2</span>, <span class="text-violet-400">2</span>, <span class="text-emerald-400">4</span>]
<span class="text-violet-400">union</span>(<span class="text-emerald-400">0</span>, <span class="text-emerald-400">2</span>) → parent = [<span class="text-violet-400">0</span>, <span class="text-violet-400">0</span>, <span class="text-violet-400">0</span>, <span class="text-violet-400">2</span>, <span class="text-emerald-400">4</span>]

<span class="text-violet-400">find</span>(<span class="text-emerald-400">3</span>) → <span class="text-emerald-400">0</span>  <span class="text-zinc-500">// 3→2→0 (raiz)</span>
<span class="text-violet-400">connected</span>(<span class="text-emerald-400">1</span>, <span class="text-emerald-400">3</span>) → <span class="text-violet-400">true</span>  <span class="text-zinc-500">// ambos têm raiz 0</span></pre>
      </div>
    </section>

    <!-- Otimizações -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Otimizações</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div v-for="opt in optimizations" :key="opt.name" class="bg-zinc-900 p-4">
          <p class="font-mono text-sm text-violet-400 mb-1">{{ opt.name }}</p>
          <p class="text-sm text-zinc-400 mb-2">{{ opt.desc }}</p>
          <p class="font-mono text-xs text-emerald-400">{{ opt.result }}</p>
        </div>
      </div>
    </section>

    <!-- Quando usar -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Quando usar</h2>
      <div class="space-y-2">
        <div
          v-for="item in useCases"
          :key="item.text"
          class="flex items-start gap-3 text-zinc-400 text-sm"
        >
          <span :class="item.type === 'pro' ? 'text-emerald-400' : 'text-red-400'" class="mt-0.5">
            {{ item.type === 'pro' ? '✓' : '✗' }}
          </span>
          {{ item.text }}
        </div>
      </div>
    </section>

    <!-- No mundo real -->
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
const operations = [
  { name: 'find(x)',        complexity: 'O(α(n))', desc: 'Encontra o representante do conjunto de x'          },
  { name: 'union(x, y)',    complexity: 'O(α(n))', desc: 'Une os conjuntos de x e y'                         },
  { name: 'connected(x,y)', complexity: 'O(α(n))', desc: 'Verifica se x e y pertencem ao mesmo conjunto'     },
  { name: 'makeSet(x)',     complexity: 'O(1)',     desc: 'Cria um novo conjunto com apenas o elemento x'     },
]

const optimizations = [
  {
    name: 'Union by Rank',
    desc: 'Junta sempre a árvore mais pequena à maior, mantendo a altura mínima.',
    result: 'Evita árvores degeneradas — O(log n) sem path compression'
  },
  {
    name: 'Path Compression',
    desc: 'Durante o find(), aponta todos os nós diretamente para a raiz.',
    result: 'Amortiza o custo — O(α(n)) onde α é a função de Ackermann inversa'
  },
]

const useCases = [
  { type: 'pro', text: 'Detetar ciclos num grafo'                                    },
  { type: 'pro', text: 'Kruskal\'s algorithm — Minimum Spanning Tree'               },
  { type: 'pro', text: 'Verificar conectividade em redes'                            },
  { type: 'pro', text: 'Agrupar pixels em imagens (connected components)'            },
  { type: 'con', text: 'Precisas de listar elementos de um conjunto'                 },
  { type: 'con', text: 'Precisas de remover elementos de conjuntos'                  },
]

const realWorld = [
  { title: 'Kruskal MST',       desc: 'Constrói a árvore de expansão mínima verificando ciclos com Union-Find.' },
  { title: 'Redes sociais',     desc: 'Grupos de amigos conectados — find determina se dois utilizadores estão ligados.' },
  { title: 'Processamento de imagem', desc: 'Deteção de regiões conectadas (connected components) em imagens.' },
  { title: 'LeetCode',          desc: 'Number of Provinces, Redundant Connection, Accounts Merge.' },
]
</script>