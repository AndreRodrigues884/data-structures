<template>
    <div class="max-w-3xl space-y-8">

        <!-- Deque visual -->
        <div class="bg-zinc-900 border border-zinc-800 p-6">
            <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">Deque atual</p>

            <div class="flex items-center gap-0 overflow-x-auto pb-2">

                <!-- Front label -->
                <div class="flex flex-col items-center mr-3 shrink-0">
                    <span class="font-mono text-xs text-violet-400">push/pop</span>
                    <span class="font-mono text-xs text-violet-400">↔</span>
                    <span class="font-mono text-xs text-violet-400 mt-1">front</span>
                </div>

                <!-- Nodes -->
                <div class="flex gap-px">
                    <div v-for="(item, i) in deque" :key="item.id"
                        class="flex flex-col items-center transition-all duration-300">
                        <div class="w-14 h-12 flex items-center justify-center font-mono text-base border transition-all duration-300"
                            :class="getItemClass(i)">
                            {{ item.value }}
                        </div>
                        <span class="font-mono text-xs text-zinc-600 mt-1">{{ i }}</span>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-if="deque.length === 0"
                    class="w-40 h-12 flex items-center justify-center font-mono text-xs text-zinc-600 border border-dashed border-zinc-800 mx-2">
                    vazio
                </div>

                <!-- Back label -->
                <div class="flex flex-col items-center ml-3 shrink-0">
                    <span class="font-mono text-xs text-emerald-400">push/pop</span>
                    <span class="font-mono text-xs text-emerald-400">↔</span>
                    <span class="font-mono text-xs text-emerald-400 mt-1">back</span>
                </div>

            </div>

            <!-- Stats -->
            <div class="flex gap-6 mt-4 pt-4 border-t border-zinc-800">
                <div class="flex gap-2 font-mono text-sm">
                    <span class="text-zinc-500">front:</span>
                    <span class="text-violet-400">{{ deque.length > 0 ? deque[0]?.value : 'null' }}</span>
                </div>
                <div class="flex gap-2 font-mono text-sm">
                    <span class="text-zinc-500">back:</span>
                    <span class="text-emerald-400">{{ deque.length > 0 ? deque[deque.length - 1]?.value : 'null'
                        }}</span>
                </div>
                <div class="flex gap-2 font-mono text-sm">
                    <span class="text-zinc-500">tamanho:</span>
                    <span class="text-zinc-100">{{ deque.length }}</span>
                </div>
            </div>

            <!-- Message -->
            <p class="font-mono text-xs mt-3 h-4" :class="messageColor">{{ message }}</p>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Push Front -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">pushFront — O(1)</p>
                <div class="flex gap-2">
                    <input v-model="pushFrontValue" type="number" placeholder="valor"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="pushFront" />
                    <button @click="pushFront" :disabled="isAnimating"
                        class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Push Back -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">pushBack — O(1)</p>
                <div class="flex gap-2">
                    <input v-model="pushBackValue" type="number" placeholder="valor"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="pushBack" />
                    <button @click="pushBack" :disabled="isAnimating"
                        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Pop Front -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">popFront — O(1)</p>
                <button @click="popFront" :disabled="isAnimating || deque.length === 0"
                    class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                    popFront()
                </button>
            </div>

            <!-- Pop Back -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">popBack — O(1)</p>
                <button @click="popBack" :disabled="isAnimating || deque.length === 0"
                    class="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                    popBack()
                </button>
            </div>

            <!-- Peek Front -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">peekFront — O(1)</p>
                <button @click="peekFront" :disabled="isAnimating || deque.length === 0"
                    class="w-full px-4 py-2 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                    peekFront()
                </button>
            </div>

            <!-- Peek Back -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">peekBack — O(1)</p>
                <button @click="peekBack" :disabled="isAnimating || deque.length === 0"
                    class="w-full px-4 py-2 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                    peekBack()
                </button>
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

type DequeItem = { id: number; value: number }

let nextId = 0
const deque = ref < DequeItem[] > ([
    { id: nextId++, value: 12 },
    { id: nextId++, value: 45 },
    { id: nextId++, value: 7 },
    { id: nextId++, value: 93 },
])

const pushFrontValue = ref < number | null > (null)
const pushBackValue = ref < number | null > (null)
const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref < number | null > (null)
const removed = ref < number | null > (null)
const added = ref < number | null > (null)

function getItemClass(i: number) {
    if (removed.value === i) return 'border-red-500/50 bg-red-500/10 text-red-300'
    if (added.value === i) return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
    if (highlighted.value === i) return 'border-violet-500/50 bg-violet-500/10 text-violet-300'
    if (i === 0) return 'border-violet-500/30 bg-zinc-800 text-zinc-100'
    if (i === deque.value.length - 1) return 'border-emerald-500/30 bg-zinc-800 text-zinc-100'
    return 'border-zinc-700 bg-zinc-800 text-zinc-100'
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function clearHighlights() {
    highlighted.value = null
    removed.value = null
    added.value = null
    message.value = ''
}

async function pushFront() {
    if (pushFrontValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const val = pushFrontValue.value
    deque.value.unshift({ id: nextId++, value: val })
    added.value = 0
    message.value = `pushFront(${val}) — adicionado ao front em O(1)`
    messageColor.value = 'text-violet-400'

    await sleep(1200)
    clearHighlights()
    isAnimating.value = false
    pushFrontValue.value = null
}

async function pushBack() {
    if (pushBackValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const val = pushBackValue.value
    deque.value.push({ id: nextId++, value: val })
    added.value = deque.value.length - 1
    message.value = `pushBack(${val}) — adicionado ao back em O(1)`
    messageColor.value = 'text-emerald-400'

    await sleep(1200)
    clearHighlights()
    isAnimating.value = false
    pushBackValue.value = null
}

async function popFront() {
    if (isAnimating.value || deque.value.length === 0) return
    isAnimating.value = true
    clearHighlights()

    const front = deque.value[0]
    if (!front) { isAnimating.value = false; return }

    removed.value = 0
    message.value = `popFront() → ${front.value} removido do front`
    messageColor.value = 'text-red-400'

    await sleep(700)
    deque.value.shift()
    removed.value = null
    message.value = `popFront() concluído — O(1)`
    messageColor.value = 'text-emerald-400'

    await sleep(800)
    clearHighlights()
    isAnimating.value = false
}

async function popBack() {
    if (isAnimating.value || deque.value.length === 0) return
    isAnimating.value = true
    clearHighlights()

    const back = deque.value[deque.value.length - 1]
    if (!back) { isAnimating.value = false; return }

    removed.value = deque.value.length - 1
    message.value = `popBack() → ${back.value} removido do back`
    messageColor.value = 'text-amber-400'

    await sleep(700)
    deque.value.pop()
    removed.value = null
    message.value = `popBack() concluído — O(1)`
    messageColor.value = 'text-emerald-400'

    await sleep(800)
    clearHighlights()
    isAnimating.value = false
}

async function peekFront() {
    if (isAnimating.value || deque.value.length === 0) return
    isAnimating.value = true
    clearHighlights()

    const front = deque.value[0]
    if (!front) { isAnimating.value = false; return }

    highlighted.value = 0
    message.value = `peekFront() → ${front.value} (apenas lê, não remove)`
    messageColor.value = 'text-violet-400'

    await sleep(1500)
    clearHighlights()
    isAnimating.value = false
}

async function peekBack() {
    if (isAnimating.value || deque.value.length === 0) return
    isAnimating.value = true
    clearHighlights()

    const back = deque.value[deque.value.length - 1]
    if (!back) { isAnimating.value = false; return }

    highlighted.value = deque.value.length - 1
    message.value = `peekBack() → ${back.value} (apenas lê, não remove)`
    messageColor.value = 'text-emerald-400'

    await sleep(1500)
    clearHighlights()
    isAnimating.value = false
}

function reset() {
    clearHighlights()
    nextId = 0
    deque.value = [
        { id: nextId++, value: 12 },
        { id: nextId++, value: 45 },
        { id: nextId++, value: 7 },
        { id: nextId++, value: 93 },
    ]
    message.value = 'Experimenta as operações abaixo'
    messageColor.value = 'text-zinc-600'
}
</script>