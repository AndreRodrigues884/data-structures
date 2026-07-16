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
        filename: 'bloom-filter.ts',
        code: `<span class="text-zinc-500">// Bloom Filter em TypeScript</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">BloomFilter</span> {
  <span class="text-violet-400">private</span> bits: <span class="text-amber-400">number</span>[]
  <span class="text-violet-400">private</span> size: <span class="text-amber-400">number</span>

  <span class="text-violet-400">constructor</span>(size: <span class="text-amber-400">number</span> = <span class="text-emerald-400">64</span>) {
    <span class="text-violet-400">this</span>.size = size
    <span class="text-violet-400">this</span>.bits = <span class="text-violet-400">new</span> Array(size).<span class="text-emerald-400">fill</span>(<span class="text-emerald-400">0</span>)
  }

  <span class="text-violet-400">private</span> hash1(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">let</span> h = <span class="text-emerald-400">0</span>
    <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> c <span class="text-violet-400">of</span> word)
      h = (h * <span class="text-emerald-400">31</span> + c.<span class="text-emerald-400">charCodeAt</span>(<span class="text-emerald-400">0</span>)) % <span class="text-violet-400">this</span>.size
    <span class="text-violet-400">return</span> h
  }

  <span class="text-violet-400">private</span> hash2(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">let</span> h = <span class="text-emerald-400">5381</span>
    <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> c <span class="text-violet-400">of</span> word)
      h = ((h << <span class="text-emerald-400">5</span>) + h + c.<span class="text-emerald-400">charCodeAt</span>(<span class="text-emerald-400">0</span>)) % <span class="text-violet-400">this</span>.size
    <span class="text-violet-400">return</span> Math.<span class="text-emerald-400">abs</span>(h)
  }

  <span class="text-violet-400">private</span> hash3(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">let</span> h = <span class="text-emerald-400">0</span>
    <span class="text-violet-400">for</span> (<span class="text-violet-400">let</span> i = <span class="text-emerald-400">0</span>; i < word.length; i++)
      h = (h + word.<span class="text-emerald-400">charCodeAt</span>(i) * (i + <span class="text-emerald-400">1</span>)) % <span class="text-violet-400">this</span>.size
    <span class="text-violet-400">return</span> h
  }

  <span class="text-violet-400">private</span> getHashes(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">number</span>[] {
    <span class="text-violet-400">return</span> [
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">hash1</span>(word),
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">hash2</span>(word),
      <span class="text-violet-400">this</span>.<span class="text-emerald-400">hash3</span>(word),
    ]
  }

  <span class="text-zinc-500">// O(k) — insere elemento</span>
  add(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> h <span class="text-violet-400">of</span> <span class="text-violet-400">this</span>.<span class="text-emerald-400">getHashes</span>(word))
      <span class="text-violet-400">this</span>.bits[h] = <span class="text-emerald-400">1</span>
  }

  <span class="text-zinc-500">// O(k) — verifica se elemento pode estar no filtro</span>
  has(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.<span class="text-emerald-400">getHashes</span>(word)
      .<span class="text-emerald-400">every</span>(h => <span class="text-violet-400">this</span>.bits[h] === <span class="text-emerald-400">1</span>)
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> bf = <span class="text-violet-400">new</span> <span class="text-emerald-400">BloomFilter</span>(<span class="text-emerald-400">64</span>)
bf.<span class="text-emerald-400">add</span>(<span class="text-emerald-400">'hello'</span>)
bf.<span class="text-emerald-400">add</span>(<span class="text-emerald-400">'world'</span>)

bf.<span class="text-emerald-400">has</span>(<span class="text-emerald-400">'hello'</span>) <span class="text-zinc-500">// true  — verdadeiro positivo</span>
bf.<span class="text-emerald-400">has</span>(<span class="text-emerald-400">'foo'</span>)   <span class="text-zinc-500">// false — definitivamente não está</span>
bf.<span class="text-emerald-400">has</span>(<span class="text-emerald-400">'test'</span>)  <span class="text-zinc-500">// true  — pode ser falso positivo!</span>`
    },
    python: {
        filename: 'bloom_filter.py',
        code: `<span class="text-zinc-500"># Bloom Filter em Python</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">BloomFilter</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self, size=<span class="text-emerald-400">64</span>):
        self.size = size
        self.bits = [<span class="text-emerald-400">0</span>] * size

    <span class="text-violet-400">def</span> <span class="text-emerald-400">_hash1</span>(self, word: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">int</span>:
        h = <span class="text-emerald-400">0</span>
        <span class="text-violet-400">for</span> c <span class="text-violet-400">in</span> word:
            h = (h * <span class="text-emerald-400">31</span> + <span class="text-emerald-400">ord</span>(c)) % self.size
        <span class="text-violet-400">return</span> h

    <span class="text-violet-400">def</span> <span class="text-emerald-400">_hash2</span>(self, word: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">int</span>:
        h = <span class="text-emerald-400">5381</span>
        <span class="text-violet-400">for</span> c <span class="text-violet-400">in</span> word:
            h = ((h << <span class="text-emerald-400">5</span>) + h + <span class="text-emerald-400">ord</span>(c)) % self.size
        <span class="text-violet-400">return</span> <span class="text-emerald-400">abs</span>(h)

    <span class="text-violet-400">def</span> <span class="text-emerald-400">_hash3</span>(self, word: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">int</span>:
        <span class="text-violet-400">return</span> <span class="text-emerald-400">sum</span>(<span class="text-emerald-400">ord</span>(c) * (i + <span class="text-emerald-400">1</span>) <span class="text-violet-400">for</span> i, c <span class="text-violet-400">in</span> <span class="text-emerald-400">enumerate</span>(word)) % self.size

    <span class="text-violet-400">def</span> <span class="text-emerald-400">_hashes</span>(self, word):
        <span class="text-violet-400">return</span> [self.<span class="text-emerald-400">_hash1</span>(word), self.<span class="text-emerald-400">_hash2</span>(word), self.<span class="text-emerald-400">_hash3</span>(word)]

    <span class="text-zinc-500"># O(k)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">add</span>(self, word: <span class="text-amber-400">str</span>):
        <span class="text-violet-400">for</span> h <span class="text-violet-400">in</span> self.<span class="text-emerald-400">_hashes</span>(word):
            self.bits[h] = <span class="text-emerald-400">1</span>

    <span class="text-zinc-500"># O(k)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">has</span>(self, word: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">bool</span>:
        <span class="text-violet-400">return</span> <span class="text-emerald-400">all</span>(self.bits[h] == <span class="text-emerald-400">1</span> <span class="text-violet-400">for</span> h <span class="text-violet-400">in</span> self.<span class="text-emerald-400">_hashes</span>(word))


<span class="text-zinc-500"># Uso</span>
bf = <span class="text-emerald-400">BloomFilter</span>(<span class="text-emerald-400">64</span>)
bf.<span class="text-emerald-400">add</span>(<span class="text-emerald-400">'hello'</span>)
bf.<span class="text-emerald-400">add</span>(<span class="text-emerald-400">'world'</span>)

bf.<span class="text-emerald-400">has</span>(<span class="text-emerald-400">'hello'</span>) <span class="text-zinc-500"># True  — verdadeiro positivo</span>
bf.<span class="text-emerald-400">has</span>(<span class="text-emerald-400">'foo'</span>)   <span class="text-zinc-500"># False — definitivamente não está</span>
bf.<span class="text-emerald-400">has</span>(<span class="text-emerald-400">'test'</span>)  <span class="text-zinc-500"># True  — pode ser falso positivo!</span>`
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