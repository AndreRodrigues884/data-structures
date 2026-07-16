<template>
  <div class="max-w-2xl space-y-8">

    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Um <span class="text-zinc-100 font-medium">Bloom Filter</span> é uma estrutura
        <span class="text-violet-400">probabilística</span> que responde à pergunta
        "este elemento está no conjunto?" de forma extremamente eficiente.
        Usa um <span class="text-emerald-400">array de bits</span> e
        <span class="text-emerald-400">múltiplas funções de hash</span> — ocupa
        muito menos memória que um HashSet mas aceita
        <span class="text-amber-400">falsos positivos</span>.
      </p>
    </section>

    <!-- Respostas possíveis -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Respostas possíveis</h2>
      <div class="space-y-px border border-zinc-800">
        <div v-for="answer in answers" :key="answer.result" class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-4">
            <p class="font-mono text-sm" :class="answer.color">{{ answer.result }}</p>
          </div>
          <div class="bg-zinc-900 px-4 py-4 col-span-2">
            <p class="text-sm text-zinc-300 mb-1">{{ answer.meaning }}</p>
            <p class="text-xs text-zinc-600">{{ answer.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Como funciona -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Como funciona</h2>
      <div class="space-y-3">
        <div
          v-for="(step, i) in howItWorks"
          :key="i"
          class="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800"
        >
          <span class="font-mono text-xs text-violet-400 shrink-0 mt-0.5">{{ i + 1 }}</span>
          <div>
            <p class="text-sm text-zinc-300 font-medium mb-1">{{ step.title }}</p>
            <p class="text-sm text-zinc-500">{{ step.desc }}</p>
            <p class="font-mono text-xs text-emerald-400 mt-2">{{ step.code }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Falsos positivos -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">Falsos Positivos</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        Um <span class="text-amber-400">falso positivo</span> acontece quando o Bloom Filter
        diz "pode estar" mas o elemento não está de facto no conjunto.
        Acontece porque bits podem ser ativados por outros elementos.
        A taxa de falsos positivos depende de:
      </p>
      <div class="space-y-px border border-zinc-800">
        <div v-for="factor in fpFactors" :key="factor.name" class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-violet-400">{{ factor.name }}</div>
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-400">{{ factor.effect }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-xs" :class="factor.color">{{ factor.direction }}</div>
        </div>
      </div>
    </section>

    <!-- Complexidade -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Complexidade</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div v-for="op in operations" :key="op.name" class="bg-zinc-900 px-5 py-4">
          <p class="font-mono text-sm text-zinc-100 mb-1">{{ op.name }}</p>
          <p class="font-mono text-lg text-emerald-400">{{ op.complexity }}</p>
          <p class="text-xs text-zinc-600 mt-1">{{ op.note }}</p>
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
const answers = [
  {
    result:  'Definitivamente NÃO está',
    color:   'text-emerald-400',
    meaning: 'Se todos os bits estiverem a 0, o elemento nunca foi inserido.',
    note:    '100% garantido — sem falsos negativos'
  },
  {
    result:  'Provavelmente SIM está',
    color:   'text-amber-400',
    meaning: 'Se todos os bits estiverem a 1, o elemento pode estar no conjunto.',
    note:    'Pode ser falso positivo — não é 100% garantido'
  },
]

const howItWorks = [
  {
    title: 'Inicialização',
    desc:  'Cria um array de m bits, todos a 0.',
    code:  'bits = [0, 0, 0, 0, 0, 0, 0, 0]  // m = 8'
  },
  {
    title: 'Inserção',
    desc:  'Aplica k funções de hash ao elemento e ativa os bits correspondentes.',
    code:  'add("hello") → hash1=2, hash2=5, hash3=7 → bits[2,5,7] = 1'
  },
  {
    title: 'Pesquisa',
    desc:  'Aplica as mesmas k funções de hash e verifica se todos os bits estão a 1.',
    code:  'has("hello") → bits[2]&&bits[5]&&bits[7] === 1 → "provavelmente sim"'
  },
  {
    title: 'Não suporta remoção',
    desc:  'Não é possível remover elementos — desativar um bit poderia afetar outros elementos.',
    code:  '// Solução: Counting Bloom Filter (usa contadores em vez de bits)'
  },
]

const fpFactors = [
  { name: 'm (tamanho)',       effect: 'Array de bits maior',          direction: '↑ m → ↓ falsos positivos', color: 'text-emerald-400' },
  { name: 'k (nº de hashes)', effect: 'Mais funções de hash',         direction: 'k ótimo → ↓ falsos positivos', color: 'text-emerald-400' },
  { name: 'n (nº elementos)', effect: 'Mais elementos inseridos',     direction: '↑ n → ↑ falsos positivos', color: 'text-red-400'     },
]

const operations = [
  { name: 'add(x)',   complexity: 'O(k)', note: 'k = número de funções de hash' },
  { name: 'has(x)',   complexity: 'O(k)', note: 'k = número de funções de hash' },
  { name: 'Espaço',   complexity: 'O(m)', note: 'm = tamanho do array de bits'  },
]

const useCases = [
  { type: 'pro', text: 'Verificar se um elemento definitivamente NÃO está num conjunto enorme' },
  { type: 'pro', text: 'Memória extremamente limitada — usa apenas bits'                        },
  { type: 'pro', text: 'Evitar lookups caros a bases de dados desnecessários'                   },
  { type: 'con', text: 'Precisas de certeza absoluta — falsos positivos são inaceitáveis'       },
  { type: 'con', text: 'Precisas de remover elementos — usa Counting Bloom Filter'              },
  { type: 'con', text: 'Precisas de saber quais elementos estão no conjunto'                    },
]

const realWorld = [
  { title: 'Google Chrome',    desc: 'Verifica se um URL é malicioso antes de fazer request à base de dados.'    },
  { title: 'Cassandra / HBase',desc: 'Evita disk reads desnecessários — verifica se a chave existe antes de ler.' },
  { title: 'Bitcoin',          desc: 'SPV nodes usam Bloom Filters para sincronizar transações eficientemente.'   },
  { title: 'Medium',           desc: 'Evita mostrar artigos já lidos — verifica sem guardar o histórico completo.' },
]
</script>