<template>
  <div class="max-w-3xl space-y-10">

    <!-- Bit array visual -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Array de bits</h2>
      <p class="text-zinc-500 text-sm mb-6">
        O Bloom Filter é um array de <span class="text-violet-400">m bits</span> todos
        iniciados a 0. Cada inserção ativa k bits via funções de hash.
      </p>

      <div class="bg-zinc-900 border border-zinc-800 p-5 space-y-6">

        <!-- Step selector -->
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="(step, i) in steps"
            :key="i"
            @click="activeStep = i"
            class="font-mono text-xs px-3 py-1.5 border transition-colors"
            :class="activeStep === i
              ? 'border-violet-400 text-violet-400 bg-violet-400/10'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'"
          >
            {{ step.label }}
          </button>
        </div>

        <!-- Bit array -->
        <div>
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">array de bits (m=16)</p>
          <div class="flex gap-px">
            <div
              v-for="(bit, i) in currentStep.bits"
              :key="i"
              class="flex-1 flex flex-col items-center border py-2 transition-all duration-300"
              :class="currentStep.highlighted.includes(i)
                ? 'border-violet-500/60 bg-violet-500/20'
                : bit === 1
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-zinc-700 bg-zinc-900'"
            >
              <span
                class="font-mono text-sm font-bold transition-colors"
                :class="currentStep.highlighted.includes(i)
                  ? 'text-violet-300'
                  : bit === 1 ? 'text-emerald-400' : 'text-zinc-700'"
              >{{ bit }}</span>
              <span class="font-mono text-xs text-zinc-700 mt-1">{{ i }}</span>
            </div>
          </div>
        </div>

        <!-- Hash results -->
        <div v-if="currentStep.hashes.length > 0" class="space-y-2">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest">funções de hash</p>
          <div class="flex gap-3 flex-wrap">
            <div
              v-for="(h, i) in currentStep.hashes"
              :key="i"
              class="flex items-center gap-2 font-mono text-sm"
            >
              <span class="text-zinc-500">h{{ i+1 }}("{{ currentStep.word }}")</span>
              <span class="text-zinc-600">=</span>
              <span class="text-violet-400">{{ h }}</span>
            </div>
          </div>
        </div>

        <!-- Result -->
        <div class="border-t border-zinc-800 pt-4">
          <p class="font-mono text-xs" :class="currentStep.resultColor">{{ currentStep.result }}</p>
        </div>
      </div>
    </section>

    <!-- False positive example -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Falso Positivo</h2>
      <p class="text-zinc-500 text-sm mb-4">
        "test" nunca foi inserido, mas os seus bits foram ativados por outros elementos.
        O Bloom Filter diz "provavelmente sim" — é um falso positivo.
      </p>

      <div class="space-y-px border border-zinc-800">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">elemento</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">bits ativados</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">inserido?</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">resultado</div>
        </div>
        <div v-for="row in fpExample" :key="row.word" class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-300">{{ row.word }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-violet-400">{{ row.bits }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.inserted ? 'text-emerald-400' : 'text-zinc-600'">
            {{ row.inserted ? 'sim' : 'não' }}
          </div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.resultColor">{{ row.result }}</div>
        </div>
      </div>
    </section>

    <!-- Trade-off -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Trade-off: memória vs precisão</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Mais bits = menos falsos positivos mas mais memória.
        A fórmula ótima para k é <span class="text-violet-400">k = (m/n) × ln(2)</span>.
      </p>

      <div class="space-y-px border border-zinc-800">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">m (bits)</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">n (elementos)</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">k ótimo</div>
          <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600">taxa FP</div>
        </div>
        <div v-for="row in tradeoffs" :key="row.m" class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-300">{{ row.m }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-300">{{ row.n }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm text-violet-400">{{ row.k }}</div>
          <div class="bg-zinc-900 px-4 py-3 font-mono text-sm" :class="row.color">{{ row.fp }}</div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeStep = ref(0)

const emptyBits: number[] = Array(16).fill(0)

const steps = [
  {
    label: 'Inicial',
    word: '',
    bits: [...emptyBits] as number[],
    highlighted: [] as number[],
    hashes: [] as number[],
    result: 'Array de 16 bits, todos a 0.',
    resultColor: 'text-zinc-500'
  },
  {
    label: 'add("hello")',
    word: 'hello',
    bits: emptyBits.map((_, i) => [2, 7, 11].includes(i) ? 1 : 0) as number[],
    highlighted: [2, 7, 11] as number[],
    hashes: [2, 7, 11] as number[],
    result: 'Bits 2, 7 e 11 ativados para "hello".',
    resultColor: 'text-emerald-400'
  },
  {
    label: 'add("world")',
    word: 'world',
    bits: emptyBits.map((_, i) => [2, 7, 11, 4, 9, 14].includes(i) ? 1 : 0) as number[],
    highlighted: [4, 9, 14] as number[],
    hashes: [4, 9, 14] as number[],
    result: 'Bits 4, 9 e 14 ativados para "world". Bit 2 já estava ativo.',
    resultColor: 'text-emerald-400'
  },
  {
    label: 'has("hello")',
    word: 'hello',
    bits: emptyBits.map((_, i) => [2, 7, 11, 4, 9, 14].includes(i) ? 1 : 0) as number[],
    highlighted: [2, 7, 11] as number[],
    hashes: [2, 7, 11] as number[],
    result: '✓ Bits 2, 7 e 11 estão a 1 → "provavelmente sim"',
    resultColor: 'text-emerald-400'
  },
  {
    label: 'has("foo")',
    word: 'foo',
    bits: emptyBits.map((_, i) => [2, 7, 11, 4, 9, 14].includes(i) ? 1 : 0) as number[],
    highlighted: [3, 6, 12] as number[],
    hashes: [3, 6, 12] as number[],
    result: '✗ Bit 3 está a 0 → "definitivamente não está"',
    resultColor: 'text-red-400'
  },
]

const currentStep = computed(() => steps[activeStep.value]!)

const fpExample = [
  { word: '"hello"', bits: '2, 7, 11',  inserted: true,  result: '✓ provavelmente sim', resultColor: 'text-emerald-400' },
  { word: '"world"', bits: '4, 9, 14',  inserted: true,  result: '✓ provavelmente sim', resultColor: 'text-emerald-400' },
  { word: '"test"',  bits: '2, 9, 14',  inserted: false, result: '⚠ falso positivo!',   resultColor: 'text-amber-400'   },
  { word: '"foo"',   bits: '3, 6, 12',  inserted: false, result: '✗ definitivamente não',resultColor: 'text-zinc-500'   },
]

const tradeoffs = [
  { m: '100',    n: '10', k: '7',  fp: '~1%',    color: 'text-emerald-400' },
  { m: '100',    n: '20', k: '3',  fp: '~6%',    color: 'text-amber-400'   },
  { m: '100',    n: '50', k: '1',  fp: '~40%',   color: 'text-red-400'     },
  { m: '1000',   n: '50', k: '14', fp: '~0.01%', color: 'text-emerald-400' },
]
</script>