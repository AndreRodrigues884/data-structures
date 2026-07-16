<template>
  <div class="max-w-2xl space-y-8">

    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Uma <span class="text-zinc-100 font-medium">LRU Cache</span> (Least Recently Used)
        é uma cache de <span class="text-emerald-400">capacidade fixa</span> que remove
        automaticamente o elemento <span class="text-violet-400">menos recentemente usado</span>
        quando fica cheia. Combina um <span class="text-zinc-100">HashMap</span> (acesso O(1))
        com uma <span class="text-zinc-100">lista duplamente ligada</span> (reordenar/remover O(1)).
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
        A lista ligada mantém a ordem de utilização — a <span class="text-emerald-400">head</span>
        é o mais recentemente usado, a <span class="text-red-400">tail</span> é o próximo a ser
        removido. O <code class="text-violet-400 font-mono">HashMap</code> guarda
        chave → nó da lista, permitindo saltar direto para qualquer nó sem percorrer a lista.
      </p>
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <pre class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"><span class="text-zinc-500">// capacidade = 3</span>
put(1, 'a') → [<span class="text-emerald-400">1</span>]
put(2, 'b') → [<span class="text-emerald-400">2</span>, 1]
put(3, 'c') → [<span class="text-emerald-400">3</span>, 2, 1]
get(1)      → [<span class="text-emerald-400">1</span>, 3, 2]      <span class="text-zinc-500">// 1 move para o topo</span>
put(4, 'd') → [<span class="text-emerald-400">4</span>, 1, 3]      <span class="text-zinc-500">// cheia — remove 2 (LRU)</span>
<span class="text-zinc-500">//              ↑ MRU        ↑ LRU</span></pre>
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
  { name: 'get(key)',        complexity: 'O(1)', desc: 'Devolve o valor e marca a chave como recém-usada'      },
  { name: 'put(key, value)', complexity: 'O(1)', desc: 'Insere/atualiza; remove o LRU se exceder a capacidade' },
  { name: 'remove(node)',    complexity: 'O(1)', desc: 'Desliga um nó da lista ligada'                          },
  { name: 'moveToHead(node)',complexity: 'O(1)', desc: 'Move um nó para a posição mais recente'                 },
]

const optimizations = [
  {
    name: 'Nós sentinela (dummy head/tail)',
    desc: 'Usar nós fictícios no início e fim evita verificar null constantemente.',
    result: 'Remove/insere sem casos especiais para lista vazia ou com 1 elemento'
  },
  {
    name: 'JS Map em vez de lista manual',
    desc: 'Map do JavaScript preserva ordem de inserção — reinserir uma chave move-a para o fim.',
    result: 'Implementação mais curta, mesma complexidade O(1) amortizada'
  },
]

const useCases = [
  { type: 'pro', text: 'Cache de resultados de queries ou chamadas de API'            },
  { type: 'pro', text: 'Cache de páginas do sistema operativo (page replacement)'      },
  { type: 'pro', text: 'Cache de browser para recursos estáticos'                       },
  { type: 'pro', text: 'Buffer pool de bases de dados'                                  },
  { type: 'con', text: 'Precisas de prioridades diferentes por item — usa LFU ou custom' },
  { type: 'con', text: 'Padrão de acesso não tem localidade temporal — LRU não ajuda'   },
]

const realWorld = [
  { title: 'Redis / Memcached', desc: 'Políticas de eviction LRU/LFU configuráveis para gestão de memória.' },
  { title: 'CPU/OS Page Cache', desc: 'O sistema operativo usa variantes de LRU para escolher que páginas descartar.' },
  { title: 'CDN Caching',       desc: 'CDNs mantêm os recursos mais pedidos recentemente perto do utilizador.' },
  { title: 'LeetCode',          desc: 'LRU Cache (146), LFU Cache, Design In-Memory File System.' },
]
</script>