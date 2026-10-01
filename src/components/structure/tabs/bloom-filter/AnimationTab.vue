<template>
  <div class="max-w-3xl space-y-8">
    <!-- Bloom Filter visual -->
    <div class="bg-zinc-900 border border-zinc-800 p-6">
      <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
        Bloom Filter — {{ SIZE }} bits, {{ NUM_HASHES }} funções de hash
      </p>

      <!-- Bit array -->
      <div class="flex gap-px mb-4">
        <div
          v-for="(bit, i) in bits"
          :key="i"
          class="flex-1 flex flex-col items-center border py-2 transition-all duration-300"
          :class="getbitClass(i)"
        >
          <span class="font-mono text-sm font-bold">{{ bit }}</span>
          <span class="font-mono text-xs text-zinc-700 mt-1">{{ i }}</span>
        </div>
      </div>

      <!-- Hash indicators -->
      <div class="flex gap-3 flex-wrap mb-4 min-h-6">
        <div
          v-for="(h, i) in activeHashes"
          :key="i"
          class="font-mono text-xs px-2 py-1 border border-violet-500/40 text-violet-400"
        >
          h{{ i + 1 }} → {{ h }}
        </div>
      </div>

      <!-- Inserted words -->
      <div class="flex gap-2 flex-wrap min-h-6 mb-3">
        <span
          v-for="word in insertedWords"
          :key="word"
          class="font-mono text-xs px-2 py-1 border border-emerald-500/40 text-emerald-400"
        >
          {{ word }}
        </span>
      </div>

      <!-- Message -->
      <p class="font-mono text-xs h-4" :class="messageColor">{{ message }}</p>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Add -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">add(word) — O(k)</p>
        <div class="flex gap-2">
          <input
            v-model="addInput"
            type="text"
            placeholder="palavra"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
            @keyup.enter="addWord"
          />
          <button
            @click="addWord"
            :disabled="isAnimating"
            class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
        <!-- Quick add -->
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="word in quickWords"
            :key="word"
            @click="quickAdd(word)"
            :disabled="isAnimating"
            class="font-mono text-xs px-2 py-1 border border-zinc-700 text-zinc-500 hover:border-zinc-500 disabled:opacity-40 transition-colors"
          >
            {{ word }}
          </button>
        </div>
      </div>

      <!-- Has -->
      <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
        <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">has(word) — O(k)</p>
        <div class="flex gap-2">
          <input
            v-model="hasInput"
            type="text"
            placeholder="palavra"
            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
            @keyup.enter="hasWord"
          />
          <button
            @click="hasWord"
            :disabled="isAnimating"
            class="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors"
          >
            →
          </button>
        </div>
        <!-- Quick check -->
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="word in quickWords.concat(['test', 'foo', 'bar'])"
            :key="word"
            @click="quickCheck(word)"
            :disabled="isAnimating"
            class="font-mono text-xs px-2 py-1 border border-zinc-700 text-zinc-500 hover:border-zinc-500 disabled:opacity-40 transition-colors"
          >
            {{ word }}
          </button>
        </div>
      </div>
    </div>

    <!-- Result -->
    <div
      v-if="lastResult"
      class="bg-zinc-900 border p-4 transition-colors"
      :class="
        lastResult.type === 'no'
          ? 'border-zinc-700'
          : lastResult.type === 'fp'
            ? 'border-amber-500/40'
            : 'border-emerald-500/40'
      "
    >
      <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">resultado</p>
      <p
        class="font-mono text-sm"
        :class="
          lastResult.type === 'no' ? 'text-zinc-400' : lastResult.type === 'fp' ? 'text-amber-400' : 'text-emerald-400'
        "
      >
        {{ lastResult.message }}
      </p>
      <p class="text-xs text-zinc-600 mt-1">{{ lastResult.note }}</p>
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

const SIZE = 16
const NUM_HASHES = 3

const bits = ref<number[]>(Array(SIZE).fill(0))
const insertedWords = ref<string[]>([])
const addInput = ref('')
const hasInput = ref('')
const isAnimating = ref(false)
const message = ref('Adiciona palavras e verifica se existem no filtro')
const messageColor = ref('text-zinc-600')
const activeHashes = ref<number[]>([])
const highlighted = ref<number[]>([])
const checking = ref<number[]>([])
const lastResult = ref<{ type: string; message: string; note: string } | null>(null)

const quickWords = ['hello', 'world', 'bloom', 'filter']

function hash1(word: string): number {
  let h = 0
  for (const c of word) h = (h * 31 + c.charCodeAt(0)) % SIZE
  return h
}

function hash2(word: string): number {
  let h = 5381
  for (const c of word) h = ((h << 5) + h + c.charCodeAt(0)) % SIZE
  return Math.abs(h)
}

function hash3(word: string): number {
  let h = 0
  for (let i = 0; i < word.length; i++) h = (h + word.charCodeAt(i) * (i + 1)) % SIZE
  return h
}

function getHashes(word: string): number[] {
  return [hash1(word), hash2(word), hash3(word)]
}

function getbitClass(i: number) {
  if (highlighted.value.includes(i)) return 'border-violet-500/60 bg-violet-500/20 text-violet-300'
  if (checking.value.includes(i)) return 'border-amber-500/50 bg-amber-500/10 text-amber-300'
  if (bits.value[i] === 1) return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
  return 'border-zinc-700 bg-zinc-900 text-zinc-700'
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function addWord() {
  if (!addInput.value || isAnimating.value) return
  isAnimating.value = true
  lastResult.value = null

  const word = addInput.value.trim().toLowerCase()
  const hashes = getHashes(word)
  activeHashes.value = hashes

  message.value = `a calcular hashes para "${word}"...`
  messageColor.value = 'text-amber-400'
  await sleep(600)

  for (const h of hashes) {
    highlighted.value = [h]
    message.value = `a ativar bit ${h}`
    messageColor.value = 'text-violet-400'
    bits.value[h] = 1
    await sleep(400)
  }

  highlighted.value = []
  if (!insertedWords.value.includes(word)) {
    insertedWords.value.push(word)
  }

  message.value = `"${word}" inserido — bits ${hashes.join(', ')} ativados`
  messageColor.value = 'text-emerald-400'

  await sleep(800)
  activeHashes.value = []
  isAnimating.value = false
  addInput.value = ''
}

async function hasWord() {
  if (!hasInput.value || isAnimating.value) return
  isAnimating.value = true
  lastResult.value = null

  const word = hasInput.value.trim().toLowerCase()
  const hashes = getHashes(word)
  activeHashes.value = hashes

  message.value = `a verificar "${word}"...`
  messageColor.value = 'text-amber-400'
  await sleep(600)

  let definitelyNo = false
  for (const h of hashes) {
    checking.value = [h]
    message.value = `a verificar bit ${h} = ${bits.value[h]}`
    messageColor.value = 'text-amber-400'
    await sleep(500)

    if (bits.value[h] === 0) {
      definitelyNo = true
      message.value = `bit ${h} está a 0 → definitivamente NÃO está!`
      messageColor.value = 'text-zinc-400'
      break
    }
  }

  checking.value = []
  activeHashes.value = []

  if (definitelyNo) {
    lastResult.value = {
      type: 'no',
      message: `"${word}" definitivamente NÃO está no filtro`,
      note: '100% garantido — sem falsos negativos',
    }
  } else {
    const isActuallyIn = insertedWords.value.includes(word)
    if (isActuallyIn) {
      lastResult.value = {
        type: 'yes',
        message: `"${word}" provavelmente está no filtro`,
        note: 'E de facto está — verdadeiro positivo',
      }
      message.value = `✓ "${word}" provavelmente está`
      messageColor.value = 'text-emerald-400'
    } else {
      lastResult.value = {
        type: 'fp',
        message: `"${word}" provavelmente está no filtro`,
        note: '⚠ Mas não está — falso positivo!',
      }
      message.value = `⚠ falso positivo para "${word}"!`
      messageColor.value = 'text-amber-400'
    }
  }

  await sleep(500)
  isAnimating.value = false
  hasInput.value = ''
}

function reset() {
  bits.value = Array(SIZE).fill(0)
  insertedWords.value = []
  activeHashes.value = []
  highlighted.value = []
  checking.value = []
  lastResult.value = null
  message.value = 'Adiciona palavras e verifica se existem no filtro'
  messageColor.value = 'text-zinc-600'
}

function quickAdd(word: string) {
  addInput.value = word
  addWord()
}

function quickCheck(word: string) {
  hasInput.value = word
  hasWord()
}
</script>
