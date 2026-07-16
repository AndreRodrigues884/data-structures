<template>
    <div class="max-w-3xl space-y-8">

        <!-- Trie visual -->
        <div class="bg-zinc-900 border border-zinc-800 p-6">
            <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">Trie</p>

            <svg :viewBox="`0 0 ${svgWidth} 240`" class="w-full mb-3" xmlns="http://www.w3.org/2000/svg">
                <line v-for="edge in edgeList" :key="`${edge.from}-${edge.to}`"
                    :x1="getPos(edge.from).x" :y1="getPos(edge.from).y"
                    :x2="getPos(edge.to).x" :y2="getPos(edge.to).y"
                    stroke="#3f3f5a" stroke-width="1.5" />

                <g v-for="node in nodeList" :key="node.id">
                    <circle :cx="getPos(node.id).x" :cy="getPos(node.id).y" r="16"
                        :fill="getNodeFill(node.id)" :stroke="getNodeStroke(node.id)"
                        :stroke-width="node.isEnd ? 2.5 : 1.5" class="transition-all duration-300" />
                    <text :x="getPos(node.id).x" :y="getPos(node.id).y" text-anchor="middle"
                        dominant-baseline="middle" :fill="getNodeText(node.id)"
                        font-family="JetBrains Mono, monospace" font-size="13" font-weight="500">{{
                        node.char || '•' }}</text>
                </g>
            </svg>

            <!-- Message -->
            <p class="font-mono text-xs h-4" :class="messageColor">{{ message }}</p>

            <!-- Stored words -->
            <div class="flex gap-2 flex-wrap pt-3 mt-1 border-t border-zinc-800">
                <span class="font-mono text-xs text-zinc-600 mr-1">palavras:</span>
                <span v-if="storedWords.length === 0" class="font-mono text-xs text-zinc-700">(vazio)</span>
                <span v-for="w in storedWords" :key="w"
                    class="font-mono text-xs px-2 py-0.5 border border-zinc-700 text-zinc-300">{{ w }}</span>
            </div>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Insert -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">insert(word) — O(m)</p>
                <div class="flex gap-2">
                    <input v-model="insertWord" type="text" placeholder="palavra" @keyup.enter="doInsert"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <button @click="doInsert" :disabled="isAnimating || !insertWord.trim()"
                        class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Search -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">search(word) — O(m)</p>
                <div class="flex gap-2">
                    <input v-model="searchWord" type="text" placeholder="palavra" @keyup.enter="doSearch"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <button @click="doSearch" :disabled="isAnimating || !searchWord.trim()"
                        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- StartsWith -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">startsWith(prefix) — O(m)</p>
                <div class="flex gap-2">
                    <input v-model="prefixWord" type="text" placeholder="prefixo" @keyup.enter="doStartsWith"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <button @click="doStartsWith" :disabled="isAnimating || !prefixWord.trim()"
                        class="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Delete -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">delete(word) — O(m)</p>
                <div class="flex gap-2">
                    <input v-model="deleteWord" type="text" placeholder="palavra" @keyup.enter="doDelete"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <button @click="doDelete" :disabled="isAnimating || !deleteWord.trim()"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

        </div>

        <!-- Quick inserts -->
        <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
            <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Inserções rápidas</p>
            <div class="flex gap-2 flex-wrap">
                <button v-for="w in quickWords" :key="w" @click="insertWord = w; doInsert()" :disabled="isAnimating"
                    class="font-mono text-xs px-2 py-1.5 border border-zinc-700 text-zinc-500 hover:border-zinc-500 disabled:opacity-40 transition-colors">
                    insert("{{ w }}")
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
import { ref, computed } from 'vue'

type TrieNode = {
    id: string
    char: string
    isEnd: boolean
    parentId: string | null
    childIds: string[]
}

let idCounter = 0

function makeInitial(): Record<string, TrieNode> {
    return { root: { id: 'root', char: '', isEnd: false, parentId: null, childIds: [] } }
}

const nodes = ref<Record<string, TrieNode>>(makeInitial())

const insertWord = ref('')
const searchWord = ref('')
const prefixWord = ref('')
const deleteWord = ref('')

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<Set<string>>(new Set())
const found = ref<string | null>(null)
const notFoundPath = ref<Set<string>>(new Set())

const quickWords = ['car', 'cat', 'card', 'dog', 'do']

const nodeList = computed(() => Object.values(nodes.value))
const edgeList = computed(() =>
    nodeList.value.filter(n => n.parentId).map(n => ({ from: n.parentId!, to: n.id }))
)

const storedWords = computed(() => {
    const words: string[] = []
    function dfs(id: string, prefix: string) {
        const node = nodes.value[id]
        if (!node) return
        if (node.isEnd) words.push(prefix)
        for (const childId of node.childIds) {
            const child = nodes.value[childId]
            if (child) dfs(childId, prefix + child.char)
        }
    }
    dfs('root', '')
    return words.sort()
})

const layoutPositions = computed(() => {
    const positions: Record<string, { x: number; y: number }> = {}
    let counter = 0
    const xGap = 44
    const yGap = 50

    function visit(id: string, depth: number) {
        const node = nodes.value[id]
        if (!node) return
        if (node.childIds.length === 0) {
            positions[id] = { x: counter * xGap + xGap / 2 + 10, y: depth * yGap + 25 }
            counter++
        } else {
            node.childIds.forEach(c => visit(c, depth + 1))
            const xs = node.childIds.map(c => positions[c]?.x ?? 0)
            positions[id] = { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: depth * yGap + 25 }
        }
    }
    visit('root', 0)
    return positions
})

const svgWidth = computed(() => {
    const xs = Object.values(layoutPositions.value).map(p => p.x)
    return xs.length ? Math.max(260, Math.max(...xs) + 30) : 260
})

function getPos(id: string) {
    return layoutPositions.value[id] ?? { x: 20, y: 25 }
}

function getNodeFill(id: string) {
    if (notFoundPath.value.has(id)) return '#2b0d0d'
    if (found.value === id) return '#0d2b1e'
    if (highlighted.value.has(id)) return '#1e1b4b'
    const node = nodes.value[id]
    if (node?.isEnd) return '#0d2b1e'
    return '#18181f'
}

function getNodeStroke(id: string) {
    if (notFoundPath.value.has(id)) return '#f87171'
    if (found.value === id) return '#3de0c0'
    if (highlighted.value.has(id)) return '#7c6dfa'
    const node = nodes.value[id]
    if (node?.isEnd) return '#3de0c0'
    return '#3f3f5a'
}

function getNodeText(id: string) {
    if (notFoundPath.value.has(id)) return '#f87171'
    if (found.value === id) return '#3de0c0'
    if (highlighted.value.has(id)) return '#a78bfa'
    const node = nodes.value[id]
    if (node?.isEnd) return '#3de0c0'
    return '#e8e8f0'
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function clearHighlights() {
    highlighted.value = new Set()
    found.value = null
    notFoundPath.value = new Set()
}

async function doInsert() {
    const word = insertWord.value.toLowerCase().trim()
    if (!word || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    let currentId = 'root'
    highlighted.value = new Set([currentId])
    message.value = `a inserir "${word}"...`
    messageColor.value = 'text-amber-400'
    await sleep(400)

    for (const ch of word) {
        let childId = nodes.value[currentId]?.childIds.find(id => nodes.value[id]?.char === ch)
        if (!childId) {
            childId = `n${idCounter++}`
            nodes.value[childId] = { id: childId, char: ch, isEnd: false, parentId: currentId, childIds: [] }
            nodes.value[currentId]!.childIds.push(childId)
        }
        currentId = childId
        highlighted.value = new Set([currentId])
        await sleep(400)
    }

    nodes.value[currentId]!.isEnd = true
    found.value = currentId
    highlighted.value = new Set()
    message.value = `"${word}" inserido!`
    messageColor.value = 'text-emerald-400'

    await sleep(1000)
    clearHighlights()
    isAnimating.value = false
    insertWord.value = ''
}

async function walk(word: string) {
    let currentId = 'root'
    for (const ch of word) {
        const childId = nodes.value[currentId]?.childIds.find(id => nodes.value[id]?.char === ch)
        if (!childId) return null
        currentId = childId
        highlighted.value = new Set([currentId])
        await sleep(400)
    }
    return currentId
}

async function doSearch() {
    const word = searchWord.value.toLowerCase().trim()
    if (!word || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    message.value = `a procurar "${word}"...`
    messageColor.value = 'text-amber-400'
    await sleep(300)

    const endId = await walk(word)
    highlighted.value = new Set()

    if (endId && nodes.value[endId]?.isEnd) {
        found.value = endId
        message.value = `search("${word}") → true ✓`
        messageColor.value = 'text-emerald-400'
    } else {
        message.value = `search("${word}") → false ✗`
        messageColor.value = 'text-red-400'
    }

    await sleep(1200)
    clearHighlights()
    isAnimating.value = false
    searchWord.value = ''
}

async function doStartsWith() {
    const prefix = prefixWord.value.toLowerCase().trim()
    if (!prefix || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    message.value = `a procurar prefixo "${prefix}"...`
    messageColor.value = 'text-amber-400'
    await sleep(300)

    const endId = await walk(prefix)
    highlighted.value = new Set()

    if (endId) {
        found.value = endId
        message.value = `startsWith("${prefix}") → true ✓`
        messageColor.value = 'text-emerald-400'
    } else {
        message.value = `startsWith("${prefix}") → false ✗`
        messageColor.value = 'text-red-400'
    }

    await sleep(1200)
    clearHighlights()
    isAnimating.value = false
    prefixWord.value = ''
}

async function doDelete() {
    const word = deleteWord.value.toLowerCase().trim()
    if (!word || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    message.value = `a remover "${word}"...`
    messageColor.value = 'text-amber-400'
    await sleep(300)

    const path: string[] = ['root']
    let currentId = 'root'
    let ok = true
    for (const ch of word) {
        const childId = nodes.value[currentId]?.childIds.find(id => nodes.value[id]?.char === ch)
        if (!childId) { ok = false; break }
        currentId = childId
        path.push(currentId)
        highlighted.value = new Set([currentId])
        await sleep(350)
    }
    highlighted.value = new Set()

    if (!ok || !nodes.value[currentId]?.isEnd) {
        notFoundPath.value = new Set(path)
        message.value = `"${word}" não encontrada`
        messageColor.value = 'text-red-400'
        await sleep(1200)
    } else {
        nodes.value[currentId]!.isEnd = false
        message.value = `"${word}" removida`
        messageColor.value = 'text-emerald-400'
        await sleep(600)

        // remove nós órfãos (sem filhos e que não são fim de outra palavra)
        for (let i = path.length - 1; i > 0; i--) {
            const id = path[i]!
            const node = nodes.value[id]
            if (node && node.childIds.length === 0 && !node.isEnd) {
                const parentId = node.parentId!
                const parent = nodes.value[parentId]
                if (parent) parent.childIds = parent.childIds.filter(c => c !== id)
                delete nodes.value[id]
            } else break
        }
    }

    clearHighlights()
    isAnimating.value = false
    deleteWord.value = ''
}

function reset() {
    idCounter = 0
    nodes.value = makeInitial()
    clearHighlights()
    message.value = 'Experimenta as operações abaixo'
    messageColor.value = 'text-zinc-600'
}
</script>