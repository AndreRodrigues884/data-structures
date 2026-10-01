<template>
  <div class="max-w-3xl space-y-8">
    <!-- Stack visual -->
    <div class="bg-zinc-900 border border-zinc-800 p-6">
      <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">Stack atual</p>

      <div class="flex gap-8 items-end">
        <!-- Stack -->
        <div class="flex flex-col items-center gap-0 min-h-64 justify-end">
          <!-- Top label -->
          <div class="flex items-center gap-2 mb-2 self-start ml-2">
            <span class="font-mono text-xs text-violet-400">← topo</span>
          </div>

          <div class="flex flex-col-reverse gap-px">
            <template v-for="(item, i) in stack" :key="item.id">
              <div
                class="w-40 h-12 flex items-center justify-between px-4 border font-mono text-sm transition-all duration-300"
                :class="getItemClass(i)"
              >
                <span>{{ item.value }}</span>
                <span class="text-xs text-zinc-600">{{ i === stack.length - 1 ? 'top' : '' }}</span>
              </div>
            </template>
          </div>

          <!-- Base -->
          <div class="w-40 h-1.5 bg-zinc-700 mt-px"></div>
          <span class="font-mono text-xs text-zinc-600 mt-1">base</span>

          <!-- Empty -->
          <div
            v-if="stack.length === 0"
            class="w-40 h-12 flex items-center justify-center font-mono text-xs text-zinc-600 border border-dashed border-zinc-800"
          >
            vazia
          </div>
        </div>

        <!-- Info panel -->
        <div class="flex flex-col gap-4 flex-1">
          <div class="space-y-2">
            <div class="flex justify-between font-mono text-sm">
              <span class="text-zinc-500">tamanho</span>
              <span class="text-zinc-100">{{ stack.length }}</span>
            </div>
            <div class="flex justify-between font-mono text-sm">
              <span class="text-zinc-500">topo</span>
              <span class="text-violet-400">{{ stack.length > 0 ? stack[stack.length - 1]?.value : 'null' }}</span>
            </div>
            <div class="flex justify-between font-mono text-sm">
              <span class="text-zinc-500">vazia?</span>
              <span :class="stack.length === 0 ? 'text-emerald-400' : 'text-red-400'">
                {{ stack.length === 0 ? 'sim' : 'não' }}
              </span>
            </div>
          </div>

          <!-- Message -->
          <div class="border border-zinc-800 p-3 min-h-12">
            <p class="font-mono text-xs" :class="messageColor">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Push -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Push — O(1)</p>
        <div class="flex gap-2">
          <input
            v-model="pushValue"
            type="number"
            placeholder="valor"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
            @keyup.enter="push"
          />
          <button
            @click="push"
            :disabled="isAnimating"
            class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <!-- Pop -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Pop — O(1)</p>
        <button
          @click="pop"
          :disabled="isAnimating || stack.length === 0"
          class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
        >
          pop()
        </button>
      </div>

      <!-- Peek -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Peek — O(1)</p>
        <button
          @click="peek"
          :disabled="isAnimating || stack.length === 0"
          class="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
        >
          peek()
        </button>
      </div>

      <!-- Validar parênteses -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Validar parênteses</p>
        <div class="flex gap-2">
          <input
            v-model="parenInput"
            type="text"
            placeholder="ex: ( [ { } ] )"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
            @keyup.enter="validateParens"
          />
          <button
            @click="validateParens"
            :disabled="isAnimating"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
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

type StackItem = { id: number; value: number }

let nextId = 0
const stack = ref<StackItem[]>([
  { id: nextId++, value: 7 },
  { id: nextId++, value: 12 },
  { id: nextId++, value: 45 },
])

const pushValue = ref<number | null>(null)
const parenInput = ref('')

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<number | null>(null)
const removed = ref<number | null>(null)

function getItemClass(i: number) {
  if (removed.value === i) return 'border-red-500/50 bg-red-500/10 text-red-300'
  if (highlighted.value === i) return 'border-violet-500/50 bg-violet-500/10 text-violet-300'
  if (i === stack.value.length - 1) return 'border-violet-500/30 bg-zinc-800 text-zinc-100'
  return 'border-zinc-700 bg-zinc-800 text-zinc-100'
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function clearHighlights() {
  highlighted.value = null
  removed.value = null
  message.value = ''
}

async function push() {
  if (pushValue.value === null || isAnimating.value) return
  isAnimating.value = true
  clearHighlights()

  const val = pushValue.value
  stack.value.push({ id: nextId++, value: val })
  highlighted.value = stack.value.length - 1
  message.value = `push(${val}) — adicionado ao topo em O(1)`
  messageColor.value = 'text-emerald-400'

  await sleep(1200)
  clearHighlights()
  isAnimating.value = false
  pushValue.value = null
}

async function pop() {
  if (isAnimating.value || stack.value.length === 0) return
  isAnimating.value = true
  clearHighlights()

  const top = stack.value[stack.value.length - 1]
  if (!top) {
    isAnimating.value = false
    return
  }

  removed.value = stack.value.length - 1
  message.value = `pop() → ${top.value} removido do topo`
  messageColor.value = 'text-red-400'

  await sleep(700)
  stack.value.pop()
  removed.value = null
  message.value = `pop() concluído — O(1)`
  messageColor.value = 'text-emerald-400'

  await sleep(800)
  clearHighlights()
  isAnimating.value = false
}

async function peek() {
  if (isAnimating.value || stack.value.length === 0) return
  isAnimating.value = true
  clearHighlights()

  const top = stack.value[stack.value.length - 1]
  if (!top) {
    isAnimating.value = false
    return
  }

  highlighted.value = stack.value.length - 1
  message.value = `peek() → ${top.value} (apenas lê, não remove)`
  messageColor.value = 'text-amber-400'

  await sleep(1500)
  clearHighlights()
  isAnimating.value = false
}

async function validateParens() {
  if (!parenInput.value || isAnimating.value) return
  isAnimating.value = true

  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
  const opens = new Set(['(', '[', '{'])
  const tempStack: string[] = []
  const chars = parenInput.value.replace(/\s/g, '').split('')
  let valid = true

  stack.value = []
  nextId = 0

  for (const char of chars) {
    if (opens.has(char)) {
      tempStack.push(char)
      stack.value.push({ id: nextId++, value: char as unknown as number })
      highlighted.value = stack.value.length - 1
      message.value = `push('${char}') — abre parêntese`
      messageColor.value = 'text-violet-400'
      await sleep(600)
    } else if (pairs[char]) {
      const expected = pairs[char]
      const top = tempStack[tempStack.length - 1]
      if (top !== expected) {
        valid = false
        message.value = `'${char}' não corresponde ao topo '${top}' — inválido!`
        messageColor.value = 'text-red-400'
        break
      }
      tempStack.pop()
      removed.value = stack.value.length - 1
      message.value = `pop() — '${char}' fecha '${top}'`
      messageColor.value = 'text-amber-400'
      await sleep(600)
      stack.value.pop()
      removed.value = null
    }
  }

  if (valid && tempStack.length === 0) {
    message.value = '✓ parênteses balanceados!'
    messageColor.value = 'text-emerald-400'
  } else if (valid) {
    message.value = `✗ ficaram ${tempStack.length} parênteses por fechar`
    messageColor.value = 'text-red-400'
  }

  highlighted.value = null
  isAnimating.value = false
}

function reset() {
  clearHighlights()
  nextId = 0
  stack.value = [
    { id: nextId++, value: 7 },
    { id: nextId++, value: 12 },
    { id: nextId++, value: 45 },
  ]
  parenInput.value = ''
  message.value = 'Experimenta as operações abaixo'
  messageColor.value = 'text-zinc-600'
}
</script>
