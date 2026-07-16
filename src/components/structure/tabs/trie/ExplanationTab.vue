<template>
  <div class="max-w-2xl space-y-8">

    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Uma <span class="text-zinc-100 font-medium">Trie</span> (também chamada
        <span class="text-violet-400">prefix tree</span>) é uma árvore especializada
        em armazenar <span class="text-zinc-100">strings</span>, onde cada nó representa
        um <span class="text-emerald-400">caractere</span> e o caminho da raiz até um
        nó marcado como "fim de palavra" forma uma palavra completa. Palavras com o
        mesmo prefixo partilham os mesmos nós iniciais.
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
        Cada nó guarda um mapa <code class="text-violet-400 font-mono">children</code>
        de caractere → nó filho, mais uma flag
        <code class="text-emerald-400 font-mono">isEndOfWord</code>. Inserir "car" e
        "cat" faz com que ambas partilhem os nós <span class="text-violet-400">c → a</span>,
        divergindo apenas no último caractere.
      </p>
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <pre class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"><span class="text-zinc-500">// insert("car"), insert("cat"), insert("card")</span>

root
 └─ <span class="text-violet-400">c</span>
     └─ <span class="text-violet-400">a</span>
         ├─ <span class="text-violet-400">r</span> <span class="text-emerald-400">●</span>  <span class="text-zinc-500">// fim de "car"</span>
         │   └─ <span class="text-violet-400">d</span> <span class="text-emerald-400">●</span>  <span class="text-zinc-500">// fim de "card"</span>
         └─ <span class="text-violet-400">t</span> <span class="text-emerald-400">●</span>  <span class="text-zinc-500">// fim de "cat"</span>

<span class="text-zinc-500">// "car", "card" e "cat" partilham o prefixo "ca"</span></pre>
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
  { name: 'insert(word)',     complexity: 'O(m)', desc: 'Insere uma palavra de tamanho m'                       },
  { name: 'search(word)',     complexity: 'O(m)', desc: 'Verifica se a palavra exata existe'                    },
  { name: 'startsWith(pfx)',  complexity: 'O(m)', desc: 'Verifica se algum prefixo existe'                      },
  { name: 'delete(word)',     complexity: 'O(m)', desc: 'Remove uma palavra, limpando nós órfãos'                },
]

const optimizations = [
  {
    name: 'Compressed Trie (Radix Tree)',
    desc: 'Comprime cadeias de nós com um único filho num só nó com uma substring.',
    result: 'Reduz drasticamente o número de nós em prefixos longos e únicos'
  },
  {
    name: 'Array vs Map para children',
    desc: 'Alfabeto fixo (ex: a-z) pode usar array[26]; alfabetos grandes usam Map.',
    result: 'Array — acesso O(1) mais rápido; Map — menos memória com alfabetos grandes'
  },
]

const useCases = [
  { type: 'pro', text: 'Autocomplete e sugestões de pesquisa'                          },
  { type: 'pro', text: 'Corretor ortográfico — validar palavras e prefixos'            },
  { type: 'pro', text: 'Encontrar todas as palavras com um dado prefixo'               },
  { type: 'pro', text: 'Routing de IPs (longest prefix match)'                          },
  { type: 'con', text: 'Precisas apenas de pesquisa exata — HashMap é mais simples'    },
  { type: 'con', text: 'Memória é uma restrição forte e as strings não partilham prefixos' },
]

const realWorld = [
  { title: 'Autocomplete',    desc: 'Teclados e motores de busca sugerem palavras à medida que escreves.' },
  { title: 'T9 / Teclados',   desc: 'Previsão de texto em teclados mobile usa tries para prefixos rápidos.' },
  { title: 'IP Routing',      desc: 'Routers usam tries binárias para encontrar o prefixo de rede mais longo.' },
  { title: 'LeetCode',        desc: 'Implement Trie, Word Search II, Replace Words, Design Add and Search Words.' },
]
</script>