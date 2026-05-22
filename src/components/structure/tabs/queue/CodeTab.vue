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
        filename: 'queue.ts',
        code: `<span class="text-zinc-500">// Queue em TypeScript</span>
<span class="text-zinc-500">// Implementada com Linked List para O(1) em ambas as operações</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">QueueNode</span>&lt;T&gt; {
  value: T
  next: <span class="text-emerald-400">QueueNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">constructor</span>(value: T) { <span class="text-violet-400">this</span>.value = value }
}

<span class="text-violet-400">class</span> <span class="text-emerald-400">Queue</span>&lt;T&gt; {
  <span class="text-violet-400">private</span> head: <span class="text-emerald-400">QueueNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">private</span> tail: <span class="text-emerald-400">QueueNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">private</span> size: <span class="text-amber-400">number</span> = <span class="text-emerald-400">0</span>

  <span class="text-zinc-500">// O(1) — adiciona no tail</span>
  enqueue(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> node = <span class="text-violet-400">new</span> <span class="text-emerald-400">QueueNode</span>(value)
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.tail) {
      <span class="text-violet-400">this</span>.head = <span class="text-violet-400">this</span>.tail = node
    } <span class="text-violet-400">else</span> {
      <span class="text-violet-400">this</span>.tail.next = node
      <span class="text-violet-400">this</span>.tail = node
    }
    <span class="text-violet-400">this</span>.size++
  }

  <span class="text-zinc-500">// O(1) — remove do head</span>
  dequeue(): T | <span class="text-amber-400">null</span> {
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.head) <span class="text-violet-400">return</span> <span class="text-amber-400">null</span>
    <span class="text-violet-400">const</span> val = <span class="text-violet-400">this</span>.head.value
    <span class="text-violet-400">this</span>.head = <span class="text-violet-400">this</span>.head.next
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.head) <span class="text-violet-400">this</span>.tail = <span class="text-amber-400">null</span>
    <span class="text-violet-400">this</span>.size--
    <span class="text-violet-400">return</span> val
  }

  <span class="text-zinc-500">// O(1) — lê o head sem remover</span>
  peek(): T | <span class="text-amber-400">null</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.head?.value ?? <span class="text-amber-400">null</span>
  }

  isEmpty(): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.size === <span class="text-emerald-400">0</span>
  }

  <span class="text-violet-400">get</span> length(): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.size
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> q = <span class="text-violet-400">new</span> <span class="text-emerald-400">Queue</span>&lt;<span class="text-amber-400">number</span>&gt;()
q.enqueue(<span class="text-emerald-400">12</span>)
q.enqueue(<span class="text-emerald-400">45</span>)
q.enqueue(<span class="text-emerald-400">7</span>)
q.peek()      <span class="text-zinc-500">// 12</span>
q.dequeue()   <span class="text-zinc-500">// 12 — FIFO</span>
q.dequeue()   <span class="text-zinc-500">// 45</span>`
    },
    python: {
        filename: 'queue.py',
        code: `<span class="text-zinc-500"># Queue em Python</span>
<span class="text-zinc-500"># collections.deque é a implementação eficiente nativa</span>

<span class="text-violet-400">from</span> collections <span class="text-violet-400">import</span> deque

<span class="text-violet-400">class</span> <span class="text-emerald-400">Queue</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.data = <span class="text-emerald-400">deque</span>()

    <span class="text-zinc-500"># O(1) — adiciona no tail</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">enqueue</span>(self, value):
        self.data.<span class="text-emerald-400">append</span>(value)

    <span class="text-zinc-500"># O(1) — remove do head</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">dequeue</span>(self):
        <span class="text-violet-400">if</span> self.<span class="text-emerald-400">is_empty</span>():
            <span class="text-violet-400">return None</span>
        <span class="text-violet-400">return</span> self.data.<span class="text-emerald-400">popleft</span>()

    <span class="text-zinc-500"># O(1) — lê o head sem remover</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">peek</span>(self):
        <span class="text-violet-400">if</span> self.<span class="text-emerald-400">is_empty</span>():
            <span class="text-violet-400">return None</span>
        <span class="text-violet-400">return</span> self.data[<span class="text-emerald-400">0</span>]

    <span class="text-violet-400">def</span> <span class="text-emerald-400">is_empty</span>(self) -> <span class="text-amber-400">bool</span>:
        <span class="text-violet-400">return</span> len(self.data) == <span class="text-emerald-400">0</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">__len__</span>(self):
        <span class="text-violet-400">return</span> len(self.data)


<span class="text-zinc-500"># Uso</span>
q = <span class="text-emerald-400">Queue</span>()
q.<span class="text-emerald-400">enqueue</span>(<span class="text-emerald-400">12</span>)
q.<span class="text-emerald-400">enqueue</span>(<span class="text-emerald-400">45</span>)
q.<span class="text-emerald-400">enqueue</span>(<span class="text-emerald-400">7</span>)
q.<span class="text-emerald-400">peek</span>()      <span class="text-zinc-500"># 12</span>
q.<span class="text-emerald-400">dequeue</span>()   <span class="text-zinc-500"># 12 — FIFO</span>
q.<span class="text-emerald-400">dequeue</span>()   <span class="text-zinc-500"># 45</span>`
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