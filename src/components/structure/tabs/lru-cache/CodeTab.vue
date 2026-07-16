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
        filename: 'lru-cache.ts',
        code: `<span class="text-zinc-500">// LRU Cache em TypeScript</span>
<span class="text-zinc-500">// HashMap + Lista duplamente ligada → get/put em O(1)</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">DNode</span> {
  key: <span class="text-amber-400">number</span>
  value: <span class="text-amber-400">string</span>
  prev: <span class="text-emerald-400">DNode</span> | <span class="text-violet-400">null</span> = <span class="text-violet-400">null</span>
  next: <span class="text-emerald-400">DNode</span> | <span class="text-violet-400">null</span> = <span class="text-violet-400">null</span>

  <span class="text-violet-400">constructor</span>(key: <span class="text-amber-400">number</span>, value: <span class="text-amber-400">string</span>) {
    <span class="text-violet-400">this</span>.key = key
    <span class="text-violet-400">this</span>.value = value
  }
}

<span class="text-violet-400">class</span> <span class="text-emerald-400">LRUCache</span> {
  <span class="text-violet-400">private</span> capacity: <span class="text-amber-400">number</span>
  <span class="text-violet-400">private</span> map = <span class="text-violet-400">new</span> <span class="text-amber-400">Map</span>&lt;<span class="text-amber-400">number</span>, <span class="text-emerald-400">DNode</span>&gt;()
  <span class="text-zinc-500">// nós sentinela — evitam checks de null nas pontas</span>
  <span class="text-violet-400">private</span> head = <span class="text-violet-400">new</span> <span class="text-emerald-400">DNode</span>(<span class="text-emerald-400">-1</span>, <span class="text-amber-400">''</span>)
  <span class="text-violet-400">private</span> tail = <span class="text-violet-400">new</span> <span class="text-emerald-400">DNode</span>(<span class="text-emerald-400">-1</span>, <span class="text-amber-400">''</span>)

  <span class="text-violet-400">constructor</span>(capacity: <span class="text-amber-400">number</span>) {
    <span class="text-violet-400">this</span>.capacity = capacity
    <span class="text-violet-400">this</span>.head.next = <span class="text-violet-400">this</span>.tail
    <span class="text-violet-400">this</span>.tail.prev = <span class="text-violet-400">this</span>.head
  }

  <span class="text-zinc-500">// O(1) — desliga um nó dos seus vizinhos</span>
  <span class="text-violet-400">private</span> remove(node: <span class="text-emerald-400">DNode</span>): <span class="text-amber-400">void</span> {
    node.prev!.next = node.next
    node.next!.prev = node.prev
  }

  <span class="text-zinc-500">// O(1) — insere logo a seguir ao head (posição MRU)</span>
  <span class="text-violet-400">private</span> insertAtHead(node: <span class="text-emerald-400">DNode</span>): <span class="text-amber-400">void</span> {
    node.next = <span class="text-violet-400">this</span>.head.next
    node.prev = <span class="text-violet-400">this</span>.head
    <span class="text-violet-400">this</span>.head.next!.prev = node
    <span class="text-violet-400">this</span>.head.next = node
  }

  <span class="text-zinc-500">// O(1) — lê e marca como recém-usado</span>
  get(key: <span class="text-amber-400">number</span>): <span class="text-amber-400">string</span> | <span class="text-amber-400">-1</span> {
    <span class="text-violet-400">const</span> node = <span class="text-violet-400">this</span>.map.<span class="text-emerald-400">get</span>(key)
    <span class="text-violet-400">if</span> (!node) <span class="text-violet-400">return -1</span>

    <span class="text-violet-400">this</span>.<span class="text-emerald-400">remove</span>(node)
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">insertAtHead</span>(node)
    <span class="text-violet-400">return</span> node.value
  }

  <span class="text-zinc-500">// O(1) — insere/atualiza; remove o LRU se exceder capacidade</span>
  put(key: <span class="text-amber-400">number</span>, value: <span class="text-amber-400">string</span>): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> existing = <span class="text-violet-400">this</span>.map.<span class="text-emerald-400">get</span>(key)
    <span class="text-violet-400">if</span> (existing) {
      existing.value = value
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">remove</span>(existing)
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">insertAtHead</span>(existing)
      <span class="text-violet-400">return</span>
    }

    <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.map.size >= <span class="text-violet-400">this</span>.capacity) {
      <span class="text-violet-400">const</span> lru = <span class="text-violet-400">this</span>.tail.prev!
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">remove</span>(lru)
      <span class="text-violet-400">this</span>.map.<span class="text-emerald-400">delete</span>(lru.key)
    }

    <span class="text-violet-400">const</span> node = <span class="text-violet-400">new</span> <span class="text-emerald-400">DNode</span>(key, value)
    <span class="text-violet-400">this</span>.map.<span class="text-emerald-400">set</span>(key, node)
    <span class="text-violet-400">this</span>.<span class="text-emerald-400">insertAtHead</span>(node)
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> cache = <span class="text-violet-400">new</span> <span class="text-emerald-400">LRUCache</span>(<span class="text-emerald-400">3</span>)
cache.<span class="text-emerald-400">put</span>(<span class="text-emerald-400">1</span>, <span class="text-amber-400">'a'</span>)
cache.<span class="text-emerald-400">put</span>(<span class="text-emerald-400">2</span>, <span class="text-amber-400">'b'</span>)
cache.<span class="text-emerald-400">put</span>(<span class="text-emerald-400">3</span>, <span class="text-amber-400">'c'</span>)
cache.<span class="text-emerald-400">get</span>(<span class="text-emerald-400">1</span>)          <span class="text-zinc-500">// 'a' — 1 passa a MRU</span>
cache.<span class="text-emerald-400">put</span>(<span class="text-emerald-400">4</span>, <span class="text-amber-400">'d'</span>)     <span class="text-zinc-500">// cheia — remove 2 (LRU)</span>
cache.<span class="text-emerald-400">get</span>(<span class="text-emerald-400">2</span>)          <span class="text-zinc-500">// -1 — foi removido</span>`
    },
    python: {
        filename: 'lru_cache.py',
        code: `<span class="text-zinc-500"># LRU Cache em Python</span>
<span class="text-zinc-500"># OrderedDict mantém ordem de inserção → get/put em O(1)</span>

<span class="text-violet-400">from</span> collections <span class="text-violet-400">import</span> OrderedDict


<span class="text-violet-400">class</span> <span class="text-emerald-400">LRUCache</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self, capacity: <span class="text-amber-400">int</span>):
        self.capacity = capacity
        self.cache: OrderedDict[<span class="text-amber-400">int</span>, <span class="text-amber-400">str</span>] = OrderedDict()

    <span class="text-zinc-500"># O(1) — lê e marca como recém-usado</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">get</span>(self, key: <span class="text-amber-400">int</span>) -> <span class="text-amber-400">str</span>:
        <span class="text-violet-400">if</span> key <span class="text-violet-400">not in</span> self.cache:
            <span class="text-violet-400">return</span> <span class="text-emerald-400">-1</span>
        self.cache.<span class="text-emerald-400">move_to_end</span>(key, last=<span class="text-violet-400">False</span>)  <span class="text-zinc-500"># move para o head</span>
        <span class="text-violet-400">return</span> self.cache[key]

    <span class="text-zinc-500"># O(1) — insere/atualiza; remove o LRU se exceder capacidade</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">put</span>(self, key: <span class="text-amber-400">int</span>, value: <span class="text-amber-400">str</span>) -> <span class="text-violet-400">None</span>:
        <span class="text-violet-400">if</span> key <span class="text-violet-400">in</span> self.cache:
            <span class="text-violet-400">del</span> self.cache[key]
        <span class="text-violet-400">elif len</span>(self.cache) >= self.capacity:
            self.cache.<span class="text-emerald-400">popitem</span>(last=<span class="text-violet-400">True</span>)  <span class="text-zinc-500"># remove o LRU (fim do dict)</span>

        self.cache[key] = value
        self.cache.<span class="text-emerald-400">move_to_end</span>(key, last=<span class="text-violet-400">False</span>)  <span class="text-zinc-500"># coloca no head</span>


<span class="text-zinc-500"># Uso</span>
cache = <span class="text-emerald-400">LRUCache</span>(<span class="text-emerald-400">3</span>)
cache.<span class="text-emerald-400">put</span>(<span class="text-emerald-400">1</span>, <span class="text-amber-400">'a'</span>)
cache.<span class="text-emerald-400">put</span>(<span class="text-emerald-400">2</span>, <span class="text-amber-400">'b'</span>)
cache.<span class="text-emerald-400">put</span>(<span class="text-emerald-400">3</span>, <span class="text-amber-400">'c'</span>)
cache.<span class="text-emerald-400">get</span>(<span class="text-emerald-400">1</span>)           <span class="text-zinc-500"># 'a' — 1 passa a MRU</span>
cache.<span class="text-emerald-400">put</span>(<span class="text-emerald-400">4</span>, <span class="text-amber-400">'d'</span>)      <span class="text-zinc-500"># cheia — remove 2 (LRU)</span>
cache.<span class="text-emerald-400">get</span>(<span class="text-emerald-400">2</span>)           <span class="text-zinc-500"># -1 — foi removido</span>`
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