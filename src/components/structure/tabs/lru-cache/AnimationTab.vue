<template>
  <div class="max-w-3xl space-y-8">
    <!-- Cache visual -->
    <div class="bg-zinc-900 border border-zinc-800 p-6">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest">LRU Cache — capacidade {{ capacity }}</p>
        <div class="flex gap-2 items-center">
          <span class="font-mono text-xs text-zinc-600">capacidade:</span>
          <input
            v-model.number="capacityInput"
            type="number"
            min="1"
            max="8"
            :disabled="isAnimating"
            class="w-14 bg-zinc-800 border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-100 outline-none focus:border-violet-400"
          />
          <button
            @click="applyCapacity"
            :disabled="isAnimating"
            class="font-mono text-xs px-2 py-1 border border-zinc-700 text-zinc-500 hover:border-zinc-500 disabled:opacity-40 transition-colors"
          >
            aplicar
          </button>
        </div>
      </div>

      <!-- Linked list -->
      <div class="flex items-center gap-2 flex-wrap min-h-16 mb-2">
        <span class="font-mono text-xs text-emerald-400 border border-emerald-500/40 px-2 py-1">head</span>
        <span class="text-zinc-600" v-if="list.length">→</span>
        <template v-for="(node, i) in list" :key="node.key">
          <div class="font-mono text-sm px-3 py-2 border transition-all duration-300" :class="getNodeClass(node.key)">
            {{ node.key }}:{{ node.value }}
          </div>
          <span v-if="i < list.length - 1" class="text-zinc-600">⇄</span>
        </template>
        <span class="text-zinc-600" v-if="list.length">→</span>
        <span class="font-mono text-xs text-red-400 border border-red-500/40 px-2 py-1">tail</span>
        <span v-if="list.length === 0" class="font-mono text-xs text-zinc-700 ml-2">(vazia)</span>
      </div>

      <!-- Evicted -->
      <div v-if="evictedNode" class="mb-2">
        <span class="font-mono text-xs text-red-400">✗ evicted: {{ evictedNode.key }}:{{ evictedNode.value }}</span>
      </div>

      <!-- Message -->
      <p class="font-mono text-xs h-4 pt-2 border-t border-zinc-800" :class="messageColor">{{ message }}</p>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Put -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">put(key, value) — O(1)</p>
        <div class="flex gap-2">
          <input
            v-model.number="putKey"
            type="number"
            placeholder="key"
            class="w-20 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
          />
          <input
            v-model="putValue"
            type="text"
            placeholder="value"
            @keyup.enter="doPut"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
          />
          <button
            @click="doPut"
            :disabled="isAnimating || putKey === null || !putValue.trim()"
            class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <!-- Get -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">get(key) — O(1)</p>
        <div class="flex gap-2">
          <input
            v-model.number="getKey"
            type="number"
            placeholder="key"
            @keyup.enter="doGet"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
          />
          <button
            @click="doGet"
            :disabled="isAnimating || getKey === null"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
        <p class="font-mono text-xs text-zinc-600 h-4">{{ getResult }}</p>
      </div>
    </div>

    <!-- Quick puts -->
    <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
      <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Ações rápidas</p>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="qp in quickPuts"
          :key="qp[0]"
          @click="quickPut(qp[0], qp[1])"
          :disabled="isAnimating"
          class="font-mono text-xs px-2 py-1.5 border border-zinc-700 text-zinc-500 hover:border-zinc-500 disabled:opacity-40 transition-colors"
        >
          put({{ qp[0] }}, '{{ qp[1] }}')
        </button>
      </div>
    </div>

    <!-- Reset -->
    <button
      @click="reset"
      :disabled="isAnimating"
      class="font-mono text-sm text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-4 py-2 transition-colors disabled:opacity-40"
    >
      ↺ Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Node = { key: number; value: string }

const capacity = ref(4)
const capacityInput = ref(4)
const list = ref<Node[]>([])

const putKey = ref<number | null>(null)
const putValue = ref('')
const getKey = ref<number | null>(null)
const getResult = ref('')

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<number | null>(null)
const evictedKey = ref<number | null>(null)
const evictedNode = ref<Node | null>(null)

const quickPuts: [number, string][] = [
  [1, 'a'],
  [2, 'b'],
  [3, 'c'],
  [4, 'd'],
  [5, 'e'],
]

function getNodeClass(key: number) {
  if (evictedKey.value === key) return 'border-red-500/50 bg-red-500/10 text-red-400'
  if (highlighted.value === key) return 'border-violet-400 bg-violet-400/10 text-violet-300'
  return 'border-zinc-700 bg-zinc-800 text-zinc-100'
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function applyCapacity() {
  if (isAnimating.value) return
  const cap = Math.max(1, Math.min(8, capacityInput.value || 1))
  capacity.value = cap
  capacityInput.value = cap
  while (list.value.length > cap) list.value.pop()
  message.value = `capacidade alterada para ${cap}`
  messageColor.value = 'text-zinc-500'
}

async function doPut() {
  if (putKey.value === null || !putValue.value.trim() || isAnimating.value) return
  isAnimating.value = true
  evictedKey.value = null
  evictedNode.value = null

  const key = putKey.value
  const value = putValue.value.trim()

  const existingIdx = list.value.findIndex((n) => n.key === key)

  if (existingIdx !== -1) {
    highlighted.value = key
    message.value = `${key} já existe — a atualizar valor e mover para head...`
    messageColor.value = 'text-amber-400'
    await sleep(600)
    list.value.splice(existingIdx, 1)
    list.value.unshift({ key, value })
  } else {
    if (list.value.length >= capacity.value) {
      const evicted = list.value[list.value.length - 1]!
      highlighted.value = evicted.key
      message.value = `cache cheia — a remover ${evicted.key} (LRU)...`
      messageColor.value = 'text-red-400'
      await sleep(700)
      evictedKey.value = evicted.key
      await sleep(500)
      list.value.pop()
      evictedNode.value = evicted
      evictedKey.value = null
    }
    highlighted.value = key
    message.value = `a inserir ${key}:${value} no head...`
    messageColor.value = 'text-amber-400'
    await sleep(500)
    list.value.unshift({ key, value })
  }

  message.value = `put(${key}, '${value}') concluído`
  messageColor.value = 'text-emerald-400'
  await sleep(900)
  highlighted.value = null
  evictedNode.value = null
  isAnimating.value = false
  putKey.value = null
  putValue.value = ''
}

async function doGet() {
  if (getKey.value === null || isAnimating.value) return
  isAnimating.value = true
  getResult.value = ''
  evictedNode.value = null

  const key = getKey.value
  const idx = list.value.findIndex((n) => n.key === key)

  if (idx === -1) {
    message.value = `get(${key}) → não encontrado`
    messageColor.value = 'text-red-400'
    getResult.value = '→ -1 (miss)'
    await sleep(1200)
  } else {
    highlighted.value = key
    message.value = `a aceder a ${key}...`
    messageColor.value = 'text-amber-400'
    await sleep(600)

    const node = list.value[idx]!
    list.value.splice(idx, 1)
    list.value.unshift(node)

    message.value = `get(${key}) → '${node.value}' — movido para head`
    messageColor.value = 'text-emerald-400'
    getResult.value = `→ '${node.value}'`
    await sleep(1000)
  }

  highlighted.value = null
  isAnimating.value = false
  getKey.value = null
}

function reset() {
  list.value = []
  highlighted.value = null
  evictedKey.value = null
  evictedNode.value = null
  getResult.value = ''
  message.value = 'Experimenta as operações abaixo'
  messageColor.value = 'text-zinc-600'
}

function quickPut(key: number, value: string) {
  putKey.value = key
  putValue.value = value
  doPut()
}
</script>
