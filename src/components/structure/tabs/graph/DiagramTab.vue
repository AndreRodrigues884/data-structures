<template>
  <div class="max-w-3xl space-y-10">

    <!-- Undirected vs Directed -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Undirected vs Directed</h2>
      <p class="text-zinc-500 text-sm mb-6">
        Num grafo não direcionado as arestas não têm sentido.
        Num grafo direcionado cada aresta tem uma direção específica.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Undirected -->
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">undirected</p>
          <svg viewBox="0 0 200 160" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="60"  y1="40"  x2="140" y2="40"  stroke="#3f3f5a" stroke-width="1.5"/>
            <line x1="60"  y1="40"  x2="40"  y2="120" stroke="#3f3f5a" stroke-width="1.5"/>
            <line x1="140" y1="40"  x2="160" y2="120" stroke="#3f3f5a" stroke-width="1.5"/>
            <line x1="40"  y1="120" x2="160" y2="120" stroke="#3f3f5a" stroke-width="1.5"/>
            <line x1="60"  y1="40"  x2="160" y2="120" stroke="#3f3f5a" stroke-width="1.5"/>

            <g v-for="node in undirectedNodes" :key="node.id">
              <circle :cx="node.x" :cy="node.y" r="18" fill="#18181f" stroke="#7c6dfa" stroke-width="1.5"/>
              <text :x="node.x" :y="node.y" text-anchor="middle" dominant-baseline="middle"
                fill="#a78bfa" font-family="JetBrains Mono, monospace" font-size="13" font-weight="500">
                {{ node.label }}
              </text>
            </g>
          </svg>
        </div>

        <!-- Directed -->
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">directed</p>
          <svg viewBox="0 0 200 160" class="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arr-dir" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0"/>
              </marker>
            </defs>
            <line x1="60"  y1="40"  x2="132" y2="40"  stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-dir)"/>
            <line x1="140" y1="48"  x2="155" y2="108" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-dir)"/>
            <line x1="152" y1="120" x2="56"  y2="120" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-dir)"/>
            <line x1="40"  y1="112" x2="52"  y2="52"  stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-dir)"/>

            <g v-for="node in directedNodes" :key="node.id">
              <circle :cx="node.x" :cy="node.y" r="18" fill="#18181f" stroke="#3de0c0" stroke-width="1.5"/>
              <text :x="node.x" :y="node.y" text-anchor="middle" dominant-baseline="middle"
                fill="#3de0c0" font-family="JetBrains Mono, monospace" font-size="13" font-weight="500">
                {{ node.label }}
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>

    <!-- Weighted graph -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Weighted Graph</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Cada aresta tem um peso — distância, custo ou tempo.
        Usado em algoritmos de caminho mais curto como Dijkstra.
      </p>
      <svg viewBox="0 0 500 200" class="w-full bg-zinc-900 border border-zinc-800 p-2" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr-w" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="#f7a541"/>
          </marker>
        </defs>

        <g v-for="edge in weightedEdges" :key="`${edge.from}-${edge.to}`">
          <line
            :x1="getWNode(edge.from).x" :y1="getWNode(edge.from).y"
            :x2="getWNode(edge.to).x"   :y2="getWNode(edge.to).y"
            stroke="#3f3f5a" stroke-width="1.5"
          />
          <text
            :x="(getWNode(edge.from).x + getWNode(edge.to).x) / 2"
            :y="(getWNode(edge.from).y + getWNode(edge.to).y) / 2 - 8"
            text-anchor="middle" fill="#f7a541"
            font-family="JetBrains Mono, monospace" font-size="11"
          >{{ edge.weight }}</text>
        </g>

        <g v-for="node in weightedNodes" :key="node.id">
          <circle :cx="node.x" :cy="node.y" r="22" fill="#18181f" stroke="#7c6dfa" stroke-width="1.5"/>
          <text :x="node.x" :y="node.y" text-anchor="middle" dominant-baseline="middle"
            fill="#a78bfa" font-family="JetBrains Mono, monospace" font-size="13" font-weight="500">
            {{ node.label }}
          </text>
        </g>
      </svg>
    </section>

    <!-- Adjacency List vs Matrix -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-2">Adjacency List vs Matrix</h2>
      <p class="text-zinc-500 text-sm mb-4">
        Para este grafo simples, vê como cada representação o armazena em memória.
      </p>

      <svg viewBox="0 0 300 160" class="w-full max-w-xs mb-6 mx-auto" xmlns="http://www.w3.org/2000/svg">
        <line x1="80"  y1="50"  x2="220" y2="50"  stroke="#3f3f5a" stroke-width="1.5"/>
        <line x1="80"  y1="50"  x2="80"  y2="120" stroke="#3f3f5a" stroke-width="1.5"/>
        <line x1="220" y1="50"  x2="220" y2="120" stroke="#3f3f5a" stroke-width="1.5"/>
        <line x1="80"  y1="120" x2="220" y2="120" stroke="#3f3f5a" stroke-width="1.5"/>

        <g v-for="node in simpleNodes" :key="node.id">
          <circle :cx="node.x" :cy="node.y" r="20" fill="#18181f" stroke="#7c6dfa" stroke-width="1.5"/>
          <text :x="node.x" :y="node.y" text-anchor="middle" dominant-baseline="middle"
            fill="#a78bfa" font-family="JetBrains Mono, monospace" font-size="14" font-weight="500">
            {{ node.label }}
          </text>
        </g>
      </svg>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3">adjacency list</p>
          <pre class="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">A: [B, C]
B: [A, D]
C: [A, D]
D: [B, C]

<span class="text-zinc-600">Espaço: O(V + E)
Bom para grafos esparsos</span></pre>
        </div>
        <div class="bg-zinc-900 border border-zinc-800 p-4">
          <p class="font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">adjacency matrix</p>
          <pre class="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">  A B C D
A[0,1,1,0]
B[1,0,0,1]
C[1,0,0,1]
D[0,1,1,0]

<span class="text-zinc-600">Espaço: O(V²)
Bom para grafos densos</span></pre>
        </div>
      </div>
    </section>

    <!-- BFS vs DFS -->
    <section>
      <h2 class="text-xl font-bold tracking-tight mb-4">BFS vs DFS</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600"></div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">BFS</div>
        <div class="bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">DFS</div>
        <template v-for="row in bfsDfsComparison" :key="row.label">
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-500">{{ row.label }}</div>
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-300">{{ row.bfs }}</div>
          <div class="bg-zinc-900 px-4 py-3 text-sm text-zinc-300">{{ row.dfs }}</div>
        </template>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const undirectedNodes = [
  { id: 'A', label: 'A', x: 60,  y: 40  },
  { id: 'B', label: 'B', x: 140, y: 40  },
  { id: 'C', label: 'C', x: 40,  y: 120 },
  { id: 'D', label: 'D', x: 160, y: 120 },
]

const directedNodes = [
  { id: 'A', label: 'A', x: 60,  y: 40  },
  { id: 'B', label: 'B', x: 140, y: 40  },
  { id: 'C', label: 'C', x: 160, y: 120 },
  { id: 'D', label: 'D', x: 40,  y: 120 },
]

const weightedNodes = [
  { id: 'A', label: 'A', x: 80,  y: 100 },
  { id: 'B', label: 'B', x: 200, y: 40  },
  { id: 'C', label: 'C', x: 320, y: 100 },
  { id: 'D', label: 'D', x: 200, y: 160 },
  { id: 'E', label: 'E', x: 420, y: 100 },
]

const weightedEdges = [
  { from: 'A', to: 'B', weight: 4  },
  { from: 'A', to: 'D', weight: 2  },
  { from: 'B', to: 'C', weight: 3  },
  { from: 'B', to: 'D', weight: 5  },
  { from: 'C', to: 'E', weight: 1  },
  { from: 'D', to: 'C', weight: 8  },
  { from: 'D', to: 'E', weight: 9  },
]

function getWNode(id: string) {
  return weightedNodes.find(n => n.id === id) ?? weightedNodes[0]!
}

const simpleNodes = [
  { id: 'A', label: 'A', x: 80,  y: 50  },
  { id: 'B', label: 'B', x: 220, y: 50  },
  { id: 'C', label: 'C', x: 80,  y: 120 },
  { id: 'D', label: 'D', x: 220, y: 120 },
]

const bfsDfsComparison = [
  { label: 'Estrutura',    bfs: 'Queue',                 dfs: 'Stack (ou recursão)'         },
  { label: 'Ordem',        bfs: 'Nível a nível',         dfs: 'Profundidade primeiro'        },
  { label: 'Caminho curto',bfs: '✓ garante em não pesado',dfs: '✗ não garante'              },
  { label: 'Memória',      bfs: 'O(V) — guarda nível',   dfs: 'O(h) — h = altura do grafo' },
  { label: 'Uso típico',   bfs: 'Caminho mais curto, GPS',dfs: 'Ciclos, topological sort'   },
]
</script>