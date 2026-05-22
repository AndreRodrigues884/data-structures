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
      <pre class="p-5 overflow-x-auto font-mono text-sm leading-relaxed text-zinc-300" v-html="activeLanguage?.code" />
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
    filename: 'stack.ts',
    code: `<span class="text-zinc-500">// Stack em TypeScript</span>
<span class="text-zinc-500">// Implementada com array interno</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">Stack</span>&lt;T&gt; {
  <span class="text-violet-400">private</span> data: T[] = []

  <span class="text-zinc-500">// O(1) — adiciona no topo</span>
  push(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">this</span>.data.push(value)
  }

  <span class="text-zinc-500">// O(1) — remove e devolve o topo</span>
  pop(): T | <span class="text-amber-400">undefined</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data.pop()
  }

  <span class="text-zinc-500">// O(1) — lê o topo sem remover</span>
  peek(): T | <span class="text-amber-400">undefined</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data[<span class="text-violet-400">this</span>.data.length - <span class="text-emerald-400">1</span>]
  }

  <span class="text-zinc-500">// O(1) — verifica se está vazia</span>
  isEmpty(): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data.length === <span class="text-emerald-400">0</span>
  }

  <span class="text-violet-400">get</span> size(): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.data.length
  }
}

<span class="text-zinc-500">// Caso de uso — validar parênteses</span>
<span class="text-violet-400">function</span> <span class="text-emerald-400">isBalanced</span>(expr: <span class="text-amber-400">string</span>): <span class="text-amber-400">boolean</span> {
  <span class="text-violet-400">const</span> stack = <span class="text-violet-400">new</span> <span class="text-emerald-400">Stack</span>&lt;<span class="text-amber-400">string</span>&gt;()
  <span class="text-violet-400">const</span> pairs: Record&lt;<span class="text-amber-400">string</span>, <span class="text-amber-400">string</span>&gt; = {
    <span class="text-emerald-400">')'</span>: <span class="text-emerald-400">'('</span>,
    <span class="text-emerald-400">']'</span>: <span class="text-emerald-400">'['</span>,
    <span class="text-emerald-400">'}'</span>: <span class="text-emerald-400">'{'</span>
  }

  <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> char <span class="text-violet-400">of</span> expr) {
    <span class="text-violet-400">if</span> (<span class="text-emerald-400">'([{'</span>.includes(char)) {
      stack.push(char)
    } <span class="text-violet-400">else if</span> (pairs[char]) {
      <span class="text-violet-400">if</span> (stack.peek() !== pairs[char]) <span class="text-violet-400">return false</span>
      stack.pop()
    }
  }
  <span class="text-violet-400">return</span> stack.isEmpty()
}

<span class="text-emerald-400">isBalanced</span>(<span class="text-emerald-400">'([{}])'</span>)  <span class="text-zinc-500">// true</span>
<span class="text-emerald-400">isBalanced</span>(<span class="text-emerald-400">'([)]'</span>)    <span class="text-zinc-500">// false</span>`
  },
  python: {
    filename: 'stack.py',
    code: `<span class="text-zinc-500"># Stack em Python</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">Stack</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.data = []

    <span class="text-zinc-500"># O(1) — adiciona no topo</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">push</span>(self, value):
        self.data.append(value)

    <span class="text-zinc-500"># O(1) — remove e devolve o topo</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">pop</span>(self):
        <span class="text-violet-400">if</span> self.<span class="text-emerald-400">is_empty</span>():
            <span class="text-violet-400">return None</span>
        <span class="text-violet-400">return</span> self.data.pop()

    <span class="text-zinc-500"># O(1) — lê o topo sem remover</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">peek</span>(self):
        <span class="text-violet-400">if</span> self.<span class="text-emerald-400">is_empty</span>():
            <span class="text-violet-400">return None</span>
        <span class="text-violet-400">return</span> self.data[-<span class="text-emerald-400">1</span>]

    <span class="text-zinc-500"># O(1) — verifica se está vazia</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">is_empty</span>(self) -> <span class="text-amber-400">bool</span>:
        <span class="text-violet-400">return</span> len(self.data) == <span class="text-emerald-400">0</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">__len__</span>(self):
        <span class="text-violet-400">return</span> len(self.data)


<span class="text-zinc-500"># Caso de uso — validar parênteses</span>
<span class="text-violet-400">def</span> <span class="text-emerald-400">is_balanced</span>(expr: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">bool</span>:
    stack = <span class="text-emerald-400">Stack</span>()
    pairs = {<span class="text-emerald-400">')'</span>: <span class="text-emerald-400">'('</span>, <span class="text-emerald-400">']'</span>: <span class="text-emerald-400">'['</span>, <span class="text-emerald-400">'}'</span>: <span class="text-emerald-400">'{'</span>}

    <span class="text-violet-400">for</span> char <span class="text-violet-400">in</span> expr:
        <span class="text-violet-400">if</span> char <span class="text-violet-400">in</span> <span class="text-emerald-400">'([{'</span>:
            stack.<span class="text-emerald-400">push</span>(char)
        <span class="text-violet-400">elif</span> char <span class="text-violet-400">in</span> pairs:
            <span class="text-violet-400">if</span> stack.<span class="text-emerald-400">peek</span>() != pairs[char]:
                <span class="text-violet-400">return False</span>
            stack.<span class="text-emerald-400">pop</span>()

    <span class="text-violet-400">return</span> stack.<span class="text-emerald-400">is_empty</span>()


<span class="text-emerald-400">is_balanced</span>(<span class="text-emerald-400">'([{}])'</span>)  <span class="text-zinc-500"># True</span>
<span class="text-emerald-400">is_balanced</span>(<span class="text-emerald-400">'([)]'</span>)    <span class="text-zinc-500"># False</span>`
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