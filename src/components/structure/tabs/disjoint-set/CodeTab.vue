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
        filename: 'disjoint-set.ts',
        code: `<span class="text-zinc-500">// Disjoint Set (Union-Find) em TypeScript</span>
<span class="text-zinc-500">// Com Union by Rank + Path Compression → O(α(n)) amortizado</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">DisjointSet</span> {
  <span class="text-violet-400">private</span> parent: <span class="text-amber-400">number</span>[]
  <span class="text-violet-400">private</span> rank:   <span class="text-amber-400">number</span>[]

  <span class="text-violet-400">constructor</span>(n: <span class="text-amber-400">number</span>) {
    <span class="text-violet-400">this</span>.parent = Array.<span class="text-emerald-400">from</span>({ length: n }, (_, i) => i)
    <span class="text-violet-400">this</span>.rank   = <span class="text-violet-400">new</span> Array(n).<span class="text-emerald-400">fill</span>(<span class="text-emerald-400">0</span>)
  }

  <span class="text-zinc-500">// O(α(n)) — encontra raiz com path compression</span>
  find(x: <span class="text-amber-400">number</span>): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.parent[x] !== x)
      <span class="text-violet-400">this</span>.parent[x] = <span class="text-violet-400">this</span>.<span class="text-emerald-400">find</span>(<span class="text-violet-400">this</span>.parent[x]!)
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.parent[x]!
  }

  <span class="text-zinc-500">// O(α(n)) — une dois conjuntos por rank</span>
  union(x: <span class="text-amber-400">number</span>, y: <span class="text-amber-400">number</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">const</span> rootX = <span class="text-violet-400">this</span>.<span class="text-emerald-400">find</span>(x)
    <span class="text-violet-400">const</span> rootY = <span class="text-violet-400">this</span>.<span class="text-emerald-400">find</span>(y)
    <span class="text-violet-400">if</span> (rootX === rootY) <span class="text-violet-400">return false</span> <span class="text-zinc-500">// já no mesmo conjunto</span>

    <span class="text-zinc-500">// une pelo rank — árvore menor fica por baixo</span>
    <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.rank[rootX]! < <span class="text-violet-400">this</span>.rank[rootY]!) {
      <span class="text-violet-400">this</span>.parent[rootX] = rootY
    } <span class="text-violet-400">else if</span> (<span class="text-violet-400">this</span>.rank[rootX]! > <span class="text-violet-400">this</span>.rank[rootY]!) {
      <span class="text-violet-400">this</span>.parent[rootY] = rootX
    } <span class="text-violet-400">else</span> {
      <span class="text-violet-400">this</span>.parent[rootY] = rootX
      <span class="text-violet-400">this</span>.rank[rootX]!++
    }
    <span class="text-violet-400">return true</span>
  }

  <span class="text-zinc-500">// O(α(n)) — verifica se estão no mesmo conjunto</span>
  connected(x: <span class="text-amber-400">number</span>, y: <span class="text-amber-400">number</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.<span class="text-emerald-400">find</span>(x) === <span class="text-violet-400">this</span>.<span class="text-emerald-400">find</span>(y)
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> ds = <span class="text-violet-400">new</span> <span class="text-emerald-400">DisjointSet</span>(<span class="text-emerald-400">5</span>)
ds.<span class="text-emerald-400">union</span>(<span class="text-emerald-400">0</span>, <span class="text-emerald-400">1</span>)
ds.<span class="text-emerald-400">union</span>(<span class="text-emerald-400">2</span>, <span class="text-emerald-400">3</span>)
ds.<span class="text-emerald-400">union</span>(<span class="text-emerald-400">0</span>, <span class="text-emerald-400">2</span>)

ds.<span class="text-emerald-400">connected</span>(<span class="text-emerald-400">1</span>, <span class="text-emerald-400">3</span>) <span class="text-zinc-500">// true  — 1→0, 3→2→0</span>
ds.<span class="text-emerald-400">connected</span>(<span class="text-emerald-400">1</span>, <span class="text-emerald-400">4</span>) <span class="text-zinc-500">// false — 4 ainda isolado</span>
ds.<span class="text-emerald-400">find</span>(<span class="text-emerald-400">3</span>)           <span class="text-zinc-500">// 0     — raiz do conjunto</span>

<span class="text-zinc-500">// Caso de uso — detetar ciclos num grafo</span>
<span class="text-violet-400">function</span> <span class="text-emerald-400">hasCycle</span>(n: <span class="text-amber-400">number</span>, edges: [<span class="text-amber-400">number</span>, <span class="text-amber-400">number</span>][]): <span class="text-amber-400">boolean</span> {
  <span class="text-violet-400">const</span> ds = <span class="text-violet-400">new</span> <span class="text-emerald-400">DisjointSet</span>(n)
  <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> [u, v] <span class="text-violet-400">of</span> edges) {
    <span class="text-violet-400">if</span> (!ds.<span class="text-emerald-400">union</span>(u, v)) <span class="text-violet-400">return true</span> <span class="text-zinc-500">// já conectados = ciclo</span>
  }
  <span class="text-violet-400">return false</span>
}`
    },
    python: {
        filename: 'disjoint_set.py',
        code: `<span class="text-zinc-500"># Disjoint Set (Union-Find) em Python</span>
<span class="text-zinc-500"># Union by Rank + Path Compression</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">DisjointSet</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self, n: <span class="text-amber-400">int</span>):
        self.parent = <span class="text-emerald-400">list</span>(<span class="text-emerald-400">range</span>(n))
        self.rank   = [<span class="text-emerald-400">0</span>] * n

    <span class="text-zinc-500"># O(α(n)) — path compression</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">find</span>(self, x: <span class="text-amber-400">int</span>) -> <span class="text-amber-400">int</span>:
        <span class="text-violet-400">if</span> self.parent[x] != x:
            self.parent[x] = self.<span class="text-emerald-400">find</span>(self.parent[x])
        <span class="text-violet-400">return</span> self.parent[x]

    <span class="text-zinc-500"># O(α(n)) — union by rank</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">union</span>(self, x: <span class="text-amber-400">int</span>, y: <span class="text-amber-400">int</span>) -> <span class="text-amber-400">bool</span>:
        rx, ry = self.<span class="text-emerald-400">find</span>(x), self.<span class="text-emerald-400">find</span>(y)
        <span class="text-violet-400">if</span> rx == ry: <span class="text-violet-400">return False</span>

        <span class="text-violet-400">if</span>   self.rank[rx] < self.rank[ry]: self.parent[rx] = ry
        <span class="text-violet-400">elif</span> self.rank[rx] > self.rank[ry]: self.parent[ry] = rx
        <span class="text-violet-400">else</span>:
            self.parent[ry] = rx
            self.rank[rx] += <span class="text-emerald-400">1</span>
        <span class="text-violet-400">return True</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">connected</span>(self, x: <span class="text-amber-400">int</span>, y: <span class="text-amber-400">int</span>) -> <span class="text-amber-400">bool</span>:
        <span class="text-violet-400">return</span> self.<span class="text-emerald-400">find</span>(x) == self.<span class="text-emerald-400">find</span>(y)


<span class="text-zinc-500"># Uso</span>
ds = <span class="text-emerald-400">DisjointSet</span>(<span class="text-emerald-400">5</span>)
ds.<span class="text-emerald-400">union</span>(<span class="text-emerald-400">0</span>, <span class="text-emerald-400">1</span>)
ds.<span class="text-emerald-400">union</span>(<span class="text-emerald-400">2</span>, <span class="text-emerald-400">3</span>)
ds.<span class="text-emerald-400">union</span>(<span class="text-emerald-400">0</span>, <span class="text-emerald-400">2</span>)

ds.<span class="text-emerald-400">connected</span>(<span class="text-emerald-400">1</span>, <span class="text-emerald-400">3</span>) <span class="text-zinc-500"># True</span>
ds.<span class="text-emerald-400">connected</span>(<span class="text-emerald-400">1</span>, <span class="text-emerald-400">4</span>) <span class="text-zinc-500"># False</span>
ds.<span class="text-emerald-400">find</span>(<span class="text-emerald-400">3</span>)           <span class="text-zinc-500"># 0</span>


<span class="text-zinc-500"># Caso de uso — detetar ciclos</span>
<span class="text-violet-400">def</span> <span class="text-emerald-400">has_cycle</span>(n: <span class="text-amber-400">int</span>, edges: <span class="text-amber-400">list</span>) -> <span class="text-amber-400">bool</span>:
    ds = <span class="text-emerald-400">DisjointSet</span>(n)
    <span class="text-violet-400">for</span> u, v <span class="text-violet-400">in</span> edges:
        <span class="text-violet-400">if not</span> ds.<span class="text-emerald-400">union</span>(u, v):
            <span class="text-violet-400">return True</span>  <span class="text-zinc-500"># já conectados = ciclo</span>
    <span class="text-violet-400">return False</span>`
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