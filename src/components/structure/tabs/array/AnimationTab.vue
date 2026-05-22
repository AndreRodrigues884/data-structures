<template>
    <div class="max-w-3xl space-y-8">

        <!-- Array visual -->
        <div class="bg-zinc-900 border border-zinc-800 p-6">
            <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">Array atual</p>

            <div class="flex gap-px min-h-16 flex-wrap">
                <div v-for="(item, i) in array" :key="item.id"
                    class="flex flex-col items-center transition-all duration-300">
                    <div class="w-14 h-14 flex items-center justify-center font-mono text-lg border transition-all duration-300"
                        :class="getCellClass(i)">
                        {{ item.value }}
                    </div>
                    <span class="font-mono text-xs text-zinc-600 mt-1">[{{ i }}]</span>
                </div>

                <!-- Empty state -->
                <div v-if="array.length === 0" class="text-zinc-600 font-mono text-sm flex items-center px-2">
                    array vazio
                </div>
            </div>

            <!-- Message -->
            <p class="font-mono text-xs mt-4 h-4 transition-all" :class="messageColor">
                {{ message }}
            </p>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-2 gap-4">

            <!-- Push -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Push — O(1)</p>
                <div class="flex gap-2">
                    <input v-model="inputValue" type="number" placeholder="valor"
                        class="flex-1 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="push" />
                    <button @click="push" :disabled="isAnimating"
                        class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                        →
                    </button>
                </div>
            </div>

            <!-- Insert at index -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Insert — O(n)</p>
                <div class="flex gap-2">
                    <input v-model="insertValue" type="number" placeholder="valor"
                        class="flex-1 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <input v-model="insertIndex" type="number" placeholder="idx"
                        class="w-16 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <button @click="insertAt" :disabled="isAnimating"
                        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                        →
                    </button>
                </div>
            </div>

            <!-- Search -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Search — O(n)</p>
                <div class="flex gap-2">
                    <input v-model="searchValue" type="number" placeholder="valor"
                        class="flex-1 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="search" />
                    <button @click="search" :disabled="isAnimating"
                        class="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                        →
                    </button>
                </div>
            </div>

            <!-- Remove -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Remove index — O(n)</p>
                <div class="flex gap-2">
                    <input v-model="removeIndex" type="number" placeholder="índice"
                        class="flex-1 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="removeAt" />
                    <button @click="removeAt" :disabled="isAnimating"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                        →
                    </button>
                </div>
            </div>

        </div>

        <!-- Reset -->
        <button @click="reset" :disabled="isAnimating"
            class="font-mono text-sm text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-4 py-2 transition-colors disabled:opacity-40">
            ↺ Reset
        </button>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Cell = { id: number; value: number }

let nextId = 0
const array = ref<Cell[]>([
    { id: nextId++, value: 12 },
    { id: nextId++, value: 45 },
    { id: nextId++, value: 7 },
    { id: nextId++, value: 93 },
    { id: nextId++, value: 31 },
])

const inputValue = ref<number | null>(null)
const insertValue = ref<number | null>(null)
const insertIndex = ref<number | null>(null)
const searchValue = ref<number | null>(null)
const removeIndex = ref<number | null>(null)

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<number | null>(null)
const found = ref<number | null>(null)
const removed = ref<number | null>(null)

function getCellClass(i: number) {
    if (removed.value === i) return 'bg-red-500/20 border-red-500/50 text-red-300'
    if (found.value === i) return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
    if (highlighted.value === i) return 'bg-violet-500/20 border-violet-500/50 text-violet-300'
    return 'bg-zinc-800 border-zinc-700 text-zinc-100'
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function push() {
    if (inputValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const val = inputValue.value
    array.value.push({ id: nextId++, value: val })
    found.value = array.value.length - 1
    message.value = `pushed ${val} no índice ${array.value.length - 1}`
    messageColor.value = 'text-emerald-400'

    await sleep(1000)
    clearHighlights()
    isAnimating.value = false
    inputValue.value = null
}

async function insertAt() {
    if (insertValue.value === null || insertIndex.value === null || isAnimating.value) return
    const idx = insertIndex.value
    const val = insertValue.value
    if (idx < 0 || idx > array.value.length) {
        message.value = `índice ${idx} inválido`
        messageColor.value = 'text-red-400'
        return
    }

    isAnimating.value = true
    clearHighlights()

    // highlight elements that will shift
    for (let i = array.value.length - 1; i >= idx; i--) {
        highlighted.value = i
        message.value = `a mover arr[${i}] → arr[${i + 1}]`
        messageColor.value = 'text-amber-400'
        await sleep(300)
    }

    array.value.splice(idx, 0, { id: nextId++, value: val })
    found.value = idx
    highlighted.value = null
    message.value = `inserido ${val} no índice ${idx}`
    messageColor.value = 'text-emerald-400'

    await sleep(1000)
    clearHighlights()
    isAnimating.value = false
    insertValue.value = null
    insertIndex.value = null
}

async function search() {
    if (searchValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const target = searchValue.value
    let foundIdx = -1

    for (let i = 0; i < array.value.length; i++) {
        const cell = array.value[i]
        if (!cell) break

        highlighted.value = i
        message.value = `a verificar arr[${i}] = ${cell.value}...`
        messageColor.value = 'text-amber-400'
        await sleep(400)

        if (cell.value === target) {
            foundIdx = i
            break
        }
    }

    highlighted.value = null
    if (foundIdx >= 0) {
        found.value = foundIdx
        message.value = `encontrado ${target} no índice ${foundIdx}`
        messageColor.value = 'text-emerald-400'
    } else {
        message.value = `${target} não encontrado`
        messageColor.value = 'text-red-400'
    }

    await sleep(1500)
    clearHighlights()
    isAnimating.value = false
}

async function removeAt() {
    if (removeIndex.value === null || isAnimating.value) return
    const idx = removeIndex.value
    if (idx < 0 || idx >= array.value.length) {
        message.value = `índice ${idx} inválido`
        messageColor.value = 'text-red-400'
        return
    }

    isAnimating.value = true
    clearHighlights()

    removed.value = idx
    const cell = array.value[idx]
    if (!cell) return

    removed.value = idx
    message.value = `a remover arr[${idx}] = ${cell.value}`
    messageColor.value = 'text-red-400'
    await sleep(600)

    array.value.splice(idx, 1)
    removed.value = null

    // highlight shift
    for (let i = idx; i < array.value.length; i++) {
        highlighted.value = i
        message.value = `a mover arr[${i + 1}] → arr[${i}]`
        messageColor.value = 'text-amber-400'
        await sleep(250)
    }

    highlighted.value = null
    message.value = `elemento removido do índice ${idx}`
    messageColor.value = 'text-emerald-400'

    await sleep(800)
    clearHighlights()
    isAnimating.value = false
    removeIndex.value = null
}

function clearHighlights() {
    highlighted.value = null
    found.value = null
    removed.value = null
    message.value = ''
}

function reset() {
    clearHighlights()
    nextId = 0
    array.value = [
        { id: nextId++, value: 12 },
        { id: nextId++, value: 45 },
        { id: nextId++, value: 7 },
        { id: nextId++, value: 93 },
        { id: nextId++, value: 31 },
    ]
    message.value = 'Experimenta as operações abaixo'
    messageColor.value = 'text-zinc-600'
}
</script>