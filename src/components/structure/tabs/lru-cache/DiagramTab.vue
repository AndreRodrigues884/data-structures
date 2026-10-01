<template>
  <div class="max-w-3xl space-y-10">
    <!-- Step by step -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Passo a passo</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Cache com capacidade <span class="text-violet-400">3</span>. A <span class="text-emerald-400">head</span> guarda
        o item mais recentemente usado (MRU), a <span class="text-red-400">tail</span> guarda o próximo a ser removido
        (LRU).
      </p>

      <div class="flex gap-2 mb-6 flex-wrap">
        <button
          v-for="(step, i) in steps"
          :key="i"
          @click="activeStep = i"
          class="font-mono text-xs px-3 py-1.5 border transition-colors"
          :class="
            activeStep === i
              ? 'border-violet-400 text-violet-400 bg-violet-400/10'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
          "
        >
          {{ step.label }}
        </button>
      </div>

      <div class="bg-zinc-900 border border-zinc-800 p-4">
        <!-- Linked list -->
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">lista ligada (MRU → LRU)</p>
        <div class="flex items-center gap-2 flex-wrap mb-4 min-h-14">
          <span class="font-mono text-xs text-emerald-400 border border-emerald-500/40 px-2 py-1">head</span>
          <span class="text-zinc-600">→</span>
          <template v-for="(node, i) in currentStep.list" :key="node.key">
            <div
              class="font-mono text-sm px-3 py-2 border"
              :class="
                node.isNew
                  ? 'border-violet-400 bg-violet-400/10 text-violet-300'
                  : 'border-zinc-700 bg-zinc-800 text-zinc-100'
              "
            >
              {{ node.key }}:{{ node.value }}
            </div>
            <span v-if="i < currentStep.list.length - 1" class="text-zinc-600">⇄</span>
          </template>
          <span class="text-zinc-600">→</span>
          <span class="font-mono text-xs text-red-400 border border-red-500/40 px-2 py-1">tail</span>
        </div>

        <!-- HashMap -->
        <div class="pt-4 border-t border-zinc-800">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">hashmap (key → nó)</p>
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="node in currentStep.list"
              :key="node.key"
              class="font-mono text-xs px-2 py-1 border border-zinc-700 text-zinc-400"
            >
              {{ node.key }} → •{{ node.key }}
            </div>
          </div>
        </div>

        <!-- Step description -->
        <div class="pt-4 mt-3 border-t border-zinc-800">
          <p class="font-mono text-sm text-violet-400">{{ currentStep.op }}</p>
          <p class="text-sm text-zinc-400 mt-1">{{ currentStep.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Eviction -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Eviction quando cheia</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Quando <span class="text-violet-400">put()</span> excede a capacidade, o nó junto à tail (o menos recentemente
        usado) é removido da lista <span class="text-zinc-100">e</span>
        do hashmap — ambas as operações em O(1).
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">antes — [4, 1, 3, 2]</p>
          <div class="flex items-center gap-2 flex-wrap">
            <div class="font-mono text-sm px-3 py-2 border border-zinc-700 bg-zinc-800 text-zinc-100">4</div>
            <span class="text-zinc-600">⇄</span>
            <div class="font-mono text-sm px-3 py-2 border border-zinc-700 bg-zinc-800 text-zinc-100">1</div>
            <span class="text-zinc-600">⇄</span>
            <div class="font-mono text-sm px-3 py-2 border border-zinc-700 bg-zinc-800 text-zinc-100">3</div>
            <span class="text-zinc-600">⇄</span>
            <div class="font-mono text-sm px-3 py-2 border border-red-500/50 bg-red-500/10 text-red-400">2</div>
          </div>
          <p class="font-mono text-xs text-red-400 mt-2">↑ LRU — será removido</p>
        </div>
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">depois — [4, 1, 3]</p>
          <div class="flex items-center gap-2 flex-wrap">
            <div class="font-mono text-sm px-3 py-2 border border-zinc-700 bg-zinc-800 text-zinc-100">4</div>
            <span class="text-zinc-600">⇄</span>
            <div class="font-mono text-sm px-3 py-2 border border-zinc-700 bg-zinc-800 text-zinc-100">1</div>
            <span class="text-zinc-600">⇄</span>
            <div class="font-mono text-sm px-3 py-2 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
              3
            </div>
          </div>
          <p class="font-mono text-xs text-emerald-400 mt-2">↑ nova tail</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type ListNode = { key: number; value: string; isNew?: boolean }

const activeStep = ref(0)

const steps: { label: string; op: string; desc: string; list: ListNode[] }[] = [
  {
    label: 'Vazio',
    op: 'new LRUCache(3)',
    desc: 'Cache vazia com capacidade 3.',
    list: [],
  },
  {
    label: "put(1,'a')",
    op: "put(1, 'a')",
    desc: 'Insere no head — único elemento.',
    list: [{ key: 1, value: 'a', isNew: true }],
  },
  {
    label: "put(2,'b')",
    op: "put(2, 'b')",
    desc: '2 é inserido no head, empurrando 1 para trás.',
    list: [
      { key: 2, value: 'b', isNew: true },
      { key: 1, value: 'a' },
    ],
  },
  {
    label: "put(3,'c')",
    op: "put(3, 'c')",
    desc: 'Cache atinge a capacidade máxima (3 elementos).',
    list: [
      { key: 3, value: 'c', isNew: true },
      { key: 2, value: 'b' },
      { key: 1, value: 'a' },
    ],
  },
  {
    label: 'get(1)',
    op: "get(1) → 'a'",
    desc: '1 é acedido — move-se para o head. Ordem passa a [1, 3, 2].',
    list: [
      { key: 1, value: 'a', isNew: true },
      { key: 3, value: 'c' },
      { key: 2, value: 'b' },
    ],
  },
  {
    label: "put(4,'d')",
    op: "put(4, 'd')",
    desc: 'Cache cheia — remove 2 (tail/LRU) antes de inserir 4 no head.',
    list: [
      { key: 4, value: 'd', isNew: true },
      { key: 1, value: 'a' },
      { key: 3, value: 'c' },
    ],
  },
]

const currentStep = computed(() => steps[activeStep.value]!)
</script>
