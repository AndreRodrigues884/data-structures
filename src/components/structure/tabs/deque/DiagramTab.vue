<template>
    <div class="max-w-3xl space-y-10">

        <!-- Estrutura visual -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-2">Double-Ended Queue</h2>
            <p class="text-zinc-500 text-sm mb-6">
                Ao contrário da Queue, o Deque permite inserir e remover em
                <span class="text-violet-400">ambas as extremidades</span> em O(1).
            </p>

            <svg viewBox="0 0 640 140" class="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arr-front-in" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 Z" fill="#7c6dfa" />
                    </marker>
                    <marker id="arr-front-out" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 Z" fill="#f0545a" />
                    </marker>
                    <marker id="arr-back-in" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0" />
                    </marker>
                    <marker id="arr-back-out" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 Z" fill="#f7a541" />
                    </marker>
                </defs>

                <!-- pushFront arrow -->
                <line x1="20" y1="55" x2="52" y2="55" stroke="#7c6dfa" stroke-width="1.5"
                    marker-end="url(#arr-front-in)" />
                <text x="10" y="44" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace"
                    font-size="10">pushFront</text>

                <!-- popFront arrow -->
                <line x1="52" y1="75" x2="20" y2="75" stroke="#f0545a" stroke-width="1.5"
                    marker-end="url(#arr-front-out)" />
                <text x="10" y="88" text-anchor="middle" fill="#f0545a" font-family="JetBrains Mono, monospace"
                    font-size="10">popFront</text>

                <!-- pushBack arrow -->
                <line x1="620" y1="55" x2="588" y2="55" stroke="#3de0c0" stroke-width="1.5"
                    marker-end="url(#arr-back-in)" />
                <text x="630" y="44" text-anchor="middle" fill="#3de0c0" font-family="JetBrains Mono, monospace"
                    font-size="10">pushBack</text>

                <!-- popBack arrow -->
                <line x1="588" y1="75" x2="620" y2="75" stroke="#f7a541" stroke-width="1.5"
                    marker-end="url(#arr-back-out)" />
                <text x="630" y="88" text-anchor="middle" fill="#f7a541" font-family="JetBrains Mono, monospace"
                    font-size="10">popBack</text>

                <!-- Nodes -->
                <g v-for="(node, i) in nodes" :key="node.value">
                    <rect :x="node.x" y="44" width="80" height="52"
                        :fill="i === 0 ? '#1e1b4b' : i === nodes.length - 1 ? '#0d2b1e' : '#18181f'"
                        :stroke="i === 0 ? '#7c6dfa' : i === nodes.length - 1 ? '#3de0c0' : '#3f3f5a'"
                        stroke-width="1" />
                    <text :x="node.x + 40" y="74" text-anchor="middle" dominant-baseline="middle"
                        :fill="i === 0 ? '#a78bfa' : i === nodes.length - 1 ? '#3de0c0' : '#e8e8f0'"
                        font-family="JetBrains Mono, monospace" font-size="16" font-weight="500">{{ node.value }}</text>
                </g>

                <!-- Front label -->
                <text x="92" y="112" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace"
                    font-size="11">front</text>

                <!-- Back label -->
                <text x="548" y="112" text-anchor="middle" fill="#3de0c0" font-family="JetBrains Mono, monospace"
                    font-size="11">back</text>
            </svg>
        </section>

        <!-- 4 operações -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-4">As 4 operações</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="op in ops" :key="op.name" class="bg-zinc-900 border border-zinc-800 p-4">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="font-mono text-sm" :class="op.color">{{ op.name }}</span>
                        <span class="font-mono text-xs text-zinc-600">O(1)</span>
                    </div>
                    <p class="text-sm text-zinc-400 mb-3">{{ op.desc }}</p>
                    <svg :viewBox="op.viewBox" class="w-full" xmlns="http://www.w3.org/2000/svg">
                        <!-- Existing blocks -->
                        <rect x="60" y="20" width="44" height="36" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
                        <rect x="104" y="20" width="44" height="36" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
                        <rect x="148" y="20" width="44" height="36" fill="#18181f" stroke="#3f3f5a" stroke-width="1" />
                        <text x="82" y="41" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
                            font-family="JetBrains Mono, monospace" font-size="12">A</text>
                        <text x="126" y="41" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
                            font-family="JetBrains Mono, monospace" font-size="12">B</text>
                        <text x="170" y="41" text-anchor="middle" dominant-baseline="middle" fill="#e8e8f0"
                            font-family="JetBrains Mono, monospace" font-size="12">C</text>
                        <!-- Dynamic element -->
                        <rect :x="op.dynX" y="20" width="44" height="36" :fill="op.dynFill" :stroke="op.dynStroke"
                            stroke-width="1.5" stroke-dasharray="4,2" />
                        <text :x="op.dynX + 22" y="41" text-anchor="middle" dominant-baseline="middle"
                            :fill="op.dynTextColor" font-family="JetBrains Mono, monospace" font-size="12">{{ op.dynVal
                            }}</text>
                        <!-- Arrow -->
                        <line :x1="op.ax1" :y1="op.ay1" :x2="op.ax2" :y2="op.ay2" :stroke="op.arrowColor"
                            stroke-width="1.5" :marker-end="op.marker" />
                        <defs>
                            <marker :id="op.markerId" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                                <path d="M0,0 L0,8 L8,4 Z" :fill="op.arrowColor" />
                            </marker>
                        </defs>
                    </svg>
                </div>
            </div>
        </section>

        <!-- Sliding window hint -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-3">Padrão — Monotonic Deque</h2>
            <p class="text-zinc-500 text-sm mb-4">
                Um dos padrões mais poderosos — mantém o Deque em ordem decrescente
                para encontrar o máximo de uma janela deslizante em O(n).
            </p>
            <div class="bg-zinc-900 border border-zinc-800 p-4">
                <pre class="font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto"><span class="text-zinc-500">// Máximo de cada janela de tamanho k</span>
<span class="text-violet-400">function</span> <span class="text-emerald-400">slidingWindowMax</span>(nums, k) {
  <span class="text-violet-400">const</span> deque = []  <span class="text-zinc-500">// guarda índices</span>
  <span class="text-violet-400">const</span> result = []

  <span class="text-violet-400">for</span> (<span class="text-violet-400">let</span> i = <span class="text-emerald-400">0</span>; i &lt; nums.length; i++) {
    <span class="text-zinc-500">// remove índices fora da janela</span>
    <span class="text-violet-400">if</span> (deque[<span class="text-emerald-400">0</span>] &lt; i - k + <span class="text-emerald-400">1</span>) deque.<span class="text-emerald-400">shift</span>()

    <span class="text-zinc-500">// remove do back enquanto menor que atual</span>
    <span class="text-violet-400">while</span> (deque.length && nums[deque[deque.length-<span class="text-emerald-400">1</span>]] &lt; nums[i])
      deque.<span class="text-emerald-400">pop</span>()

    deque.<span class="text-emerald-400">push</span>(i)

    <span class="text-violet-400">if</span> (i >= k - <span class="text-emerald-400">1</span>) result.<span class="text-emerald-400">push</span>(nums[deque[<span class="text-emerald-400">0</span>]])
  }
  <span class="text-violet-400">return</span> result
}</pre>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
const nodes = [
    { value: 12, x: 52 },
    { value: 45, x: 142 },
    { value: 7, x: 232 },
    { value: 93, x: 322 },
    { value: 31, x: 412 },
    { value: 58, x: 502 },
]

const ops = [
    {
        name: 'pushFront(x)', color: 'text-violet-400', desc: 'Novo elemento entra pelo front.',
        viewBox: '0 0 260 60', dynX: 16, dynFill: '#1e1b4b', dynStroke: '#7c6dfa', dynVal: 'X', dynTextColor: '#a78bfa',
        ax1: 56, ay1: 38, ax2: 62, ay2: 38, arrowColor: '#7c6dfa', markerId: 'mpf', marker: 'url(#mpf)',
    },
    {
        name: 'pushBack(x)', color: 'text-emerald-400', desc: 'Novo elemento entra pelo back.',
        viewBox: '0 0 260 60', dynX: 196, dynFill: '#0d2b1e', dynStroke: '#3de0c0', dynVal: 'X', dynTextColor: '#3de0c0',
        ax1: 196, ay1: 38, ax2: 194, ay2: 38, arrowColor: '#3de0c0', markerId: 'mpb', marker: 'url(#mpb)',
    },
    {
        name: 'popFront()', color: 'text-red-400', desc: 'Elemento sai pelo front.',
        viewBox: '0 0 260 60', dynX: 16, dynFill: '#2d1515', dynStroke: '#f0545a', dynVal: 'A', dynTextColor: '#f0545a',
        ax1: 14, ay1: 38, ax2: 8, ay2: 38, arrowColor: '#f0545a', markerId: 'mppf', marker: 'url(#mppf)',
    },
    {
        name: 'popBack()', color: 'text-amber-400', desc: 'Elemento sai pelo back.',
        viewBox: '0 0 260 60', dynX: 196, dynFill: '#2d1e0a', dynStroke: '#f7a541', dynVal: 'C', dynTextColor: '#f7a541',
        ax1: 242, ay1: 38, ax2: 248, ay2: 38, arrowColor: '#f7a541', markerId: 'mppb', marker: 'url(#mppb)',
    },
]
</script>