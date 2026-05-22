<template>
    <div class="max-w-3xl space-y-6">

        <div class="flex gap-1 border-b border-zinc-800">
            <button v-for="lang in languages" :key="lang.id" @click="activeLang = lang.id"
                class="font-mono text-sm px-4 py-2 border-b-2 -mb-px transition-colors" :class="activeLang === lang.id
                    ? 'text-violet-400 border-violet-400'
                    : 'text-zinc-500 border-transparent hover:text-zinc-300'">
                {{ lang.label }}
            </button>
        </div>

        <div class="bg-zinc-900 border border-zinc-800">
            <div class="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
                <span class="font-mono text-xs text-zinc-600">{{ activeLanguage?.filename }}</span>
                <button @click="copy" class="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                    {{ copied ? '✓ copiado' : 'copiar' }}
                </button>
            </div>
            <pre class="p-5 overflow-x-auto font-mono text-sm leading-relaxed text-zinc-300"
                v-html="activeLanguage?.code" />
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeLang = ref('typescript')
const copied = ref(false)

const languages = [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'python', label: 'Python' },
]

const code = {
    typescript: {
        filename: 'tree.ts',
        code: `<span class="text-zinc-500">// Binary Tree em TypeScript</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">TreeNode</span>&lt;T&gt; {
  value: T
  left:  <span class="text-emerald-400">TreeNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  right: <span class="text-emerald-400">TreeNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>

  <span class="text-violet-400">constructor</span>(value: T) {
    <span class="text-violet-400">this</span>.value = value
  }
}

<span class="text-violet-400">class</span> <span class="text-emerald-400">BinaryTree</span>&lt;T&gt; {
  root: <span class="text-emerald-400">TreeNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>

  <span class="text-zinc-500">// O(n) — inorder: Left → Root → Right</span>
  inorder(node = <span class="text-violet-400">this</span>.root, result: T[] = []): T[] {
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return</span> result
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">inorder</span>(node.left, result)
    result.<span class="text-emerald-400">push</span>(node.value)
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">inorder</span>(node.right, result)
    <span class="text-violet-400">return</span> result
  }

  <span class="text-zinc-500">// O(n) — preorder: Root → Left → Right</span>
  preorder(node = <span class="text-violet-400">this</span>.root, result: T[] = []): T[] {
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return</span> result
    result.<span class="text-emerald-400">push</span>(node.value)
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">preorder</span>(node.left, result)
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">preorder</span>(node.right, result)
    <span class="text-violet-400">return</span> result
  }

  <span class="text-zinc-500">// O(n) — postorder: Left → Right → Root</span>
  postorder(node = <span class="text-violet-400">this</span>.root, result: T[] = []): T[] {
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return</span> result
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">postorder</span>(node.left, result)
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">postorder</span>(node.right, result)
    result.<span class="text-emerald-400">push</span>(node.value)
    <span class="text-violet-400">return</span> result
  }

  <span class="text-zinc-500">// O(n) — BFS: nível a nível</span>
  bfs(): T[] {
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.root) <span class="text-violet-400">return</span> []
    <span class="text-violet-400">const</span> queue = [<span class="text-violet-400">this</span>.root]
    <span class="text-violet-400">const</span> result: T[] = []
    <span class="text-violet-400">while</span> (queue.length) {
      <span class="text-violet-400">const</span> node = queue.<span class="text-emerald-400">shift</span>()!
      result.<span class="text-emerald-400">push</span>(node.value)
      <span class="text-violet-400">if</span> (node.left)  queue.<span class="text-emerald-400">push</span>(node.left)
      <span class="text-violet-400">if</span> (node.right) queue.<span class="text-emerald-400">push</span>(node.right)
    }
    <span class="text-violet-400">return</span> result
  }

  <span class="text-zinc-500">// O(n) — altura da tree</span>
  height(node = <span class="text-violet-400">this</span>.root): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return</span> -<span class="text-emerald-400">1</span>
    <span class="text-violet-400">return</span> <span class="text-emerald-400">1</span> + Math.<span class="text-emerald-400">max</span>(
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">height</span>(node.left),
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">height</span>(node.right)
    )
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> tree = <span class="text-violet-400">new</span> <span class="text-emerald-400">BinaryTree</span>&lt;<span class="text-amber-400">number</span>&gt;()
tree.root = <span class="text-violet-400">new</span> <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">1</span>)
tree.root.left  = <span class="text-violet-400">new</span> <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">2</span>)
tree.root.right = <span class="text-violet-400">new</span> <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">3</span>)
tree.root.left.left  = <span class="text-violet-400">new</span> <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">4</span>)
tree.root.left.right = <span class="text-violet-400">new</span> <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">5</span>)

tree.<span class="text-emerald-400">inorder</span>()   <span class="text-zinc-500">// [4, 2, 5, 1, 3]</span>
tree.<span class="text-emerald-400">preorder</span>()  <span class="text-zinc-500">// [1, 2, 4, 5, 3]</span>
tree.<span class="text-emerald-400">postorder</span>() <span class="text-zinc-500">// [4, 5, 2, 3, 1]</span>
tree.<span class="text-emerald-400">bfs</span>()       <span class="text-zinc-500">// [1, 2, 3, 4, 5]</span>
tree.<span class="text-emerald-400">height</span>()    <span class="text-zinc-500">// 2</span>`
    },
    python: {
        filename: 'tree.py',
        code: `<span class="text-zinc-500"># Binary Tree em Python</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">TreeNode</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self, value):
        self.value = value
        self.left  = <span class="text-amber-400">None</span>
        self.right = <span class="text-amber-400">None</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">BinaryTree</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.root = <span class="text-amber-400">None</span>

    <span class="text-zinc-500"># O(n) — inorder: Left → Root → Right</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">inorder</span>(self, node=<span class="text-amber-400">None</span>, result=<span class="text-amber-400">None</span>):
        <span class="text-violet-400">if</span> result <span class="text-violet-400">is None</span>: result = []
        <span class="text-violet-400">if</span> node <span class="text-violet-400">is None</span>: node = self.root
        <span class="text-violet-400">if not</span> node: <span class="text-violet-400">return</span> result
        self.<span class="text-emerald-400">inorder</span>(node.left, result)
        result.<span class="text-emerald-400">append</span>(node.value)
        self.<span class="text-emerald-400">inorder</span>(node.right, result)
        <span class="text-violet-400">return</span> result

    <span class="text-zinc-500"># O(n) — preorder: Root → Left → Right</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">preorder</span>(self, node=<span class="text-amber-400">None</span>, result=<span class="text-amber-400">None</span>):
        <span class="text-violet-400">if</span> result <span class="text-violet-400">is None</span>: result = []
        <span class="text-violet-400">if</span> node <span class="text-violet-400">is None</span>: node = self.root
        <span class="text-violet-400">if not</span> node: <span class="text-violet-400">return</span> result
        result.<span class="text-emerald-400">append</span>(node.value)
        self.<span class="text-emerald-400">preorder</span>(node.left, result)
        self.<span class="text-emerald-400">preorder</span>(node.right, result)
        <span class="text-violet-400">return</span> result

    <span class="text-zinc-500"># O(n) — BFS: nível a nível</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">bfs</span>(self):
        <span class="text-violet-400">if not</span> self.root: <span class="text-violet-400">return</span> []
        queue, result = [self.root], []
        <span class="text-violet-400">while</span> queue:
            node = queue.<span class="text-emerald-400">pop</span>(<span class="text-emerald-400">0</span>)
            result.<span class="text-emerald-400">append</span>(node.value)
            <span class="text-violet-400">if</span> node.left:  queue.<span class="text-emerald-400">append</span>(node.left)
            <span class="text-violet-400">if</span> node.right: queue.<span class="text-emerald-400">append</span>(node.right)
        <span class="text-violet-400">return</span> result

    <span class="text-zinc-500"># O(n) — altura da tree</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">height</span>(self, node=<span class="text-amber-400">None</span>):
        <span class="text-violet-400">if</span> node <span class="text-violet-400">is None</span>: node = self.root
        <span class="text-violet-400">if not</span> node: <span class="text-violet-400">return</span> -<span class="text-emerald-400">1</span>
        <span class="text-violet-400">return</span> <span class="text-emerald-400">1</span> + max(
            self.<span class="text-emerald-400">height</span>(node.left),
            self.<span class="text-emerald-400">height</span>(node.right)
        )


<span class="text-zinc-500"># Uso</span>
tree = <span class="text-emerald-400">BinaryTree</span>()
tree.root = <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">1</span>)
tree.root.left  = <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">2</span>)
tree.root.right = <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">3</span>)
tree.root.left.left  = <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">4</span>)
tree.root.left.right = <span class="text-emerald-400">TreeNode</span>(<span class="text-emerald-400">5</span>)

tree.<span class="text-emerald-400">inorder</span>()   <span class="text-zinc-500"># [4, 2, 5, 1, 3]</span>
tree.<span class="text-emerald-400">preorder</span>()  <span class="text-zinc-500"># [1, 2, 4, 5, 3]</span>
tree.<span class="text-emerald-400">bfs</span>()       <span class="text-zinc-500"># [1, 2, 3, 4, 5]</span>
tree.<span class="text-emerald-400">height</span>()    <span class="text-zinc-500"># 2</span>`
    }
}

const activeLanguage = computed(() =>
    code[activeLang.value as keyof typeof code]
)

async function copy() {
    const raw = activeLanguage.value?.code.replace(/<[^>]+>/g, '') ?? ''
    await navigator.clipboard.writeText(raw)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
}
</script>