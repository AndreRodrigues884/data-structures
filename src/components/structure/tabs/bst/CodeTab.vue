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
        filename: 'bst.ts',
        code: `<span class="text-zinc-500">// Binary Search Tree em TypeScript</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">BSTNode</span>&lt;T&gt; {
  value: T
  left:  <span class="text-emerald-400">BSTNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  right: <span class="text-emerald-400">BSTNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">constructor</span>(value: T) { <span class="text-violet-400">this</span>.value = value }
}

<span class="text-violet-400">class</span> <span class="text-emerald-400">BST</span>&lt;T&gt; {
  root: <span class="text-emerald-400">BSTNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>

  <span class="text-zinc-500">// O(log n) médio — insere mantendo BST property</span>
  insert(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> node = <span class="text-violet-400">new</span> <span class="text-emerald-400">BSTNode</span>(value)
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.root) { <span class="text-violet-400">this</span>.root = node; <span class="text-violet-400">return</span> }
    <span class="text-violet-400">let</span> curr = <span class="text-violet-400">this</span>.root
    <span class="text-violet-400">while</span> (<span class="text-violet-400">true</span>) {
      <span class="text-violet-400">if</span> (value < curr.value) {
        <span class="text-violet-400">if</span> (!curr.left) { curr.left = node; <span class="text-violet-400">break</span> }
        curr = curr.left
      } <span class="text-violet-400">else</span> {
        <span class="text-violet-400">if</span> (!curr.right) { curr.right = node; <span class="text-violet-400">break</span> }
        curr = curr.right
      }
    }
  }

  <span class="text-zinc-500">// O(log n) médio — pesquisa</span>
  search(value: T): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">let</span> curr = <span class="text-violet-400">this</span>.root
    <span class="text-violet-400">while</span> (curr) {
      <span class="text-violet-400">if</span> (value === curr.value) <span class="text-violet-400">return true</span>
      curr = value < curr.value ? curr.left : curr.right
    }
    <span class="text-violet-400">return false</span>
  }

  <span class="text-zinc-500">// O(n) — inorder: produz array ordenado</span>
  inorder(node = <span class="text-violet-400">this</span>.root, result: T[] = []): T[] {
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return</span> result
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">inorder</span>(node.left, result)
    result.<span class="text-emerald-400">push</span>(node.value)
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">inorder</span>(node.right, result)
    <span class="text-violet-400">return</span> result
  }

  <span class="text-zinc-500">// O(log n) — mínimo (nó mais à esquerda)</span>
  min(node = <span class="text-violet-400">this</span>.root): T | <span class="text-amber-400">null</span> {
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return null</span>
    <span class="text-violet-400">while</span> (node.left) node = node.left
    <span class="text-violet-400">return</span> node.value
  }

  <span class="text-zinc-500">// O(log n) — máximo (nó mais à direita)</span>
  max(node = <span class="text-violet-400">this</span>.root): T | <span class="text-amber-400">null</span> {
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return null</span>
    <span class="text-violet-400">while</span> (node.right) node = node.right
    <span class="text-violet-400">return</span> node.value
  }

  <span class="text-zinc-500">// O(log n) — remoção</span>
  delete(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">this</span>.root = <span class="text-violet-400">this</span>.<span class="text-emerald-400">_delete</span>(<span class="text-violet-400">this</span>.root, value)
  }

  <span class="text-violet-400">private</span> _delete(node: <span class="text-emerald-400">BSTNode</span>&lt;T&gt; | <span class="text-amber-400">null</span>, value: T): <span class="text-emerald-400">BSTNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> {
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return null</span>
    <span class="text-violet-400">if</span> (value < node.value) {
      node.left = <span class="text-violet-400">this</span>.<span class="text-emerald-400">_delete</span>(node.left, value)
    } <span class="text-violet-400">else if</span> (value > node.value) {
      node.right = <span class="text-violet-400">this</span>.<span class="text-emerald-400">_delete</span>(node.right, value)
    } <span class="text-violet-400">else</span> {
      <span class="text-zinc-500">// caso 1: leaf</span>
      <span class="text-violet-400">if</span> (!node.left && !node.right) <span class="text-violet-400">return null</span>
      <span class="text-zinc-500">// caso 2: um filho</span>
      <span class="text-violet-400">if</span> (!node.left) <span class="text-violet-400">return</span> node.right
      <span class="text-violet-400">if</span> (!node.right) <span class="text-violet-400">return</span> node.left
      <span class="text-zinc-500">// caso 3: dois filhos — substitui com inorder successor</span>
      <span class="text-violet-400">let</span> successor = node.right
      <span class="text-violet-400">while</span> (successor.left) successor = successor.left
      node.value = successor.value
      node.right = <span class="text-violet-400">this</span>.<span class="text-emerald-400">_delete</span>(node.right, successor.value)
    }
    <span class="text-violet-400">return</span> node
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> bst = <span class="text-violet-400">new</span> <span class="text-emerald-400">BST</span>&lt;<span class="text-amber-400">number</span>&gt;()
<span class="text-emerald-400">[8, 3, 10, 1, 6, 14, 4, 7, 13]</span>.<span class="text-emerald-400">forEach</span>(v => bst.<span class="text-emerald-400">insert</span>(v))

bst.<span class="text-emerald-400">search</span>(<span class="text-emerald-400">7</span>)    <span class="text-zinc-500">// true</span>
bst.<span class="text-emerald-400">search</span>(<span class="text-emerald-400">99</span>)   <span class="text-zinc-500">// false</span>
bst.<span class="text-emerald-400">min</span>()        <span class="text-zinc-500">// 1</span>
bst.<span class="text-emerald-400">max</span>()        <span class="text-zinc-500">// 14</span>
bst.<span class="text-emerald-400">inorder</span>()    <span class="text-zinc-500">// [1,3,4,6,7,8,10,13,14]</span>
bst.<span class="text-emerald-400">delete</span>(<span class="text-emerald-400">3</span>)
bst.<span class="text-emerald-400">inorder</span>()    <span class="text-zinc-500">// [1,4,6,7,8,10,13,14]</span>`
    },
    python: {
        filename: 'bst.py',
        code: `<span class="text-zinc-500"># Binary Search Tree em Python</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">BSTNode</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self, value):
        self.value = value
        self.left  = <span class="text-amber-400">None</span>
        self.right = <span class="text-amber-400">None</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">BST</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.root = <span class="text-amber-400">None</span>

    <span class="text-zinc-500"># O(log n) médio</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">insert</span>(self, value):
        <span class="text-violet-400">if not</span> self.root:
            self.root = <span class="text-emerald-400">BSTNode</span>(value); <span class="text-violet-400">return</span>
        curr = self.root
        <span class="text-violet-400">while True</span>:
            <span class="text-violet-400">if</span> value < curr.value:
                <span class="text-violet-400">if not</span> curr.left: curr.left = <span class="text-emerald-400">BSTNode</span>(value); <span class="text-violet-400">break</span>
                curr = curr.left
            <span class="text-violet-400">else</span>:
                <span class="text-violet-400">if not</span> curr.right: curr.right = <span class="text-emerald-400">BSTNode</span>(value); <span class="text-violet-400">break</span>
                curr = curr.right

    <span class="text-zinc-500"># O(log n) médio</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">search</span>(self, value) -> <span class="text-amber-400">bool</span>:
        curr = self.root
        <span class="text-violet-400">while</span> curr:
            <span class="text-violet-400">if</span> value == curr.value: <span class="text-violet-400">return True</span>
            curr = curr.left <span class="text-violet-400">if</span> value < curr.value <span class="text-violet-400">else</span> curr.right
        <span class="text-violet-400">return False</span>

    <span class="text-zinc-500"># O(n) — inorder: produz lista ordenada</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">inorder</span>(self, node=<span class="text-amber-400">None</span>, result=<span class="text-amber-400">None</span>):
        <span class="text-violet-400">if</span> result <span class="text-violet-400">is None</span>: result = []
        <span class="text-violet-400">if</span> node <span class="text-violet-400">is None</span>: node = self.root
        <span class="text-violet-400">if not</span> node: <span class="text-violet-400">return</span> result
        self.<span class="text-emerald-400">inorder</span>(node.left, result)
        result.<span class="text-emerald-400">append</span>(node.value)
        self.<span class="text-emerald-400">inorder</span>(node.right, result)
        <span class="text-violet-400">return</span> result

    <span class="text-violet-400">def</span> <span class="text-emerald-400">min</span>(self):
        curr = self.root
        <span class="text-violet-400">while</span> curr <span class="text-violet-400">and</span> curr.left: curr = curr.left
        <span class="text-violet-400">return</span> curr.value <span class="text-violet-400">if</span> curr <span class="text-violet-400">else None</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">max</span>(self):
        curr = self.root
        <span class="text-violet-400">while</span> curr <span class="text-violet-400">and</span> curr.right: curr = curr.right
        <span class="text-violet-400">return</span> curr.value <span class="text-violet-400">if</span> curr <span class="text-violet-400">else None</span>


<span class="text-zinc-500"># Uso</span>
bst = <span class="text-emerald-400">BST</span>()
<span class="text-violet-400">for</span> v <span class="text-violet-400">in</span> [<span class="text-emerald-400">8</span>, <span class="text-emerald-400">3</span>, <span class="text-emerald-400">10</span>, <span class="text-emerald-400">1</span>, <span class="text-emerald-400">6</span>, <span class="text-emerald-400">14</span>, <span class="text-emerald-400">4</span>, <span class="text-emerald-400">7</span>, <span class="text-emerald-400">13</span>]:
    bst.<span class="text-emerald-400">insert</span>(v)

bst.<span class="text-emerald-400">search</span>(<span class="text-emerald-400">7</span>)    <span class="text-zinc-500"># True</span>
bst.<span class="text-emerald-400">min</span>()        <span class="text-zinc-500"># 1</span>
bst.<span class="text-emerald-400">max</span>()        <span class="text-zinc-500"># 14</span>
bst.<span class="text-emerald-400">inorder</span>()    <span class="text-zinc-500"># [1,3,4,6,7,8,10,13,14]</span>`
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