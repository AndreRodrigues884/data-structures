<template>
  <div class="max-w-2xl space-y-8">

    <!-- O que é -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
      <p class="text-zinc-400 leading-relaxed">
        Uma <span class="text-zinc-100 font-medium">Stack</span> é uma estrutura
        <span class="text-violet-400">LIFO</span> — Last In, First Out.
        Imagina uma pilha de pratos — só consegues adicionar ou remover pelo
        <span class="text-emerald-400">topo</span>. O último prato a ser colocado
        é o primeiro a ser retirado.
      </p>
    </section>

    <!-- Operações -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Operações principais</h2>
      <div class="space-y-px border border-zinc-800">
        <div v-for="op in operations" :key="op.name" class="grid grid-cols-4 gap-px bg-zinc-800">
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

    <!-- Casos de uso reais -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">Onde é usada no mundo real</h2>
      <div class="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div v-for="use in realWorld" :key="use.title" class="bg-zinc-900 p-4">
          <p class="font-mono text-sm text-violet-400 mb-1">{{ use.title }}</p>
          <p class="text-sm text-zinc-400">{{ use.desc }}</p>
          <p class="font-mono text-xs text-zinc-600 mt-2">{{ use.example }}</p>
        </div>
      </div>
    </section>

    <!-- Call stack -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-3">A Call Stack do teu programa</h2>
      <p class="text-zinc-400 leading-relaxed mb-4">
        Quando o teu programa chama uma função, o CPU usa uma Stack internamente.
        Cada chamada empilha um <span class="text-violet-400">stack frame</span> com
        as variáveis locais e o endereço de retorno. Quando a função termina,
        o frame é removido do topo — <span class="text-emerald-400">LIFO</span>.
      </p>
      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <pre class="font-mono text-sm text-zinc-300 leading-relaxed"><span class="text-zinc-500">// Este código...</span>
<span class="text-violet-400">function</span> <span class="text-emerald-400">c</span>() { <span class="text-violet-400">return</span> <span class="text-emerald-400">1</span> }
<span class="text-violet-400">function</span> <span class="text-emerald-400">b</span>() { <span class="text-violet-400">return</span> <span class="text-emerald-400">c</span>() }
<span class="text-violet-400">function</span> <span class="text-emerald-400">a</span>() { <span class="text-violet-400">return</span> <span class="text-emerald-400">b</span>() }
<span class="text-emerald-400">a</span>()

<span class="text-zinc-500">// ...gera esta call stack:</span>
<span class="text-amber-400">┌─────────┐</span> ← topo
<span class="text-amber-400">│  c()    │</span>
<span class="text-amber-400">│  b()    │</span>
<span class="text-amber-400">│  a()    │</span>
<span class="text-amber-400">└─────────┘</span> ← base</pre>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const operations = [
  { name: 'push(x)',  complexity: 'O(1)', color: 'text-emerald-400', desc: 'Adiciona elemento no topo'          },
  { name: 'pop()',    complexity: 'O(1)', color: 'text-emerald-400', desc: 'Remove e devolve o elemento do topo' },
  { name: 'peek()',   complexity: 'O(1)', color: 'text-emerald-400', desc: 'Lê o topo sem remover'              },
  { name: 'isEmpty()',complexity: 'O(1)', color: 'text-emerald-400', desc: 'Verifica se a stack está vazia'     },
]

const realWorld = [
  {
    title: 'Undo / Redo',
    desc: 'Cada ação é empilhada. Ctrl+Z faz pop do topo.',
    example: 'VS Code, Photoshop, Word'
  },
  {
    title: 'Navegação no browser',
    desc: 'O histórico de páginas é uma stack. O botão "back" faz pop.',
    example: 'Chrome, Firefox, Safari'
  },
  {
    title: 'Call Stack',
    desc: 'O CPU usa uma stack para gerir chamadas de funções.',
    example: 'Qualquer linguagem de programação'
  },
  {
    title: 'Parsing de expressões',
    desc: 'Usado para validar parênteses e avaliar expressões matemáticas.',
    example: 'Compiladores, calculadoras'
  },
]

const useCases = [
  { type: 'pro', text: 'Precisas de acesso apenas ao elemento mais recente'     },
  { type: 'pro', text: 'Implementar funcionalidade de undo/redo'                },
  { type: 'pro', text: 'Gerir chamadas de funções recursivas'                   },
  { type: 'pro', text: 'Validar estruturas balanceadas como parênteses'         },
  { type: 'con', text: 'Precisas de aceder a elementos no meio ou no fundo'     },
  { type: 'con', text: 'Precisas de iterar sobre todos os elementos'            },
]
</script>