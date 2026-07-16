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
        filename: 'graph.ts',
        code: `<span class="text-zinc-500">// Graph em TypeScript — Adjacency List</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">Graph</span> {
  <span class="text-violet-400">private</span> adjacency: Map&lt;<span class="text-amber-400">string</span>, <span class="text-amber-400">string</span>[]&gt; = <span class="text-violet-400">new</span> Map()

  <span class="text-zinc-500">// O(1)</span>
  addVertex(id: <span class="text-amber-400">string</span>): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.adjacency.<span class="text-emerald-400">has</span>(id))
      <span class="text-violet-400">this</span>.adjacency.<span class="text-emerald-400">set</span>(id, [])
  }

  <span class="text-zinc-500">// O(1)</span>
  addEdge(from: <span class="text-amber-400">string</span>, to: <span class="text-amber-400">string</span>, directed = <span class="text-violet-400">false</span>): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">this</span>.adjacency.<span class="text-emerald-400">get</span>(from)?.<span class="text-emerald-400">push</span>(to)
    <span class="text-violet-400">if</span> (!directed) <span class="text-violet-400">this</span>.adjacency.<span class="text-emerald-400">get</span>(to)?.<span class="text-emerald-400">push</span>(from)
  }

  <span class="text-zinc-500">// O(V + E) — Breadth-First Search</span>
  bfs(start: <span class="text-amber-400">string</span>): <span class="text-amber-400">string</span>[] {
    <span class="text-violet-400">const</span> visited = <span class="text-violet-400">new</span> Set&lt;<span class="text-amber-400">string</span>&gt;([start])
    <span class="text-violet-400">const</span> queue   = [start]
    <span class="text-violet-400">const</span> result: <span class="text-amber-400">string</span>[] = []

    <span class="text-violet-400">while</span> (queue.length) {
      <span class="text-violet-400">const</span> node = queue.<span class="text-emerald-400">shift</span>()!
      result.<span class="text-emerald-400">push</span>(node)

      <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> neighbor <span class="text-violet-400">of</span> <span class="text-violet-400">this</span>.adjacency.<span class="text-emerald-400">get</span>(node) ?? []) {
        <span class="text-violet-400">if</span> (!visited.<span class="text-emerald-400">has</span>(neighbor)) {
          visited.<span class="text-emerald-400">add</span>(neighbor)
          queue.<span class="text-emerald-400">push</span>(neighbor)
        }
      }
    }
    <span class="text-violet-400">return</span> result
  }

  <span class="text-zinc-500">// O(V + E) — Depth-First Search</span>
  dfs(start: <span class="text-amber-400">string</span>): <span class="text-amber-400">string</span>[] {
    <span class="text-violet-400">const</span> visited = <span class="text-violet-400">new</span> Set&lt;<span class="text-amber-400">string</span>&gt;()
    <span class="text-violet-400">const</span> result: <span class="text-amber-400">string</span>[] = []

    <span class="text-violet-400">const</span> explore = (node: <span class="text-amber-400">string</span>) => {
      visited.<span class="text-emerald-400">add</span>(node)
      result.<span class="text-emerald-400">push</span>(node)
      <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> neighbor <span class="text-violet-400">of</span> <span class="text-violet-400">this</span>.adjacency.<span class="text-emerald-400">get</span>(node) ?? []) {
        <span class="text-violet-400">if</span> (!visited.<span class="text-emerald-400">has</span>(neighbor)) <span class="text-emerald-400">explore</span>(neighbor)
      }
    }

    <span class="text-emerald-400">explore</span>(start)
    <span class="text-violet-400">return</span> result
  }

  <span class="text-zinc-500">// O(V + E) — verifica se existe caminho</span>
  hasPath(from: <span class="text-amber-400">string</span>, to: <span class="text-amber-400">string</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.<span class="text-emerald-400">bfs</span>(from).<span class="text-emerald-400">includes</span>(to)
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> g = <span class="text-violet-400">new</span> <span class="text-emerald-400">Graph</span>()
<span class="text-emerald-400">['A','B','C','D','E']</span>.<span class="text-emerald-400">forEach</span>(v => g.<span class="text-emerald-400">addVertex</span>(v))
g.<span class="text-emerald-400">addEdge</span>(<span class="text-emerald-400">'A'</span>, <span class="text-emerald-400">'B'</span>)
g.<span class="text-emerald-400">addEdge</span>(<span class="text-emerald-400">'A'</span>, <span class="text-emerald-400">'C'</span>)
g.<span class="text-emerald-400">addEdge</span>(<span class="text-emerald-400">'B'</span>, <span class="text-emerald-400">'D'</span>)
g.<span class="text-emerald-400">addEdge</span>(<span class="text-emerald-400">'C'</span>, <span class="text-emerald-400">'E'</span>)

g.<span class="text-emerald-400">bfs</span>(<span class="text-emerald-400">'A'</span>)      <span class="text-zinc-500">// ['A','B','C','D','E']</span>
g.<span class="text-emerald-400">dfs</span>(<span class="text-emerald-400">'A'</span>)      <span class="text-zinc-500">// ['A','B','D','C','E']</span>
g.<span class="text-emerald-400">hasPath</span>(<span class="text-emerald-400">'A'</span>, <span class="text-emerald-400">'E'</span>) <span class="text-zinc-500">// true</span>
g.<span class="text-emerald-400">hasPath</span>(<span class="text-emerald-400">'D'</span>, <span class="text-emerald-400">'E'</span>) <span class="text-zinc-500">// false</span>`
    },
    python: {
        filename: 'graph.py',
        code: `<span class="text-zinc-500"># Graph em Python — Adjacency List</span>

<span class="text-violet-400">from</span> collections <span class="text-violet-400">import</span> deque

<span class="text-violet-400">class</span> <span class="text-emerald-400">Graph</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.adjacency = {}

    <span class="text-zinc-500"># O(1)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">add_vertex</span>(self, id):
        <span class="text-violet-400">if</span> id <span class="text-violet-400">not in</span> self.adjacency:
            self.adjacency[id] = []

    <span class="text-zinc-500"># O(1)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">add_edge</span>(self, from_v, to_v, directed=<span class="text-amber-400">False</span>):
        self.adjacency[from_v].<span class="text-emerald-400">append</span>(to_v)
        <span class="text-violet-400">if not</span> directed:
            self.adjacency[to_v].<span class="text-emerald-400">append</span>(from_v)

    <span class="text-zinc-500"># O(V + E) — BFS</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">bfs</span>(self, start) -> <span class="text-amber-400">list</span>:
        visited = {start}
        queue   = <span class="text-emerald-400">deque</span>([start])
        result  = []

        <span class="text-violet-400">while</span> queue:
            node = queue.<span class="text-emerald-400">popleft</span>()
            result.<span class="text-emerald-400">append</span>(node)
            <span class="text-violet-400">for</span> neighbor <span class="text-violet-400">in</span> self.adjacency.<span class="text-emerald-400">get</span>(node, []):
                <span class="text-violet-400">if</span> neighbor <span class="text-violet-400">not in</span> visited:
                    visited.<span class="text-emerald-400">add</span>(neighbor)
                    queue.<span class="text-emerald-400">append</span>(neighbor)
        <span class="text-violet-400">return</span> result

    <span class="text-zinc-500"># O(V + E) — DFS</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">dfs</span>(self, start) -> <span class="text-amber-400">list</span>:
        visited = <span class="text-emerald-400">set</span>()
        result  = []

        <span class="text-violet-400">def</span> <span class="text-emerald-400">explore</span>(node):
            visited.<span class="text-emerald-400">add</span>(node)
            result.<span class="text-emerald-400">append</span>(node)
            <span class="text-violet-400">for</span> neighbor <span class="text-violet-400">in</span> self.adjacency.<span class="text-emerald-400">get</span>(node, []):
                <span class="text-violet-400">if</span> neighbor <span class="text-violet-400">not in</span> visited:
                    <span class="text-emerald-400">explore</span>(neighbor)

        <span class="text-emerald-400">explore</span>(start)
        <span class="text-violet-400">return</span> result

    <span class="text-zinc-500"># O(V + E) — verifica caminho</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">has_path</span>(self, from_v, to_v) -> <span class="text-amber-400">bool</span>:
        <span class="text-violet-400">return</span> to_v <span class="text-violet-400">in</span> self.<span class="text-emerald-400">bfs</span>(from_v)


<span class="text-zinc-500"># Uso</span>
g = <span class="text-emerald-400">Graph</span>()
<span class="text-violet-400">for</span> v <span class="text-violet-400">in</span> [<span class="text-emerald-400">'A'</span>, <span class="text-emerald-400">'B'</span>, <span class="text-emerald-400">'C'</span>, <span class="text-emerald-400">'D'</span>, <span class="text-emerald-400">'E'</span>]:
    g.<span class="text-emerald-400">add_vertex</span>(v)

g.<span class="text-emerald-400">add_edge</span>(<span class="text-emerald-400">'A'</span>, <span class="text-emerald-400">'B'</span>)
g.<span class="text-emerald-400">add_edge</span>(<span class="text-emerald-400">'A'</span>, <span class="text-emerald-400">'C'</span>)
g.<span class="text-emerald-400">add_edge</span>(<span class="text-emerald-400">'B'</span>, <span class="text-emerald-400">'D'</span>)
g.<span class="text-emerald-400">add_edge</span>(<span class="text-emerald-400">'C'</span>, <span class="text-emerald-400">'E'</span>)

g.<span class="text-emerald-400">bfs</span>(<span class="text-emerald-400">'A'</span>)           <span class="text-zinc-500"># ['A','B','C','D','E']</span>
g.<span class="text-emerald-400">dfs</span>(<span class="text-emerald-400">'A'</span>)           <span class="text-zinc-500"># ['A','B','D','C','E']</span>
g.<span class="text-emerald-400">has_path</span>(<span class="text-emerald-400">'A'</span>, <span class="text-emerald-400">'E'</span>) <span class="text-zinc-500"># True</span>`
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