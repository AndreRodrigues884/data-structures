<template>
  <div class="max-w-3xl space-y-6">

    <!-- Language selector -->
    <div class="flex gap-1 border-b border-zinc-800">
      <button
        v-for="lang in languages"
        :key="lang.id"
        @click="activeLang = lang.id"
        class="font-mono text-sm px-4 py-2 border-b-2 -mb-px transition-colors"
        :class="activeLang === lang.id
          ? 'text-violet-400 border-violet-400'
          : 'text-zinc-500 border-transparent hover:text-zinc-300'"
      >
        {{ lang.label }}
      </button>
    </div>

    <!-- Code block -->
    <div class="bg-zinc-900 border border-zinc-800">

      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <span class="font-mono text-xs text-zinc-600">{{ activeLanguage?.filename }}</span>
        <button
          @click="copy"
          class="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {{ copied ? '✓ copiado' : 'copiar' }}
        </button>
      </div>

      <!-- Code -->
      <pre class="p-5 overflow-x-auto font-mono text-sm leading-relaxed text-zinc-300"
        v-html="activeLanguage?.code"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeLang = ref('typescript')
const copied = ref(false)

const languages = [
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python',     label: 'Python'     },
]

const code = {
  typescript: {
    filename: 'array.ts',
    code: `<span class="text-zinc-500">// Array em TypeScript</span>
<span class="text-zinc-500">// Wrapper com operações explícitas para fins didáticos</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">DynamicArray</span>&lt;T&gt; {
  <span class="text-violet-400">private</span> data: T[] = []

  <span class="text-zinc-500">// O(1) — acesso direto por índice</span>
  <span class="text-violet-400">get</span>(index: <span class="text-amber-400">number</span>): T | <span class="text-amber-400">undefined</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data[index]
  }

  <span class="text-zinc-500">// O(1) amortizado — inserção no fim</span>
  push(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">this</span>.data.push(value)
  }

  <span class="text-zinc-500">// O(n) — inserção no meio (shift de elementos)</span>
  insertAt(index: <span class="text-amber-400">number</span>, value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">this</span>.data.splice(index, <span class="text-emerald-400">0</span>, value)
  }

  <span class="text-zinc-500">// O(n) — remoção no meio (shift de elementos)</span>
  removeAt(index: <span class="text-amber-400">number</span>): T | <span class="text-amber-400">undefined</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data.splice(index, <span class="text-emerald-400">1</span>)[<span class="text-emerald-400">0</span>]
  }

  <span class="text-zinc-500">// O(n) — pesquisa linear</span>
  search(value: T): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">for</span> (<span class="text-violet-400">let</span> i = <span class="text-emerald-400">0</span>; i &lt; <span class="text-violet-400">this</span>.data.length; i++) {
      <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.data[i] === value) <span class="text-violet-400">return</span> i
    }
    <span class="text-violet-400">return</span> -<span class="text-emerald-400">1</span>
  }

  <span class="text-violet-400">get</span> length(): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data.length
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> arr = <span class="text-violet-400">new</span> <span class="text-emerald-400">DynamicArray</span>&lt;<span class="text-amber-400">number</span>&gt;()
arr.push(<span class="text-emerald-400">12</span>)
arr.push(<span class="text-emerald-400">45</span>)
arr.push(<span class="text-emerald-400">7</span>)
arr.insertAt(<span class="text-emerald-400">1</span>, <span class="text-emerald-400">99</span>)  <span class="text-zinc-500">// [12, 99, 45, 7]</span>
arr.removeAt(<span class="text-emerald-400">2</span>)        <span class="text-zinc-500">// [12, 99, 7]</span>
arr.search(<span class="text-emerald-400">99</span>)          <span class="text-zinc-500">// 1</span>`
  },
  python: {
    filename: 'array.py',
    code: `<span class="text-zinc-500"># Array em Python</span>
<span class="text-zinc-500"># Python usa listas dinâmicas por defeito</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">DynamicArray</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.data = []

    <span class="text-zinc-500"># O(1) — acesso direto por índice</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">get</span>(self, index: <span class="text-amber-400">int</span>):
        <span class="text-violet-400">return</span> self.data[index]

    <span class="text-zinc-500"># O(1) amortizado — inserção no fim</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">push</span>(self, value):
        self.data.append(value)

    <span class="text-zinc-500"># O(n) — inserção no meio</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">insert_at</span>(self, index: <span class="text-amber-400">int</span>, value):
        self.data.insert(index, value)

    <span class="text-zinc-500"># O(n) — remoção por índice</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">remove_at</span>(self, index: <span class="text-amber-400">int</span>):
        <span class="text-violet-400">return</span> self.data.pop(index)

    <span class="text-zinc-500"># O(n) — pesquisa linear</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">search</span>(self, value) -> <span class="text-amber-400">int</span>:
        <span class="text-violet-400">for</span> i, item <span class="text-violet-400">in</span> enumerate(self.data):
            <span class="text-violet-400">if</span> item == value:
                <span class="text-violet-400">return</span> i
        <span class="text-violet-400">return</span> -<span class="text-emerald-400">1</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">__len__</span>(self):
        <span class="text-violet-400">return</span> len(self.data)


<span class="text-zinc-500"># Uso</span>
arr = <span class="text-emerald-400">DynamicArray</span>()
arr.push(<span class="text-emerald-400">12</span>)
arr.push(<span class="text-emerald-400">45</span>)
arr.push(<span class="text-emerald-400">7</span>)
arr.insert_at(<span class="text-emerald-400">1</span>, <span class="text-emerald-400">99</span>)  <span class="text-zinc-500"># [12, 99, 45, 7]</span>
arr.remove_at(<span class="text-emerald-400">2</span>)        <span class="text-zinc-500"># [12, 99, 7]</span>
arr.search(<span class="text-emerald-400">99</span>)           <span class="text-zinc-500"># 1</span>`
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