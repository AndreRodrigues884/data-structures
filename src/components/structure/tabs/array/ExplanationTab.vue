<template>
    <div class="max-w-2xl space-y-8">

        <!-- O que é -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
            <p class="text-zinc-400 leading-relaxed">
                Um <span class="text-zinc-100 font-medium">Array</span> é uma coleção de elementos
                armazenados em posições de memória <span class="text-violet-400">contíguas</span>.
                Cada elemento tem um índice numérico que começa em <code class="text-emerald-400 font-mono">0</code>,
                permitindo acesso direto em tempo constante.
            </p>
        </section>

        <!-- Complexidade -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-4">Complexidade</h2>
            <div class="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
                <div v-for="op in operations" :key="op.name" class="bg-zinc-900 px-5 py-4">
                    <p class="font-mono text-sm text-zinc-100 mb-1">{{ op.name }}</p>
                    <p class="font-mono text-lg" :class="op.color">{{ op.complexity }}</p>
                    <p class="text-xs text-zinc-600 mt-1">{{ op.note }}</p>
                </div>
            </div>
        </section>

        <!-- Como o computador vê o Array -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-3">Como o computador realmente vê</h2>
            <p class="text-zinc-400 leading-relaxed mb-6">
                Para o CPU, tudo são bytes em memória. Um array de inteiros de 32 bits como
                <code class="text-emerald-400 font-mono">int[] arr = {12, 45, 7}</code>
                é armazenado assim:
            </p>

            <!-- Como contar bits -->
            <h3 class="text-lg font-bold tracking-tight mb-3">Como ler binário</h3>
            <p class="text-zinc-400 leading-relaxed mb-4">
                Cada <span class="text-violet-400 font-medium">bit</span> é uma potência de 2.
                Para converter binário em decimal, soma as potências onde o bit é <code
                    class="text-emerald-400 font-mono">1</code>:
            </p>

            <!-- Exemplo interativo -->
            <div class="bg-zinc-900 border border-zinc-800 p-5 mb-4">
                <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
                    Exemplo — o número {{ selectedNumber.decimal }}
                </p>

                <!-- Bits com potências -->
                <div class="flex gap-px mb-3">
                    <div v-for="(bit, i) in selectedNumber.bits" :key="i"
                        class="flex-1 flex flex-col items-center gap-1">
                        <!-- Potência -->
                        <span class="font-mono text-xs text-zinc-600">2^{{ 7 - i }}</span>
                        <!-- Valor da potência -->
                        <span class="font-mono text-xs text-zinc-500">{{ Math.pow(2, 7 - i) }}</span>
                        <!-- Bit -->
                        <div class="w-full py-2 flex items-center justify-center font-mono text-sm border" :class="bit === 1
                            ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-600'">
                            {{ bit }}
                        </div>
                        <!-- Contribuição -->
                        <span class="font-mono text-xs" :class="bit === 1 ? 'text-emerald-400' : 'text-zinc-700'">
                            {{ bit === 1 ? Math.pow(2, 7 - i) : '—' }}
                        </span>
                    </div>
                </div>

                <!-- Soma -->
                <div class="border-t border-zinc-800 pt-3 font-mono text-sm text-zinc-400">
                    Soma:
                    <span class="text-emerald-400">
                        {{selectedNumber.bits
                            .map((bit, i) => bit === 1 ? Math.pow(2, 7 - i) : 0)
                            .filter(v => v > 0)
                            .join(' + ')}}
                    </span>
                    <span class="text-zinc-600"> = </span>
                    <span class="text-violet-400 font-bold">{{ selectedNumber.decimal }}</span>
                </div>
            </div>

            <!-- Selector -->
            <div class="flex items-center gap-3 mb-8">
                <span class="font-mono text-sm text-zinc-500">Ver número:</span>
                <div class="flex gap-2 flex-wrap">
                    <button v-for="n in bitExamples" :key="n.decimal" @click="selectedNumber = n"
                        class="px-3 py-1.5 font-mono text-sm border transition-colors" :class="selectedNumber.decimal === n.decimal
                            ? 'border-violet-400 text-violet-400 bg-violet-400/10'
                            : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'">
                        {{ n.decimal }}
                    </button>
                </div>
            </div>

            <!-- Representação binária -->
            <div class="space-y-px border border-zinc-800 mb-6">
                <div v-for="(item, i) in binaryView" :key="i" class="grid grid-cols-4 gap-px bg-zinc-800">
                    <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-500">arr[{{ i }}]</div>
                    <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-violet-400">{{ item.decimal }}</div>
                    <div class="bg-zinc-900 px-4 py-3 font-mono text-xs text-emerald-400 tracking-wider">{{ item.binary
                    }}</div>
                    <div class="bg-zinc-900 px-4 py-3 font-mono text-xs text-zinc-600">{{ item.hex }}</div>
                </div>
                <div class="grid grid-cols-4 gap-px bg-zinc-800">
                    <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">índice</div>
                    <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">decimal</div>
                    <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">binário (32 bits)</div>
                    <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">hex</div>
                </div>
            </div>

            <!-- Cache line -->
            <h3 class="text-lg font-bold tracking-tight mb-3">Cache Line — o segredo da performance</h3>
            <p class="text-zinc-400 leading-relaxed mb-4">
                O CPU não lê um byte de cada vez — lê blocos de
                <span class="text-violet-400 font-medium">64 bytes</span> chamados
                <span class="text-violet-400 font-medium">cache lines</span>.
                Quando acedes a <code class="text-emerald-400 font-mono">arr[0]</code>,
                o CPU carrega automaticamente os elementos vizinhos para a cache L1.
                Isto torna os arrays <span class="text-emerald-400 font-medium">extremamente rápidos</span> a iterar.
            </p>

            <div class="bg-zinc-900 border border-zinc-800 p-5 space-y-4 mb-6">
                <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest">Cache Line (64 bytes = 16 ints)</p>
                <div class="flex gap-px flex-wrap">
                    <div v-for="i in 16" :key="i"
                        class="flex-1 min-w-0 h-10 flex items-center justify-center font-mono text-xs border transition-colors"
                        :class="i <= 8
                            ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-600'">
                        {{ i - 1 }}
                    </div>
                </div>
                <div class="flex gap-6 text-xs font-mono">
                    <span class="flex items-center gap-2">
                        <span class="w-3 h-3 bg-violet-500/40 border border-violet-500/40 inline-block"></span>
                        <span class="text-zinc-500">carregado na cache ao aceder arr[0]</span>
                    </span>
                    <span class="flex items-center gap-2">
                        <span class="w-3 h-3 bg-zinc-800 border border-zinc-700 inline-block"></span>
                        <span class="text-zinc-500">próxima cache line</span>
                    </span>
                </div>
            </div>

            <!-- Spatial vs random -->
            <h3 class="text-lg font-bold tracking-tight mb-3">Acesso sequencial vs aleatório</h3>
            <div class="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
                <div class="bg-zinc-900 p-5">
                    <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3">✓ Sequencial — rápido
                    </p>
                    <pre class="font-mono text-sm text-zinc-300 leading-relaxed">for (let i = 0; i &lt; n; i++) {
  sum += arr[i]  // cache hit
}</pre>
                    <p class="text-xs text-zinc-600 mt-3">CPU prevê o próximo acesso. Cache hit ~1ns.</p>
                </div>
                <div class="bg-zinc-900 p-5">
                    <p class="font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">⚠ Aleatório — lento</p>
                    <pre class="font-mono text-sm text-zinc-300 leading-relaxed">for (let i = 0; i &lt; n; i++) {
  sum += arr[rand()] // cache miss
}</pre>
                    <p class="text-xs text-zinc-600 mt-3">Cache miss pode custar ~100ns. 100x mais lento.</p>
                </div>
            </div>

        </section>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const operations = [
  { name: 'Acesso por índice', complexity: 'O(1)', color: 'text-emerald-400', note: 'Direto via índice'  },
  { name: 'Pesquisa',          complexity: 'O(n)', color: 'text-amber-400',   note: 'Linear scan'        },
  { name: 'Inserção no fim',   complexity: 'O(1)', color: 'text-emerald-400', note: 'Amortizado'          },
  { name: 'Inserção no meio',  complexity: 'O(n)', color: 'text-amber-400',   note: 'Shift dos elementos' },
  { name: 'Remoção no fim',    complexity: 'O(1)', color: 'text-emerald-400', note: 'Direto'              },
  { name: 'Remoção no meio',   complexity: 'O(n)', color: 'text-amber-400',   note: 'Shift dos elementos' },
]

const useCases = [
  { type: 'pro', text: 'Acesso frequente por índice'               },
  { type: 'pro', text: 'Iterar sobre todos os elementos'           },
  { type: 'pro', text: 'Tamanho fixo ou que cresce no fim'         },
  { type: 'con', text: 'Inserções/remoções frequentes no meio'     },
  { type: 'con', text: 'Tamanho desconhecido e altamente variável' },
]

const binaryView = [
  { decimal: 12, binary: '00000000 00000000 00000000 00001100', hex: '0x0000000C' },
  { decimal: 45, binary: '00000000 00000000 00000000 00101101', hex: '0x0000002D' },
  { decimal: 7,  binary: '00000000 00000000 00000000 00000111', hex: '0x00000007' },
  { decimal: 93, binary: '00000000 00000000 00000000 01011101', hex: '0x0000005D' },
]

type BitExample = {
  decimal: number
  bits: number[]
}

function toBits(n: number): number[] {
  return Array.from({ length: 8 }, (_, i) => (n >> (7 - i)) & 1)
}

const bitExamples: BitExample[] = [
  { decimal: 7,   bits: toBits(7)   },
  { decimal: 12,  bits: toBits(12)  },
  { decimal: 45,  bits: toBits(45)  },
  { decimal: 93,  bits: toBits(93)  },
  { decimal: 128, bits: toBits(128) },
  { decimal: 255, bits: toBits(255) },
]

// selectedNumber DEPOIS de bitExamples
const selectedNumber = ref<BitExample>(bitExamples[0]!)
</script>