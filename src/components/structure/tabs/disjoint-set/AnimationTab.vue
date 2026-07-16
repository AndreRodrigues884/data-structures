<template>
    <div class="max-w-3xl space-y-8">

        <!-- Visual -->
        <div class="bg-zinc-900 border border-zinc-800 p-6">
            <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">Disjoint Set — {{ n }} elementos
            </p>

            <!-- Tree visualization -->
            <svg viewBox="0 0 500 200" class="w-full mb-4" xmlns="http://www.w3.org/2000/svg">
                <line v-for="edge in treeEdges" :key="`${edge.from}-${edge.to}`" :x1="nodePos(edge.from).x"
                    :y1="nodePos(edge.from).y" :x2="nodePos(edge.to).x" :y2="nodePos(edge.to).y"
                    :stroke="getEdgeColor(edge.from, edge.to)" stroke-width="1.5" class="transition-all duration-300" />

                <g v-for="i in n" :key="i - 1">
                    <circle :cx="nodePos(i - 1).x" :cy="nodePos(i - 1).y" r="22" :fill="getNodeFill(i - 1)"
                        :stroke="getNodeStroke(i - 1)" stroke-width="1.5" class="transition-all duration-300" />
                    <text :x="nodePos(i - 1).x" :y="nodePos(i - 1).y" text-anchor="middle" dominant-baseline="middle"
                        fill="#e8e8f0" font-family="JetBrains Mono, monospace" font-size="14" font-weight="500">{{ i - 1
                        }}</text>
                </g>
            </svg>

            <!-- Parent array -->
            <div class="mb-3">
                <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">parent[]</p>
                <div class="flex gap-px">
                    <div v-for="(p, i) in parent" :key="i"
                        class="flex-1 flex flex-col items-center border py-2 transition-all duration-300"
                        :class="getArrayClass(i)">
                        <span class="font-mono text-sm">{{ p }}</span>
                        <span class="font-mono text-xs text-zinc-600 mt-1">{{ i }}</span>
                    </div>
                </div>
            </div>

            <!-- Sets display -->
            <div class="flex gap-3 flex-wrap pt-3 border-t border-zinc-800">
                <div v-for="(set, root) in currentSets" :key="root" class="flex items-center gap-2">
                    <span class="font-mono text-xs text-zinc-500">{{ root }}:</span>
                    <div class="flex gap-1">
                        <span v-for="el in set" :key="el" class="font-mono text-xs px-2 py-0.5 border"
                            :class="getSetClass(Number(root))">{{ el }}</span>
                    </div>
                </div>
            </div>

            <!-- Message -->
            <p class="font-mono text-xs mt-3 h-4" :class="messageColor">{{ message }}</p>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Union -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">union(x, y) — O(α)</p>
                <div class="flex gap-2">
                    <input v-model="unionX" type="number" min="0" :max="n - 1" placeholder="x"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <input v-model="unionY" type="number" min="0" :max="n - 1" placeholder="y"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <button @click="doUnion" :disabled="isAnimating"
                        class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Find -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">find(x) — O(α)</p>
                <div class="flex gap-2">
                    <input v-model="findX" type="number" min="0" :max="n - 1" placeholder="x"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="doFind" />
                    <button @click="doFind" :disabled="isAnimating"
                        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
                <p class="font-mono text-xs text-zinc-600 h-4">{{ findResult }}</p>
            </div>

            <!-- Connected -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">connected(x, y) — O(α)</p>
                <div class="flex gap-2">
                    <input v-model="connX" type="number" min="0" :max="n - 1" placeholder="x"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <input v-model="connY" type="number" min="0" :max="n - 1" placeholder="y"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                    <button @click="doConnected" :disabled="isAnimating"
                        class="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Quick unions -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Quick unions</p>
                <div class="flex gap-2 flex-wrap">
                    <button v-for="qu in quickUnions" :key="`${qu[0]}-${qu[1]}`"
                        @click="unionX = qu[0]; unionY = qu[1]; doUnion()" :disabled="isAnimating"
                        class="font-mono text-xs px-2 py-1.5 border border-zinc-700 text-zinc-500 hover:border-zinc-500 disabled:opacity-40 transition-colors">
                        union({{ qu[0] }},{{ qu[1] }})
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
import { ref, computed } from 'vue'

const n = 7
const parent = ref<number[]>(Array.from({ length: n }, (_, i) => i))
const rank = ref<number[]>(Array(n).fill(0))

const unionX = ref<number | null>(null)
const unionY = ref<number | null>(null)
const findX = ref<number | null>(null)
const connX = ref<number | null>(null)
const connY = ref<number | null>(null)

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<number[]>([])
const findResult = ref('')

const quickUnions: [number, number][] = [
    [0, 1], [2, 3], [4, 5], [0, 2], [3, 6],
]

const setColors = ['text-violet-400 border-violet-500/40', 'text-emerald-400 border-emerald-500/40',
    'text-amber-400 border-amber-500/40', 'text-red-400 border-red-500/40',
    'text-blue-400 border-blue-500/40', 'text-pink-400 border-pink-500/40',
    'text-teal-400 border-teal-500/40']

const nodePositions = [
    { x: 70, y: 100 },
    { x: 150, y: 40 },
    { x: 150, y: 160 },
    { x: 250, y: 100 },
    { x: 330, y: 40 },
    { x: 330, y: 160 },
    { x: 430, y: 100 },
]

function nodePos(i: number) {
    return nodePositions[i] ?? { x: 250, y: 100 }
}

const treeEdges = computed(() => {
    const edges: { from: number; to: number }[] = []
    for (let i = 0; i < n; i++) {
        const p = parent.value[i]
        if (p !== undefined && p !== i) edges.push({ from: p, to: i })
    }
    return edges
})

const currentSets = computed(() => {
    const sets: Record<number, number[]> = {}
    for (let i = 0; i < n; i++) {
        const root = find(i)
        if (!sets[root]) sets[root] = []
        sets[root].push(i)
    }
    return sets
})

function find(x: number): number {
    if (parent.value[x] !== x) {
        parent.value[x] = find(parent.value[x]!)
    }
    return parent.value[x]!
}

function getNodeFill(i: number) {
    if (highlighted.value.includes(i)) return '#1e1b4b'
    if (parent.value[i] === i) return '#111118'
    return '#18181f'
}

function getNodeStroke(i: number) {
    if (highlighted.value.includes(i)) return '#7c6dfa'
    if (parent.value[i] === i) return '#3de0c0'
    return '#3f3f5a'
}

function getEdgeColor(from: number, to: number) {
    if (highlighted.value.includes(from) && highlighted.value.includes(to)) return '#7c6dfa'
    return '#3f3f5a'
}

function getArrayClass(i: number) {
    if (highlighted.value.includes(i)) return 'border-violet-500/50 bg-violet-500/10 text-violet-300'
    if (parent.value[i] === i) return 'border-emerald-500/30 bg-zinc-900 text-emerald-400'
    return 'border-zinc-700 bg-zinc-900 text-zinc-100'
}

function getSetClass(root: number) {
    const roots = Object.keys(currentSets.value).map(Number)
    const idx = roots.indexOf(root)
    return setColors[idx % setColors.length]
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function doUnion() {
    if (unionX.value === null || unionY.value === null || isAnimating.value) return
    isAnimating.value = true
    findResult.value = ''

    const x = unionX.value
    const y = unionY.value

    highlighted.value = [x, y]
    message.value = `a encontrar raízes de ${x} e ${y}...`
    messageColor.value = 'text-amber-400'
    await sleep(600)

    const rootX = find(x)
    const rootY = find(y)

    highlighted.value = [rootX, rootY]

    if (rootX === rootY) {
        message.value = `${x} e ${y} já estão no mesmo conjunto (raiz: ${rootX})`
        messageColor.value = 'text-zinc-500'
    } else {
        const rx = rank.value[rootX] ?? 0
        const ry = rank.value[rootY] ?? 0

        if (rx < ry) {
            parent.value[rootX] = rootY
            message.value = `union(${x}, ${y}) — ${rootX} passa a filho de ${rootY}`
        } else if (rx > ry) {
            parent.value[rootY] = rootX
            message.value = `union(${x}, ${y}) — ${rootY} passa a filho de ${rootX}`
        } else {
            parent.value[rootY] = rootX
            rank.value[rootX] = rx + 1
            message.value = `union(${x}, ${y}) — ${rootY} passa a filho de ${rootX}`
        }
        messageColor.value = 'text-emerald-400'
    }

    await sleep(1200)
    highlighted.value = []
    isAnimating.value = false
    unionX.value = null
    unionY.value = null
}

async function doFind() {
    if (findX.value === null || isAnimating.value) return
    isAnimating.value = true
    findResult.value = ''

    const x = findX.value
    highlighted.value = [x]
    message.value = `a encontrar raiz de ${x}...`
    messageColor.value = 'text-amber-400'
    await sleep(500)

    const root = find(x)
    highlighted.value = [x, root]
    findResult.value = `→ raiz: ${root}`
    message.value = `find(${x}) → ${root}`
    messageColor.value = 'text-emerald-400'

    await sleep(1200)
    highlighted.value = []
    isAnimating.value = false
    findX.value = null
}

async function doConnected() {
    if (connX.value === null || connY.value === null || isAnimating.value) return
    isAnimating.value = true
    findResult.value = ''

    const x = connX.value
    const y = connY.value

    highlighted.value = [x, y]
    message.value = `a verificar se ${x} e ${y} estão conectados...`
    messageColor.value = 'text-amber-400'
    await sleep(600)

    const rootX = find(x)
    const rootY = find(y)
    const connected = rootX === rootY

    highlighted.value = [rootX, rootY]
    message.value = connected
        ? `connected(${x}, ${y}) → true ✓ (raiz: ${rootX})`
        : `connected(${x}, ${y}) → false ✗ (raízes: ${rootX} e ${rootY})`
    messageColor.value = connected ? 'text-emerald-400' : 'text-red-400'

    await sleep(1500)
    highlighted.value = []
    isAnimating.value = false
    connX.value = null
    connY.value = null
}

function reset() {
    parent.value = Array.from({ length: n }, (_, i) => i)
    rank.value = Array(n).fill(0)
    highlighted.value = []
    findResult.value = ''
    message.value = 'Experimenta as operações abaixo'
    messageColor.value = 'text-zinc-600'
}
</script>