<template>
    <div class="max-w-3xl space-y-8">

        <!-- BST visual -->
        <div class="bg-zinc-900 border border-zinc-800 p-6">
            <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">Binary Search Tree</p>

            <svg viewBox="0 0 500 260" class="w-full" xmlns="http://www.w3.org/2000/svg">
                <!-- Edges -->
                <line v-for="edge in currentEdges" :key="`${edge.from}-${edge.to}`" :x1="getNode(edge.from)?.x"
                    :y1="getNode(edge.from)?.y" :x2="getNode(edge.to)?.x" :y2="getNode(edge.to)?.y" stroke="#3f3f5a"
                    stroke-width="1.5" />

                <!-- Nodes -->
                <g v-for="node in currentNodes" :key="node.id">
                    <circle :cx="node.x" :cy="node.y" r="22" :fill="getNodeFill(node.id)"
                        :stroke="getNodeStroke(node.id)" stroke-width="1.5" class="transition-all duration-300" />
                    <text :x="node.x" :y="node.y" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
                        font-family="JetBrains Mono, monospace" font-size="13" font-weight="500">{{ node.value }}</text>
                </g>
            </svg>

            <!-- Message -->
            <p class="font-mono text-xs mt-2 h-4" :class="messageColor">{{ message }}</p>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Insert -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Insert — O(log n)</p>
                <div class="flex gap-2">
                    <input v-model="insertValue" type="number" placeholder="valor"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="insert" />
                    <button @click="insert" :disabled="isAnimating"
                        class="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Search -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Search — O(log n)</p>
                <div class="flex gap-2">
                    <input v-model="searchValue" type="number" placeholder="valor"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="search" />
                    <button @click="search" :disabled="isAnimating"
                        class="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Delete -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Delete — O(log n)</p>
                <div class="flex gap-2">
                    <input v-model="deleteValue" type="number" placeholder="valor"
                        class="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400"
                        @keyup.enter="deleteNode" />
                    <button @click="deleteNode" :disabled="isAnimating"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">→</button>
                </div>
            </div>

            <!-- Inorder -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">Inorder — O(n)</p>
                <button @click="runInorder" :disabled="isAnimating"
                    class="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-mono text-sm transition-colors">
                    inorder traversal
                </button>
                <div class="flex gap-1 flex-wrap min-h-6">
                    <span v-for="(val, i) in inorderResult" :key="i"
                        class="font-mono text-xs px-2 py-0.5 border border-emerald-500/40 text-emerald-400">{{ val
                        }}</span>
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

type BSTNode = {
    id: string
    value: number
    x: number
    y: number
    left?: string
    right?: string
    parent?: string
}

type Edge = { from: string; to: string }

// Initial BST
const initialNodes: BSTNode[] = [
    { id: 'n8', value: 8, x: 250, y: 30, left: 'n3', right: 'n10' },
    { id: 'n3', value: 3, x: 140, y: 100, left: 'n1', right: 'n6', parent: 'n8' },
    { id: 'n10', value: 10, x: 360, y: 100, right: 'n14', parent: 'n8' },
    { id: 'n1', value: 1, x: 80, y: 180, parent: 'n3' },
    { id: 'n6', value: 6, x: 200, y: 180, left: 'n4', right: 'n7', parent: 'n3' },
    { id: 'n14', value: 14, x: 420, y: 180, left: 'n13', parent: 'n10' },
    { id: 'n4', value: 4, x: 155, y: 250, parent: 'n6' },
    { id: 'n7', value: 7, x: 245, y: 250, parent: 'n6' },
    { id: 'n13', value: 13, x: 375, y: 250, parent: 'n14' },
]

const initialEdges: Edge[] = [
    { from: 'n8', to: 'n3' },
    { from: 'n8', to: 'n10' },
    { from: 'n3', to: 'n1' },
    { from: 'n3', to: 'n6' },
    { from: 'n10', to: 'n14' },
    { from: 'n6', to: 'n4' },
    { from: 'n6', to: 'n7' },
    { from: 'n14', to: 'n13' },
]

const currentNodes = ref<BSTNode[]>(JSON.parse(JSON.stringify(initialNodes)))
const currentEdges = ref<Edge[]>(JSON.parse(JSON.stringify(initialEdges)))

const insertValue = ref<number | null>(null)
const searchValue = ref<number | null>(null)
const deleteValue = ref<number | null>(null)
const inorderResult = ref<number[]>([])

const isAnimating = ref(false)
const message = ref('Experimenta as operações abaixo')
const messageColor = ref('text-zinc-600')
const highlighted = ref<string[]>([])
const found = ref<string | null>(null)
const removed = ref<string | null>(null)

let nodeCounter = 20

// Node positions for new insertions
const newPositions = [
    { x: 50, y: 250 }, { x: 110, y: 250 },
    { x: 300, y: 250 }, { x: 460, y: 250 },
    { x: 50, y: 320 }, { x: 150, y: 320 },
    { x: 250, y: 320 }, { x: 350, y: 320 },
]
let posIdx = 0

function getNode(id: string): BSTNode | undefined {
    return currentNodes.value.find(n => n.id === id)
}

function getNodeFill(id: string) {
    if (removed.value === id) return '#2d1515'
    if (found.value === id) return '#0d2b1e'
    if (highlighted.value.includes(id)) return '#1e1b4b'
    return '#18181f'
}

function getNodeStroke(id: string) {
    if (removed.value === id) return '#f0545a'
    if (found.value === id) return '#3de0c0'
    if (highlighted.value.includes(id)) return '#7c6dfa'
    return '#3f3f5a'
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function clearHighlights() {
    highlighted.value = []
    found.value = null
    removed.value = null
    message.value = ''
}

const currentNodes_computed = computed(() => currentNodes.value)

async function insert() {
    if (insertValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    inorderResult.value = []

    const val = insertValue.value

    // check duplicate
    if (currentNodes.value.some(n => n.value === val)) {
        message.value = `${val} já existe na BST`
        messageColor.value = 'text-amber-400'
        isAnimating.value = false
        return
    }

    // traverse to find position
    let current = getNode('n8')
    let parentNode: BSTNode | null = null
    let direction: 'left' | 'right' = 'left'

    while (current) {
        highlighted.value = [current.id]
        if (val < current.value) {
            message.value = `${val} < ${current.value} → vai para a esquerda`
            direction = 'left'
            parentNode = current
            current = current.left ? getNode(current.left) : undefined
        } else {
            message.value = `${val} > ${current.value} → vai para a direita`
            direction = 'right'
            parentNode = current
            current = current.right ? getNode(current.right) : undefined
        }
        messageColor.value = 'text-amber-400'
        await sleep(600)
    }

    // insert
    const newId = `new${nodeCounter++}`
    const pos = newPositions[posIdx++ % newPositions.length] ?? { x: 250, y: 320 }
    const newNode: BSTNode = { id: newId, value: val, x: pos.x, y: pos.y, parent: parentNode?.id }

    currentNodes.value.push(newNode)
    if (parentNode) {
        currentEdges.value.push({ from: parentNode.id, to: newId })
        if (direction === 'left') parentNode.left = newId
        else parentNode.right = newId
    }

    found.value = newId
    highlighted.value = []
    message.value = `${val} inserido como filho ${direction === 'left' ? 'esquerdo' : 'direito'} de ${parentNode?.value}`
    messageColor.value = 'text-emerald-400'

    await sleep(1200)
    clearHighlights()
    isAnimating.value = false
    insertValue.value = null
}

async function search() {
    if (searchValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    inorderResult.value = []

    const target = searchValue.value
    let current = getNode('n8')

    while (current) {
        highlighted.value = [current.id]
        messageColor.value = 'text-amber-400'

        if (current.value === target) {
            found.value = current.id
            highlighted.value = []
            message.value = `encontrado ${target} ✓`
            messageColor.value = 'text-emerald-400'
            await sleep(1500)
            clearHighlights()
            isAnimating.value = false
            searchValue.value = null
            return
        } else if (target < current.value) {
            message.value = `${target} < ${current.value} → esquerda`
            current = current.left ? getNode(current.left) : undefined
        } else {
            message.value = `${target} > ${current.value} → direita`
            current = current.right ? getNode(current.right) : undefined
        }
        await sleep(600)
    }

    highlighted.value = []
    message.value = `${target} não encontrado`
    messageColor.value = 'text-red-400'
    await sleep(1200)
    clearHighlights()
    isAnimating.value = false
    searchValue.value = null
}

async function deleteNode() {
    if (deleteValue.value === null || isAnimating.value) return
    isAnimating.value = true
    clearHighlights()
    inorderResult.value = []

    const target = deleteValue.value
    let current = getNode('n8')

    // find node
    while (current && current.value !== target) {
        highlighted.value = [current.id]
        message.value = `a procurar ${target}...`
        messageColor.value = 'text-amber-400'
        await sleep(500)
        current = target < current.value
            ? (current.left ? getNode(current.left) : undefined)
            : (current.right ? getNode(current.right) : undefined)
    }

    if (!current) {
        message.value = `${target} não encontrado`
        messageColor.value = 'text-red-400'
        await sleep(1000)
        clearHighlights()
        isAnimating.value = false
        return
    }

    removed.value = current.id
    message.value = `a remover ${target}...`
    messageColor.value = 'text-red-400'
    await sleep(800)

    // remove node and edge
    const parentId = current.parent
    const parent = parentId ? getNode(parentId) : undefined

    if (parent) {
        if (parent.left === current.id) delete parent.left
        else delete parent.right
    }

    currentNodes.value = currentNodes.value.filter(n => n.id !== current!.id)
    currentEdges.value = currentEdges.value.filter(e => e.from !== current!.id && e.to !== current!.id)

    removed.value = null
    message.value = `${target} removido`
    messageColor.value = 'text-emerald-400'

    await sleep(1000)
    clearHighlights()
    isAnimating.value = false
    deleteValue.value = null
}

async function runInorder() {
    if (isAnimating.value) return
    isAnimating.value = true
    clearHighlights()

    const result: number[] = []

    async function inorder(id: string | undefined) {
        if (!id) return
        const node = getNode(id)
        if (!node) return
        await inorder(node.left)
        highlighted.value = [id]
        message.value = `visitando ${node.value}`
        messageColor.value = 'text-violet-400'
        result.push(node.value)
        inorderResult.value = [...result]
        await sleep(400)
        await inorder(node.right)
    }

    await inorder('n8')

    highlighted.value = []
    message.value = `inorder: [${result.join(', ')}] — sempre crescente ✓`
    messageColor.value = 'text-emerald-400'
    isAnimating.value = false
}

function reset() {
    clearHighlights()
    nodeCounter = 20
    posIdx = 0
    currentNodes.value = JSON.parse(JSON.stringify(initialNodes))
    currentEdges.value = JSON.parse(JSON.stringify(initialEdges))
    inorderResult.value = []
    message.value = 'Experimenta as operações abaixo'
    messageColor.value = 'text-zinc-600'
}
</script>