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
        filename: 'heap.ts',
        code: `<span class="text-zinc-500">// Heap em TypeScript</span>
<span class="text-zinc-500">// Implementado como array — sem ponteiros</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">Heap</span> {
  <span class="text-violet-400">private</span> data: <span class="text-amber-400">number</span>[] = []
  <span class="text-violet-400">private</span> isMax: <span class="text-amber-400">boolean</span>

  <span class="text-violet-400">constructor</span>(type: <span class="text-emerald-400">'max'</span> | <span class="text-emerald-400">'min'</span> = <span class="text-emerald-400">'max'</span>) {
    <span class="text-violet-400">this</span>.isMax = type === <span class="text-emerald-400">'max'</span>
  }

  <span class="text-violet-400">private</span> compare(a: <span class="text-amber-400">number</span>, b: <span class="text-amber-400">number</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.isMax ? a > b : a < b
  }

  <span class="text-violet-400">private</span> parent(i: <span class="text-amber-400">number</span>)  { <span class="text-violet-400">return</span> Math.<span class="text-emerald-400">floor</span>((i - <span class="text-emerald-400">1</span>) / <span class="text-emerald-400">2</span>) }
  <span class="text-violet-400">private</span> left(i: <span class="text-amber-400">number</span>)    { <span class="text-violet-400">return</span> <span class="text-emerald-400">2</span> * i + <span class="text-emerald-400">1</span> }
  <span class="text-violet-400">private</span> right(i: <span class="text-amber-400">number</span>)   { <span class="text-violet-400">return</span> <span class="text-emerald-400">2</span> * i + <span class="text-emerald-400">2</span> }

  <span class="text-violet-400">private</span> swap(i: <span class="text-amber-400">number</span>, j: <span class="text-amber-400">number</span>) {
    ;[<span class="text-violet-400">this</span>.data[i], <span class="text-violet-400">this</span>.data[j]] = [<span class="text-violet-400">this</span>.data[j]!, <span class="text-violet-400">this</span>.data[i]!]
  }

  <span class="text-zinc-500">// O(log n) — insere e faz bubble up</span>
  push(value: <span class="text-amber-400">number</span>): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">this</span>.data.<span class="text-emerald-400">push</span>(value)
    <span class="text-violet-400">let</span> i = <span class="text-violet-400">this</span>.data.length - <span class="text-emerald-400">1</span>
    <span class="text-violet-400">while</span> (i > <span class="text-emerald-400">0</span>) {
      <span class="text-violet-400">const</span> p = <span class="text-violet-400">this</span>.<span class="text-emerald-400">parent</span>(i)
      <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.<span class="text-emerald-400">compare</span>(<span class="text-violet-400">this</span>.data[i]!, <span class="text-violet-400">this</span>.data[p]!)) {
        <span class="text-violet-400">this</span>.<span class="text-emerald-400">swap</span>(i, p)
        i = p
      } <span class="text-violet-400">else break</span>
    }
  }

  <span class="text-zinc-500">// O(log n) — remove raiz e faz bubble down</span>
  pop(): <span class="text-amber-400">number</span> | <span class="text-amber-400">undefined</span> {
    <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.data.length === <span class="text-emerald-400">0</span>) <span class="text-violet-400">return undefined</span>
    <span class="text-violet-400">const</span> root = <span class="text-violet-400">this</span>.data[<span class="text-emerald-400">0</span>]
    <span class="text-violet-400">const</span> last = <span class="text-violet-400">this</span>.data.<span class="text-emerald-400">pop</span>()!
    <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.data.length > <span class="text-emerald-400">0</span>) {
      <span class="text-violet-400">this</span>.data[<span class="text-emerald-400">0</span>] = last
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">bubbleDown</span>(<span class="text-emerald-400">0</span>)
    }
    <span class="text-violet-400">return</span> root
  }

  <span class="text-violet-400">private</span> bubbleDown(i: <span class="text-amber-400">number</span>): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> n = <span class="text-violet-400">this</span>.data.length
    <span class="text-violet-400">while</span> (<span class="text-violet-400">true</span>) {
      <span class="text-violet-400">let</span> target = i
      <span class="text-violet-400">const</span> l = <span class="text-violet-400">this</span>.<span class="text-emerald-400">left</span>(i)
      <span class="text-violet-400">const</span> r = <span class="text-violet-400">this</span>.<span class="text-emerald-400">right</span>(i)
      <span class="text-violet-400">if</span> (l < n && <span class="text-violet-400">this</span>.<span class="text-emerald-400">compare</span>(<span class="text-violet-400">this</span>.data[l]!, <span class="text-violet-400">this</span>.data[target]!)) target = l
      <span class="text-violet-400">if</span> (r < n && <span class="text-violet-400">this</span>.<span class="text-emerald-400">compare</span>(<span class="text-violet-400">this</span>.data[r]!, <span class="text-violet-400">this</span>.data[target]!)) target = r
      <span class="text-violet-400">if</span> (target === i) <span class="text-violet-400">break</span>
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">swap</span>(i, target)
      i = target
    }
  }

  <span class="text-zinc-500">// O(1) — lê a raiz sem remover</span>
  peek(): <span class="text-amber-400">number</span> | <span class="text-amber-400">undefined</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data[<span class="text-emerald-400">0</span>]
  }

  <span class="text-violet-400">get</span> size() { <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data.length }
}

<span class="text-zinc-500">// Uso — Max Heap</span>
<span class="text-violet-400">const</span> maxHeap = <span class="text-violet-400">new</span> <span class="text-emerald-400">Heap</span>(<span class="text-emerald-400">'max'</span>)
maxHeap.push(<span class="text-emerald-400">3</span>)
maxHeap.push(<span class="text-emerald-400">10</span>)
maxHeap.push(<span class="text-emerald-400">5</span>)
maxHeap.peek()  <span class="text-zinc-500">// 10</span>
maxHeap.pop()   <span class="text-zinc-500">// 10</span>
maxHeap.peek()  <span class="text-zinc-500">// 5</span>

<span class="text-zinc-500">// Uso — Min Heap</span>
<span class="text-violet-400">const</span> minHeap = <span class="text-violet-400">new</span> <span class="text-emerald-400">Heap</span>(<span class="text-emerald-400">'min'</span>)
minHeap.push(<span class="text-emerald-400">3</span>)
minHeap.push(<span class="text-emerald-400">10</span>)
minHeap.push(<span class="text-emerald-400">5</span>)
minHeap.peek()  <span class="text-zinc-500">// 3</span>
minHeap.pop()   <span class="text-zinc-500">// 3</span>
minHeap.peek()  <span class="text-zinc-500">// 5</span>`
    },
    python: {
        filename: 'heap.py',
        code: `<span class="text-zinc-500"># Heap em Python</span>
<span class="text-zinc-500"># heapq é a implementação nativa — sempre Min Heap</span>

<span class="text-violet-400">import</span> heapq

<span class="text-zinc-500"># Min Heap nativo</span>
min_heap = []
heapq.<span class="text-emerald-400">heappush</span>(min_heap, <span class="text-emerald-400">3</span>)
heapq.<span class="text-emerald-400">heappush</span>(min_heap, <span class="text-emerald-400">10</span>)
heapq.<span class="text-emerald-400">heappush</span>(min_heap, <span class="text-emerald-400">5</span>)
min_heap[<span class="text-emerald-400">0</span>]              <span class="text-zinc-500"># peek → 3</span>
heapq.<span class="text-emerald-400">heappop</span>(min_heap)  <span class="text-zinc-500"># pop  → 3</span>

<span class="text-zinc-500"># Max Heap — inverte os valores</span>
max_heap = []
heapq.<span class="text-emerald-400">heappush</span>(max_heap, -<span class="text-emerald-400">3</span>)
heapq.<span class="text-emerald-400">heappush</span>(max_heap, -<span class="text-emerald-400">10</span>)
heapq.<span class="text-emerald-400">heappush</span>(max_heap, -<span class="text-emerald-400">5</span>)
-max_heap[<span class="text-emerald-400">0</span>]              <span class="text-zinc-500"># peek → 10</span>
-heapq.<span class="text-emerald-400">heappop</span>(max_heap) <span class="text-zinc-500"># pop  → 10</span>


<span class="text-zinc-500"># Implementação manual</span>
<span class="text-violet-400">class</span> <span class="text-emerald-400">Heap</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self, heap_type=<span class="text-emerald-400">'max'</span>):
        self.data = []
        self.is_max = heap_type == <span class="text-emerald-400">'max'</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">_compare</span>(self, a, b):
        <span class="text-violet-400">return</span> a > b <span class="text-violet-400">if</span> self.is_max <span class="text-violet-400">else</span> a < b

    <span class="text-zinc-500"># O(log n)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">push</span>(self, value):
        self.data.<span class="text-emerald-400">append</span>(value)
        i = len(self.data) - <span class="text-emerald-400">1</span>
        <span class="text-violet-400">while</span> i > <span class="text-emerald-400">0</span>:
            p = (i - <span class="text-emerald-400">1</span>) // <span class="text-emerald-400">2</span>
            <span class="text-violet-400">if</span> self.<span class="text-emerald-400">_compare</span>(self.data[i], self.data[p]):
                self.data[i], self.data[p] = self.data[p], self.data[i]
                i = p
            <span class="text-violet-400">else</span>: <span class="text-violet-400">break</span>

    <span class="text-zinc-500"># O(log n)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">pop</span>(self):
        <span class="text-violet-400">if not</span> self.data: <span class="text-violet-400">return None</span>
        root = self.data[<span class="text-emerald-400">0</span>]
        self.data[<span class="text-emerald-400">0</span>] = self.data.<span class="text-emerald-400">pop</span>()
        self.<span class="text-emerald-400">_bubble_down</span>(<span class="text-emerald-400">0</span>)
        <span class="text-violet-400">return</span> root

    <span class="text-violet-400">def</span> <span class="text-emerald-400">_bubble_down</span>(self, i):
        n = len(self.data)
        <span class="text-violet-400">while True</span>:
            target = i
            l, r = <span class="text-emerald-400">2</span>*i+<span class="text-emerald-400">1</span>, <span class="text-emerald-400">2</span>*i+<span class="text-emerald-400">2</span>
            <span class="text-violet-400">if</span> l < n <span class="text-violet-400">and</span> self.<span class="text-emerald-400">_compare</span>(self.data[l], self.data[target]): target = l
            <span class="text-violet-400">if</span> r < n <span class="text-violet-400">and</span> self.<span class="text-emerald-400">_compare</span>(self.data[r], self.data[target]): target = r
            <span class="text-violet-400">if</span> target == i: <span class="text-violet-400">break</span>
            self.data[i], self.data[target] = self.data[target], self.data[i]
            i = target

    <span class="text-violet-400">def</span> <span class="text-emerald-400">peek</span>(self):
        <span class="text-violet-400">return</span> self.data[<span class="text-emerald-400">0</span>] <span class="text-violet-400">if</span> self.data <span class="text-violet-400">else None</span>`
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