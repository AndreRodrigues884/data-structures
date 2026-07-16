<template>
    <div class="max-w-3xl space-y-8">

        <!-- Buckets visual -->
        <div class="bg-zinc-900 border border-zinc-800 p-6">
            <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">HashMap — {{ buckets.length }}
                buckets</p>

            <div class="space-y-px">
                <div v-for="(bucket, i) in buckets" :key="i" class="flex items-stretch gap-px">
                    <!-- Index -->
                    <div
                        class="w-10 flex items-center justify-center font-mono text-xs text-zinc-600 bg-zinc-950 border border-zinc-800 shrink-0">
                        {{ i }}
                    </div>

                    <!-- Bucket content -->
                    <div class="flex-1 min-h-10 flex items-center gap-2 px-3 border transition-all duration-300"
                        :class="getbucketClass(i)">
                        <template v-if="bucket.length === 0">
                            <span class="font-mono text-xs text-zinc-700">vazio</span>
                        </template>
                        <template v-else>
                            <div v-for="(item, j) in bucket" :key="j" class="flex items-center gap-1">
                                <span class="font-mono text-xs text-zinc-500">{{ item.key }}:</span>
                                <span class="font-mono text-sm text-zinc-100">{{ item.value }}</span>
                                <span v-if="j < bucket.length - 1" class="text-zinc-600 mx-1">→</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <!-- Message -->
            <p class="font-mono text-xs mt-4 h-4" :class="messageColor">{{ message }}</p>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Set -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">set(key, value) — O(1)</p>
                <div class="space-y-2">
                    <input v-model="setKey" type="text" placeholder="chave"
                        class="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <div class="flex gap-2">
                        <input v-model="setValue" type="text" placeholder="valor"
                            class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                            @keyup.enter="set" />
                        <button @click="set" :disabled="isAnimating"
                            class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                    </div>
                </div>
            </div>

            <!-- Get -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">get(key) — O(1)</p>
                <div class="flex gap-2">
                    <input v-model="getKey" type="text" placeholder="chave"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="get" />
                    <button @click="get" :disabled="isAnimating"
                        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
                <p class="font-mono text-xs text-zinc-600 h-4">{{ getResult }}</p>
            </div>

            <!-- Delete -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">delete(key) — O(1)</p>
                <div class="flex gap-2">
                    <input v-model="deleteKey" type="text" placeholder="chave"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="deleteEntry" />
                    <button @click="deleteEntry" :disabled="isAnimating"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Has -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">has(key) — O(1)</p>
                <div class="flex gap-2">
                    <input v-model="hasKey" type="text" placeholder="chave"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="has" />
                    <button @click="has" :disabled="isAnimating"
                        class="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
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

type Entry = { key: string; value: string }

const SIZE = 8
const buckets = ref<Entry[][]>(Array.from({ length: SIZE }, () => []))

const setKey = ref('')
const setValue = ref('')
const getKey = ref('')
const deleteKey = ref('')
const hasKey = ref('')
const getResult = ref('')

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<number | null>(null)
const removed = ref<number | null>(null)
const added = ref<number | null>(null)

function hash(key: string): number {
    let h = 0
    for (const char of key) h = (h + char.charCodeAt(0)) % SIZE
    return h
}

function getbucketClass(i: number) {
    if (removed.value === i) return 'border-red-500/50 bg-red-500/10'
    if (added.value === i) return 'border-violet-500/50 bg-violet-500/10'
    if (highlighted.value === i) return 'border-emerald-500/50 bg-emerald-500/10'
    return 'border-zinc-800 bg-zinc-950'
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

async function set() {
    if (!setKey.value || !setValue.value || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const key = setKey.value
    const value = setValue.value
    const idx = hash(key)

    highlighted.value = idx
    message.value = `hash("${key}") = ${idx} — a verificar bucket...`
    messageColor.value = 'text-amber-400'
    await sleep(800)

    const bucket = buckets.value[idx]
    if (!bucket) { isAnimating.value = false; return }

    const existing = bucket.findIndex(e => e.key === key)
    if (existing >= 0) {
        const entry = bucket[existing]
        if (entry) entry.value = value
        message.value = `chave "${key}" já existia — valor atualizado`
    } else {
        if (bucket.length > 0) {
            message.value = `colisão no bucket ${idx}! a usar chaining...`
            messageColor.value = 'text-amber-400'
            await sleep(800)
        }
        bucket.push({ key, value })
        message.value = `set("${key}", "${value}") → bucket ${idx}`
    }

    added.value = idx
    messageColor.value = 'text-emerald-400'
    await sleep(1200)
    clearHighlights()
    isAnimating.value = false
    setKey.value = ''
    setValue.value = ''
}

async function get() {
    if (!getKey.value || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    getResult.value = ''

    const key = getKey.value
    const idx = hash(key)

    highlighted.value = idx
    message.value = `hash("${key}") = ${idx} — a procurar no bucket...`
    messageColor.value = 'text-amber-400'
    await sleep(800)

    const bucket = buckets.value[idx]
    const entry = bucket?.find(e => e.key === key)

    if (entry) {
        getResult.value = `→ "${entry.value}"`
        message.value = `get("${key}") → "${entry.value}"`
        messageColor.value = 'text-emerald-400'
    } else {
        getResult.value = '→ undefined'
        message.value = `"${key}" não encontrado`
        messageColor.value = 'text-red-400'
    }

    await sleep(1500)
    clearHighlights()
    isAnimating.value = false
    getKey.value = ''
}

async function deleteEntry() {
    if (!deleteKey.value || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const key = deleteKey.value.trim()
    const idx = hash(key)

    highlighted.value = idx
    message.value = `hash("${key}") = ${idx} — a procurar...`
    messageColor.value = 'text-amber-400'
    await sleep(800)

    const bucket = buckets.value[idx]
    if (!bucket) { isAnimating.value = false; return }

    const index = bucket.findIndex(e => e.key === key)

    if (index >= 0) {
        removed.value = idx
        message.value = `a remover "${key}" do bucket ${idx}...`
        messageColor.value = 'text-red-400'
        await sleep(700)

        // forçar reatividade do Vue
        buckets.value[idx] = bucket.filter(e => e.key !== key)

        message.value = `"${key}" removido`
        messageColor.value = 'text-emerald-400'
    } else {
        message.value = `"${key}" não encontrado — verifica o nome exato`
        messageColor.value = 'text-red-400'
    }

    await sleep(1000)
    clearHighlights()
    isAnimating.value = false
    deleteKey.value = ''
}

async function has() {
    if (!hasKey.value || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const key = hasKey.value
    const idx = hash(key)

    highlighted.value = idx
    message.value = `hash("${key}") = ${idx} — a verificar...`
    messageColor.value = 'text-amber-400'
    await sleep(800)

    const bucket = buckets.value[idx]
    const exists = bucket?.some(e => e.key === key)

    if (exists) {
        message.value = `has("${key}") → true ✓`
        messageColor.value = 'text-emerald-400'
    } else {
        message.value = `has("${key}") → false ✗`
        messageColor.value = 'text-red-400'
    }

    await sleep(1500)
    clearHighlights()
    isAnimating.value = false
    hasKey.value = ''
}

function reset() {
    clearHighlights()
    buckets.value = Array.from({ length: SIZE }, () => [])
    buckets.value[2] = [{ key: 'name', value: 'Alice' }]
    buckets.value[5] = [{ key: 'age', value: '30' }, { key: 'city', value: 'Lisboa' }]
    buckets.value[7] = [{ key: 'job', value: 'dev' }]
    getResult.value = ''
    message.value = 'Experimenta as operações abaixo'
    messageColor.value = 'text-zinc-600'
}

reset()
</script>