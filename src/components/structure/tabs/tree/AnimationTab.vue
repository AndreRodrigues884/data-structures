<template>
    <div class="max-w-3xl space-y-8">

        <!-- Tree visual -->
        <div class="bg-zinc-900 border border-zinc-800 p-6">
            <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">Binary Tree</p>

            <svg viewBox="0 0 500 280" class="w-full" xmlns="http://www.w3.org/2000/svg">
                <!-- Edges -->
                <line v-for="edge in edges" :key="`${edge.from}-${edge.to}`" :x1="getNode(edge.from)?.x"
                    :y1="getNode(edge.from)?.y" :x2="getNode(edge.to)?.x" :y2="getNode(edge.to)?.y" stroke="#3f3f5a"
                    stroke-width="1.5" />

                <!-- Nodes -->
                <g v-for="node in treeNodes" :key="node.id" class="cursor-pointer" @click="selectNode(node)">
                    <circle :cx="node.x" :cy="node.y" r="22" :fill="getNodeFill(node.id)"
                        :stroke="getNodeStroke(node.id)" :stroke-width="selectedId === node.id ? 2 : 1.5"
                        class="transition-all duration-300" />
                    <text :x="node.x" :y="node.y" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
                        font-family="JetBrains Mono, monospace" font-size="14" font-weight="500">{{ node.value }}</text>
                </g>
            </svg>

            <!-- Message -->
            <p class="font-mono text-xs mt-2 h-4" :class="messageColor">{{ message }}</p>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-2 gap-4">

            <!-- Insert -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Inserir nó</p>
                <div class="flex gap-2">
                    <input v-model="insertValue" type="number" placeholder="valor"
                        class="flex-1 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="insert" />
                    <button @click="insert" :disabled="isAnimating"
                        class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Traversal -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Traversal</p>
                <div class="flex gap-2 flex-wrap">
                    <button v-for="t in traversalTypes" :key="t.id" @click="runTraversal(t.id)" :disabled="isAnimating"
                        class="flex-1 px-3 py-2 font-mono text-xs border transition-colors disabled:opacity-40" :class="activeTraversal === t.id
                            ? 'border-violet-400 text-violet-400 bg-violet-400/10'
                            : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'">
                        {{ t.label }}
                    </button>
                </div>
            </div>

            <!-- Search -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Pesquisar</p>
                <div class="flex gap-2">
                    <input v-model="searchValue" type="number" placeholder="valor"
                        class="flex-1 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="search" />
                    <button @click="search" :disabled="isAnimating"
                        class="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Traversal result -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Resultado traversal</p>
                <div class="flex gap-2 flex-wrap min-h-8">
                    <span v-for="(val, i) in traversalResult" :key="i"
                        class="font-mono text-sm px-2 py-1 border border-violet-500/40 text-violet-400">{{ val }}</span>
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

type Node = { id: string; value: number; x: number; y: number; left?: string; right?: string }
type Edge = { from: string; to: string }

let nodeCounter = 0

const initialNodes: Node[] = [
    { id: 'n1', value: 10, x: 250, y: 30, left: 'n2', right: 'n3' },
    { id: 'n2', value: 5, x: 140, y: 110, left: 'n4', right: 'n5' },
    { id: 'n3', value: 15, x: 360, y: 110, left: 'n6', right: 'n7' },
    { id: 'n4', value: 3, x: 80, y: 190, },
    { id: 'n5', value: 7, x: 200, y: 190, },
    { id: 'n6', value: 12, x: 300, y: 190, },
    { id: 'n7', value: 20, x: 420, y: 190, },
]

const initialEdges: Edge[] = [
    { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' },
    { from: 'n2', to: 'n4' }, { from: 'n2', to: 'n5' },
    { from: 'n3', to: 'n6' }, { from: 'n3', to: 'n7' },
]

const treeNodes = ref<Node[]>(JSON.parse(JSON.stringify(initialNodes)))
const edges = ref<Edge[]>(JSON.parse(JSON.stringify(initialEdges)))

const isAnimating = ref(false)
const message = ref('Clica num nó ou experimenta as operações')
const messageColor = ref('text-zinc-600')
const highlighted = ref<Set<string>>(new Set())
const found = ref<string | null>(null)
const selectedId = ref<string | null>(null)
const activeTraversal = ref('')
const traversalResult = ref<number[]>([])
const insertValue = ref<number | null>(null)
const searchValue = ref<number | null>(null)

const traversalTypes = [
    { id: 'inorder', label: 'Inorder' },
    { id: 'preorder', label: 'Preorder' },
    { id: 'postorder', label: 'Postorder' },
    { id: 'bfs', label: 'BFS' },
]

function getNode(id: string) {
    return treeNodes.value.find(n => n.id === id)
}

function getNodeFill(id: string) {
    if (found.value === id) return '#0d2b1e'
    if (highlighted.value.has(id)) return '#1e1b4b'
    if (selectedId.value === id) return '#1e1b4b'
    return '#18181f'
}

function getNodeStroke(id: string) {
    if (found.value === id) return '#3de0c0'
    if (highlighted.value.has(id)) return '#7c6dfa'
    if (selectedId.value === id) return '#7c6dfa'
    return '#3f3f5a'
}

function selectNode(node: Node) {
    selectedId.value = node.id
    message.value = `nó selecionado: valor=${node.value}`
    messageColor.value = 'text-violet-400'
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function clearHighlights() {
    highlighted.value = new Set()
    found.value = null
    message.value = ''
}

// Posições disponíveis para novos nós
const positions = [
    { x: 50, y: 270 }, { x: 110, y: 270 },
    { x: 170, y: 270 }, { x: 230, y: 270 },
    { x: 270, y: 270 }, { x: 330, y: 270 },
    { x: 390, y: 270 }, { x: 450, y: 270 },
]

async function insert() {
    if (insertValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const val = insertValue.value
    const newId = `n${++nodeCounter + 10}`
    const posIdx = treeNodes.value.length - initialNodes.length
    const pos = positions[posIdx] ?? { x: 250, y: 270 }

    // find a leaf to attach to
    const leaves = treeNodes.value.filter(n => !n.left && !n.right)
    const parent = leaves[Math.floor(Math.random() * leaves.length)]

    if (parent) {
        highlighted.value = new Set([parent.id])
        message.value = `a inserir ${val} como filho de ${parent.value}...`
        messageColor.value = 'text-amber-400'
        await sleep(800)

        treeNodes.value.push({ id: newId, value: val, x: pos.x, y: pos.y })
        edges.value.push({ from: parent.id, to: newId })

        if (!parent.left) parent.left = newId
        else parent.right = newId

        found.value = newId
        message.value = `${val} inserido!`
        messageColor.value = 'text-emerald-400'
    }

    await sleep(1000)
    clearHighlights()
    isAnimating.value = false
    insertValue.value = null
}

async function search() {
    if (searchValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    traversalResult.value = []

    const target = searchValue.value

    // BFS search
    const queue = ['n1']
    let foundNode: Node | null = null

    while (queue.length > 0) {
        const id = queue.shift()!
        const node = getNode(id)
        if (!node) continue

        highlighted.value = new Set([id])
        message.value = `a verificar nó ${node.value}...`
        messageColor.value = 'text-amber-400'
        await sleep(500)

        if (node.value === target) {
            foundNode = node
            break
        }

        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
    }

    highlighted.value = new Set()
    if (foundNode) {
        found.value = foundNode.id
        message.value = `encontrado: ${target} ✓`
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

async function runTraversal(type: string) {
    if (isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    traversalResult.value = []
    activeTraversal.value = type

    const result: number[] = []

    async function inorder(id: string | undefined) {
        if (!id) return
        const node = getNode(id)
        if (!node) return
        await inorder(node.left)
        highlighted.value = new Set([id])
        message.value = `visitando nó ${node.value}`
        messageColor.value = 'text-violet-400'
        result.push(node.value)
        traversalResult.value = [...result]
        await sleep(500)
        await inorder(node.right)
    }

    async function preorder(id: string | undefined) {
        if (!id) return
        const node = getNode(id)
        if (!node) return
        highlighted.value = new Set([id])
        message.value = `visitando nó ${node.value}`
        messageColor.value = 'text-violet-400'
        result.push(node.value)
        traversalResult.value = [...result]
        await sleep(500)
        await preorder(node.left)
        await preorder(node.right)
    }

    async function postorder(id: string | undefined) {
        if (!id) return
        const node = getNode(id)
        if (!node) return
        await postorder(node.left)
        await postorder(node.right)
        highlighted.value = new Set([id])
        message.value = `visitando nó ${node.value}`
        messageColor.value = 'text-violet-400'
        result.push(node.value)
        traversalResult.value = [...result]
        await sleep(500)
    }

    async function bfs() {
        const queue = ['n1']
        while (queue.length > 0) {
            const id = queue.shift()!
            const node = getNode(id)
            if (!node) continue
            highlighted.value = new Set([id])
            message.value = `visitando nó ${node.value}`
            messageColor.value = 'text-violet-400'
            result.push(node.value)
            traversalResult.value = [...result]
            await sleep(500)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
    }

    if (type === 'inorder') await inorder('n1')
    if (type === 'preorder') await preorder('n1')
    if (type === 'postorder') await postorder('n1')
    if (type === 'bfs') await bfs()

    message.value = `${type} completo: [${result.join(', ')}]`
    messageColor.value = 'text-emerald-400'
    highlighted.value = new Set()
    isAnimating.value = false
}

function reset() {
    clearHighlights()
    nodeCounter = 0
    treeNodes.value = JSON.parse(JSON.stringify(initialNodes))
    edges.value = JSON.parse(JSON.stringify(initialEdges))
    traversalResult.value = []
    activeTraversal.value = ''
    selectedId.value = null
    message.value = 'Clica num nó ou experimenta as operações'
    messageColor.value = 'text-zinc-600'
}
</script>