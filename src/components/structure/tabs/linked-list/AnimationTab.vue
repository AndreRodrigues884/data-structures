<template>
  <div class="max-w-3xl space-y-8">
    <!-- Linked List visual -->
    <div class="bg-zinc-900 border border-zinc-800 p-6 overflow-x-auto">
      <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-6">Linked List atual</p>

      <div class="flex items-center gap-0 min-h-20">
        <!-- Head label -->
        <div class="flex flex-col items-center mr-4">
          <span class="font-mono text-xs text-violet-400 mb-1">head</span>
          <span class="font-mono text-xs text-violet-400">↓</span>
        </div>

        <template v-for="(node, i) in list" :key="node.id">
          <!-- Node -->
          <div class="flex flex-col items-center">
            <div class="flex border transition-all duration-300" :class="getNodeClass(i)">
              <!-- Value -->
              <div class="w-12 h-12 flex items-center justify-center font-mono text-base border-r border-zinc-700">
                {{ node.value }}
              </div>
              <!-- Pointer -->
              <div class="w-10 h-12 flex items-center justify-center font-mono text-xs text-zinc-600">
                {{ i === list.length - 1 ? 'null' : '→' }}
              </div>
            </div>
            <span class="font-mono text-xs text-zinc-600 mt-1">nó {{ i }}</span>
          </div>

          <!-- Arrow between nodes -->
          <div v-if="i < list.length - 1" class="flex items-center mx-1 mb-5">
            <div class="w-6 h-px bg-emerald-500/50"></div>
          </div>
        </template>

        <!-- Empty state -->
        <div v-if="list.length === 0" class="text-zinc-600 font-mono text-sm">lista vazia</div>

        <!-- Tail label -->
        <div v-if="list.length > 0" class="flex flex-col items-center ml-4">
          <span class="font-mono text-xs text-emerald-400 mb-1">tail</span>
          <span class="font-mono text-xs text-emerald-400">↓</span>
        </div>
      </div>

      <!-- Message -->
      <p class="font-mono text-xs mt-4 h-4" :class="messageColor">{{ message }}</p>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Prepend -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Prepend — O(1)</p>
        <div class="flex gap-2">
          <input
            v-model="prependValue"
            type="number"
            placeholder="valor"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
            @keyup.enter="prepend"
          />
          <button
            @click="prepend"
            :disabled="isAnimating"
            class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <!-- Append -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Append — O(n)</p>
        <div class="flex gap-2">
          <input
            v-model="appendValue"
            type="number"
            placeholder="valor"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
            @keyup.enter="append"
          />
          <button
            @click="append"
            :disabled="isAnimating"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <!-- Insert at -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Insert At — O(n)</p>
        <div class="flex gap-2">
          <input
            v-model="insertValue"
            type="number"
            placeholder="valor"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
          />
          <input
            v-model="insertIndex"
            type="number"
            placeholder="idx"
            class="w-16 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
          />
          <button
            @click="insertAt"
            :disabled="isAnimating"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Search — O(n)</p>
        <div class="flex gap-2">
          <input
            v-model="searchValue"
            type="number"
            placeholder="valor"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
            @keyup.enter="search"
          />
          <button
            @click="search"
            :disabled="isAnimating"
            class="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <!-- Remove head -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Remove Head — O(1)</p>
        <button
          @click="removeHead"
          :disabled="isAnimating || list.length === 0"
          class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
        >
          Remover head
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

type Node = { id: number; value: number }

let nextId = 0
const list = ref<Node[]>([
  { id: nextId++, value: 12 },
  { id: nextId++, value: 45 },
  { id: nextId++, value: 7 },
  { id: nextId++, value: 93 },
])

const prependValue = ref<number | null>(null)
const appendValue = ref<number | null>(null)
const searchValue = ref<number | null>(null)

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<number | null>(null)
const found = ref<number | null>(null)
const removed = ref<number | null>(null)

function getNodeClass(i: number) {
  if (removed.value === i) return 'border-red-500/50 bg-red-500/10 text-red-300'
  if (found.value === i) return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
  if (highlighted.value === i) return 'border-violet-500/50 bg-violet-500/10 text-violet-300'
  return 'border-zinc-700 bg-zinc-800 text-zinc-100'
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function clearHighlights() {
  highlighted.value = null
  found.value = null
  removed.value = null
  message.value = ''
}

async function prepend() {
  if (prependValue.value === null || isAnimating.value) return
  isAnimating.value = true
  clearHighlights()

  const val = prependValue.value
  list.value.unshift({ id: nextId++, value: val })
  found.value = 0
  message.value = `novo head: ${val} — O(1), apenas atualizou o ponteiro`
  messageColor.value = 'text-emerald-400'

  await sleep(1200)
  clearHighlights()
  isAnimating.value = false
  prependValue.value = null
}

const insertValue = ref<number | null>(null)
const insertIndex = ref<number | null>(null)

async function insertAt() {
  if (insertValue.value === null || insertIndex.value === null || isAnimating.value) return
  const idx = insertIndex.value
  const val = insertValue.value

  if (idx < 0 || idx > list.value.length) {
    message.value = `índice ${idx} inválido`
    messageColor.value = 'text-red-400'
    return
  }

  isAnimating.value = true
  clearHighlights()

  // traversal animation até ao índice
  for (let i = 0; i < idx; i++) {
    highlighted.value = i
    message.value = `a percorrer nó ${i}...`
    messageColor.value = 'text-amber-400'
    await sleep(400)
  }

  highlighted.value = null
  list.value.splice(idx, 0, { id: nextId++, value: val })
  found.value = idx
  message.value = `inserido ${val} no índice ${idx} — percorreu ${idx} nós`
  messageColor.value = 'text-emerald-400'

  await sleep(1200)
  clearHighlights()
  isAnimating.value = false
  insertValue.value = null
  insertIndex.value = null
}

async function append() {
  if (appendValue.value === null || isAnimating.value) return
  isAnimating.value = true
  clearHighlights()

  const val = appendValue.value

  // traverse to show O(n)
  for (let i = 0; i < list.value.length; i++) {
    highlighted.value = i
    message.value = `a percorrer nó ${i}...`
    messageColor.value = 'text-amber-400'
    await sleep(350)
  }

  list.value.push({ id: nextId++, value: val })
  highlighted.value = null
  found.value = list.value.length - 1
  message.value = `${val} adicionado ao fim — percorreu ${list.value.length - 1} nós`
  messageColor.value = 'text-emerald-400'

  await sleep(1200)
  clearHighlights()
  isAnimating.value = false
  appendValue.value = null
}

async function search() {
  if (searchValue.value === null || isAnimating.value) return
  isAnimating.value = true
  clearHighlights()

  const target = searchValue.value
  let foundIdx = -1

  for (let i = 0; i < list.value.length; i++) {
    const node = list.value[i]
    if (!node) break

    highlighted.value = i
    message.value = `a verificar nó ${i} = ${node.value}...`
    messageColor.value = 'text-amber-400'
    await sleep(450)

    if (node.value === target) {
      foundIdx = i
      break
    }
  }

  highlighted.value = null
  if (foundIdx >= 0) {
    found.value = foundIdx
    message.value = `encontrado ${target} no nó ${foundIdx}`
    messageColor.value = 'text-emerald-400'
  } else {
    message.value = `${target} não encontrado`
    messageColor.value = 'text-red-400'
  }

  await sleep(1500)
  clearHighlights()
  isAnimating.value = false
  searchValue.value = null
}

async function removeHead() {
  if (isAnimating.value || list.value.length === 0) return
  isAnimating.value = true
  clearHighlights()

  const head = list.value[0]
  if (!head) {
    isAnimating.value = false
    return
  }

  removed.value = 0
  message.value = `a remover head: ${head.value}`
  messageColor.value = 'text-red-400'
  await sleep(700)

  list.value.shift()
  removed.value = null
  message.value = `head removido — O(1), apenas atualizou o ponteiro`
  messageColor.value = 'text-emerald-400'

  await sleep(1000)
  clearHighlights()
  isAnimating.value = false
}

function reset() {
  clearHighlights()
  nextId = 0
  list.value = [
    { id: nextId++, value: 12 },
    { id: nextId++, value: 45 },
    { id: nextId++, value: 7 },
    { id: nextId++, value: 93 },
  ]
  message.value = 'Experimenta as operações abaixo'
  messageColor.value = 'text-zinc-600'
}
</script>
