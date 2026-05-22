<template>
    <div class="max-w-3xl space-y-10">

        <!-- Hash function flow -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-2">Fluxo da função de hash</h2>
            <p class="text-zinc-500 text-sm mb-6">
                A chave é convertida num índice pela função de hash.
                O valor é armazenado nesse bucket.
            </p>

            <svg viewBox="0 0 640 120" class="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arr-h1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 Z" fill="#7c6dfa" />
                    </marker>
                    <marker id="arr-h2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0" />
                    </marker>
                </defs>

                <rect x="10" y="40" width="100" height="40" fill="#18181f" stroke="#7c6dfa" stroke-width="1" />
                <text x="60" y="64" text-anchor="middle" dominant-baseline="middle" fill="#a78bfa"
                    font-family="JetBrains Mono, monospace" font-size="13">"name"</text>
                <text x="60" y="28" text-anchor="middle" fill="#8888a0" font-family="JetBrains Mono, monospace"
                    font-size="10">chave</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#7c6dfa" stroke-width="1.5" marker-end="url(#arr-h1)" />

                <rect x="160" y="30" width="120" height="60" fill="#1e1b4b" stroke="#7c6dfa" stroke-width="1" />
                <text x="220" y="52" text-anchor="middle" fill="#a78bfa" font-family="JetBrains Mono, monospace"
                    font-size="11">hash(key)</text>
                <text x="220" y="66" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace"
                    font-size="10">h = h*31 + c</text>
                <text x="220" y="80" text-anchor="middle" fill="#7c6dfa" font-family="JetBrains Mono, monospace"
                    font-size="10">% size</text>

                <line x1="280" y1="60" x2="330" y2="60" stroke="#3de0c0" stroke-width="1.5" marker-end="url(#arr-h2)" />
                <text x="305" y="50" text-anchor="middle" fill="#3de0c0" font-family="JetBrains Mono, monospace"
                    font-size="10">→ 3</text>

                <g v-for="(bucket, i) in buckets" :key="i">
                    <rect :x="330 + i * 50" y="40" width="46" height="40" :fill="bucket.active ? '#0d2b1e' : '#18181f'"
                        :stroke="bucket.active ? '#3de0c0' : '#3f3f5a'" stroke-width="1" />
                    <text :x="330 + i * 50 + 23" y="56" text-anchor="middle" fill="#8888a0"
                        font-family="JetBrains Mono, monospace" font-size="10">{{ i }}</text>
                    <text v-if="bucket.active" :x="330 + i * 50 + 23" y="70" text-anchor="middle" fill="#3de0c0"
                        font-family="JetBrains Mono, monospace" font-size="9">{{ bucket.val }}</text>
                </g>
                <text x="480" y="28" text-anchor="middle" fill="#8888a0" font-family="JetBrains Mono, monospace"
                    font-size="10">buckets</text>
            </svg>
        </section>

        <!-- Chaining collision -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-2">Colisão — Chaining</h2>
            <p class="text-zinc-500 text-sm mb-6">
                Quando duas chaves mapeiam para o mesmo índice, são guardadas
                numa Linked List no mesmo bucket.
            </p>

            <svg viewBox="0 0 500 200" class="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arr-chain" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 Z" fill="#3de0c0" />
                    </marker>
                    <marker id="arr-null" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 Z" fill="#3f3f5a" />
                    </marker>
                </defs>

                <g v-for="(row, i) in chainRows" :key="i">
                    <rect x="10" :y="row.y" width="40" height="36" fill="#111118" stroke="#3f3f5a" stroke-width="1" />
                    <text x="30" :y="row.y + 18" text-anchor="middle" dominant-baseline="middle" fill="#8888a0"
                        font-family="JetBrains Mono, monospace" font-size="12">{{ i }}</text>

                    <rect v-if="row.items.length > 0" x="60" :y="row.y" width="100" height="36"
                        :fill="row.collision ? '#1e1b4b' : '#18181f'" :stroke="row.collision ? '#7c6dfa' : '#3f3f5a'"
                        stroke-width="1" />
                    <text v-if="row.items.length > 0" x="110" :y="row.y + 18" text-anchor="middle"
                        dominant-baseline="middle" :fill="row.collision ? '#a78bfa' : '#e8e8f0'"
                        font-family="JetBrains Mono, monospace" font-size="11">{{ row.items[0] }}</text>

                    <line v-if="row.items.length > 1" :x1="160" :y1="row.y + 18" :x2="185" :y2="row.y + 18"
                        stroke="#7c6dfa" stroke-width="1.5" marker-end="url(#arr-chain)" />

                    <rect v-if="row.items.length > 1" x="188" :y="row.y" width="100" height="36" fill="#1e1b4b"
                        stroke="#f7a541" stroke-width="1.5" />
                    <text v-if="row.items.length > 1" x="238" :y="row.y + 18" text-anchor="middle"
                        dominant-baseline="middle" fill="#f7a541" font-family="JetBrains Mono, monospace"
                        font-size="11">{{ row.items[1] }}</text>
                    <text v-if="row.items.length > 1" x="238" :y="row.y - 8" text-anchor="middle" fill="#f7a541"
                        font-family="JetBrains Mono, monospace" font-size="9">colisão!</text>

                    <line v-if="row.items.length > 0" :x1="row.items.length > 1 ? 288 : 160" :y1="row.y + 18"
                        :x2="row.items.length > 1 ? 308 : 180" :y2="row.y + 18" stroke="#3f3f5a" stroke-width="1"
                        marker-end="url(#arr-null)" />
                    <text :x="row.items.length > 1 ? 318 : 190" :y="row.y + 22" fill="#3f3f5a"
                        font-family="JetBrains Mono, monospace" font-size="10">null</text>

                    <text v-if="row.items.length === 0" x="65" :y="row.y + 22" fill="#3f3f5a"
                        font-family="JetBrains Mono, monospace" font-size="10">—</text>
                </g>
            </svg>
        </section>

        <!-- Interactive hash demo -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-2">Experimenta a função de hash</h2>
            <p class="text-zinc-500 text-sm mb-4">
                Escreve uma chave e vê em que bucket ficaria num array de tamanho 8.
                A fórmula <span class="text-violet-400">h = (h × 31 + charCode) % size</span> garante
                que a posição de cada letra importa — "abc" e "cba" ficam em buckets diferentes.
            </p>

            <div class="flex gap-3 mb-4">
                <input v-model="demoKey" type="text" placeholder="escreve uma chave..."
                    class="flex-1 bg-zinc-900 border border-zinc-700 px-4 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-violet-400" />
                <div class="bg-zinc-900 border border-zinc-700 px-4 py-2 font-mono text-sm">
                    <span class="text-zinc-500">bucket →</span>
                    <span class="text-violet-400 ml-2">{{ demoHash }}</span>
                </div>
            </div>

            <!-- Cálculo passo a passo -->
            <div class="bg-zinc-900 border border-zinc-800 p-4 mb-4 font-mono text-sm space-y-2">
                <p class="text-zinc-600 text-xs uppercase tracking-widest mb-3">cálculo</p>

                <!-- Caracteres e códigos ASCII -->
                <div class="flex gap-px flex-wrap mb-3">
                    <div v-for="(char, i) in demoKey.split('')" :key="i"
                        class="flex flex-col items-center border border-zinc-700 bg-zinc-800 px-2 py-1 min-w-8">
                        <span class="text-violet-400">{{ char }}</span>
                        <span class="text-zinc-600 text-xs">{{ char.charCodeAt(0) }}</span>
                    </div>
                </div>

                <!-- Passos -->
                <div class="space-y-1">
                    <p v-for="(step, i) in hashSteps" :key="i" class="text-xs">
                        <span class="text-zinc-600">passo {{ i + 1 }}:</span>
                        <span class="text-zinc-400"> h = (</span>
                        <span class="text-emerald-400">{{ step.prev }}</span>
                        <span class="text-zinc-400"> × 31 + </span>
                        <span class="text-violet-400">{{ step.code }}</span>
                        <span class="text-zinc-400">) % 8 = </span>
                        <span class="text-emerald-400">{{ step.result }}</span>
                    </p>
                </div>

                <!-- Resultado final -->
                <p class="text-zinc-400 border-t border-zinc-800 pt-2 mt-2">
                    bucket = <span class="text-violet-400 font-bold">{{ demoHash }}</span>
                </p>
            </div>

            <!-- Buckets -->
            <div class="flex gap-px">
                <div v-for="i in 8" :key="i"
                    class="flex-1 h-12 flex items-center justify-center font-mono text-sm border transition-all duration-300"
                    :class="(i - 1) === demoHash
                        ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-600'">
                    {{ i - 1 }}
                </div>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const buckets = [
    { active: false, val: '' },
    { active: false, val: '' },
    { active: false, val: '' },
    { active: true, val: 'Alice' },
    { active: false, val: '' },
    { active: false, val: '' },
]

const chainRows = [
    { y: 10, items: ['name: Alice'], collision: false },
    { y: 56, items: [], collision: false },
    { y: 102, items: ['age: 30', 'city: NYC'], collision: true },
    { y: 148, items: ['job: dev'], collision: false },
]

const demoKey = ref('hello')

function realHash(key: string, size: number): number {
    let h = 0
    for (const char of key) {
        h = (h * 31 + char.charCodeAt(0)) % size
    }
    return h
}

const demoHash = computed(() =>
    demoKey.value ? realHash(demoKey.value, 8) : 0
)

const hashSteps = computed(() => {
    const steps: { prev: number; code: number; result: number }[] = []
    let h = 0
    for (const char of demoKey.value) {
        const prev = h
        const code = char.charCodeAt(0)
        h = (h * 31 + code) % 8
        steps.push({ prev, code, result: h })
    }
    return steps
})
</script>