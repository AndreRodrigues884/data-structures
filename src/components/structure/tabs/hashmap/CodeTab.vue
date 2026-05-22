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
        filename: 'hashmap.ts',
        code: `<span class="text-zinc-500">// HashMap em TypeScript</span>
<span class="text-zinc-500">// Implementado com chaining para resolver colisões</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">HashMap</span>&lt;V&gt; {
  <span class="text-violet-400">private</span> buckets: Array&lt;Array&lt;[<span class="text-amber-400">string</span>, V]&gt;&gt;
  <span class="text-violet-400">private</span> size: <span class="text-amber-400">number</span>
  <span class="text-violet-400">private</span> count: <span class="text-amber-400">number</span> = <span class="text-emerald-400">0</span>

  <span class="text-violet-400">constructor</span>(size: <span class="text-amber-400">number</span> = <span class="text-emerald-400">53</span>) {
    <span class="text-violet-400">this</span>.size = size
    <span class="text-violet-400">this</span>.buckets = Array.from({ length: size }, () => [])
  }

  <span class="text-violet-400">private</span> hash(key: <span class="text-amber-400">string</span>): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">let</span> h = <span class="text-emerald-400">0</span>
    <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> char <span class="text-violet-400">of</span> key)
      h = (h * <span class="text-emerald-400">31</span> + char.<span class="text-emerald-400">charCodeAt</span>(<span class="text-emerald-400">0</span>)) % <span class="text-violet-400">this</span>.size
    <span class="text-violet-400">return</span> h
  }

  <span class="text-zinc-500">// O(1) médio</span>
  set(key: <span class="text-amber-400">string</span>, value: V): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> idx = <span class="text-violet-400">this</span>.<span class="text-emerald-400">hash</span>(key)
    <span class="text-violet-400">const</span> bucket = <span class="text-violet-400">this</span>.buckets[idx]!
    <span class="text-violet-400">const</span> existing = bucket.<span class="text-emerald-400">findIndex</span>(([k]) => k === key)
    <span class="text-violet-400">if</span> (existing >= <span class="text-emerald-400">0</span>) {
      bucket[existing] = [key, value]
    } <span class="text-violet-400">else</span> {
      bucket.<span class="text-emerald-400">push</span>([key, value])
      <span class="text-violet-400">this</span>.count++
    }
  }

  <span class="text-zinc-500">// O(1) médio</span>
  get(key: <span class="text-amber-400">string</span>): V | <span class="text-amber-400">undefined</span> {
    <span class="text-violet-400">const</span> bucket = <span class="text-violet-400">this</span>.buckets[<span class="text-violet-400">this</span>.<span class="text-emerald-400">hash</span>(key)]!
    <span class="text-violet-400">return</span> bucket.<span class="text-emerald-400">find</span>(([k]) => k === key)?.[<span class="text-emerald-400">1</span>]
  }

  <span class="text-zinc-500">// O(1) médio</span>
  delete(key: <span class="text-amber-400">string</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">const</span> bucket = <span class="text-violet-400">this</span>.buckets[<span class="text-violet-400">this</span>.<span class="text-emerald-400">hash</span>(key)]!
    <span class="text-violet-400">const</span> idx = bucket.<span class="text-emerald-400">findIndex</span>(([k]) => k === key)
    <span class="text-violet-400">if</span> (idx < <span class="text-emerald-400">0</span>) <span class="text-violet-400">return false</span>
    bucket.<span class="text-emerald-400">splice</span>(idx, <span class="text-emerald-400">1</span>)
    <span class="text-violet-400">this</span>.count--
    <span class="text-violet-400">return true</span>
  }

  has(key: <span class="text-amber-400">string</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.<span class="text-emerald-400">get</span>(key) !== <span class="text-amber-400">undefined</span>
  }

  <span class="text-violet-400">get</span> length() { <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.count }
}

<span class="text-zinc-500">// Padrão — Two Sum em O(n)</span>
<span class="text-violet-400">function</span> <span class="text-emerald-400">twoSum</span>(nums: <span class="text-amber-400">number</span>[], target: <span class="text-amber-400">number</span>): <span class="text-amber-400">number</span>[] {
  <span class="text-violet-400">const</span> seen = <span class="text-violet-400">new</span> Map&lt;<span class="text-amber-400">number</span>, <span class="text-amber-400">number</span>&gt;()
  <span class="text-violet-400">for</span> (<span class="text-violet-400">let</span> i = <span class="text-emerald-400">0</span>; i &lt; nums.length; i++) {
    <span class="text-violet-400">const</span> complement = target - nums[i]!
    <span class="text-violet-400">if</span> (seen.<span class="text-emerald-400">has</span>(complement)) <span class="text-violet-400">return</span> [seen.<span class="text-emerald-400">get</span>(complement)!, i]
    seen.<span class="text-emerald-400">set</span>(nums[i]!, i)
  }
  <span class="text-violet-400">return</span> []
}

<span class="text-emerald-400">twoSum</span>([<span class="text-emerald-400">2</span>, <span class="text-emerald-400">7</span>, <span class="text-emerald-400">11</span>, <span class="text-emerald-400">15</span>], <span class="text-emerald-400">9</span>) <span class="text-zinc-500">// [0, 1]</span>`
    },
    python: {
        filename: 'hashmap.py',
        code: `<span class="text-zinc-500"># HashMap em Python</span>
<span class="text-zinc-500"># Python dict é um HashMap nativo altamente otimizado</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">HashMap</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self, size=<span class="text-emerald-400">53</span>):
        self.size = size
        self.buckets = [[] <span class="text-violet-400">for</span> _ <span class="text-violet-400">in</span> range(size)]

    <span class="text-violet-400">def</span> <span class="text-emerald-400">_hash</span>(self, key: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">int</span>:
        h = <span class="text-emerald-400">0</span>
        <span class="text-violet-400">for</span> char <span class="text-violet-400">in</span> key:
            h = (h * <span class="text-emerald-400">31</span> + <span class="text-emerald-400">ord</span>(char)) % self.size
        <span class="text-violet-400">return</span> h

    <span class="text-zinc-500"># O(1) médio</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">set</span>(self, key: <span class="text-amber-400">str</span>, value):
        idx = self.<span class="text-emerald-400">_hash</span>(key)
        <span class="text-violet-400">for</span> pair <span class="text-violet-400">in</span> self.buckets[idx]:
            <span class="text-violet-400">if</span> pair[<span class="text-emerald-400">0</span>] == key:
                pair[<span class="text-emerald-400">1</span>] = value
                <span class="text-violet-400">return</span>
        self.buckets[idx].<span class="text-emerald-400">append</span>([key, value])

    <span class="text-zinc-500"># O(1) médio</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">get</span>(self, key: <span class="text-amber-400">str</span>):
        <span class="text-violet-400">for</span> pair <span class="text-violet-400">in</span> self.buckets[self.<span class="text-emerald-400">_hash</span>(key)]:
            <span class="text-violet-400">if</span> pair[<span class="text-emerald-400">0</span>] == key:
                <span class="text-violet-400">return</span> pair[<span class="text-emerald-400">1</span>]
        <span class="text-violet-400">return None</span>

    <span class="text-zinc-500"># O(1) médio</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">delete</span>(self, key: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">bool</span>:
        idx = self.<span class="text-emerald-400">_hash</span>(key)
        <span class="text-violet-400">for</span> i, pair <span class="text-violet-400">in</span> <span class="text-emerald-400">enumerate</span>(self.buckets[idx]):
            <span class="text-violet-400">if</span> pair[<span class="text-emerald-400">0</span>] == key:
                self.buckets[idx].<span class="text-emerald-400">pop</span>(i)
                <span class="text-violet-400">return True</span>
        <span class="text-violet-400">return False</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">has</span>(self, key: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">bool</span>:
        <span class="text-violet-400">return</span> self.<span class="text-emerald-400">get</span>(key) <span class="text-violet-400">is not None</span>


<span class="text-zinc-500"># Padrão — Two Sum em O(n)</span>
<span class="text-violet-400">def</span> <span class="text-emerald-400">two_sum</span>(nums: <span class="text-amber-400">list</span>, target: <span class="text-amber-400">int</span>) -> <span class="text-amber-400">list</span>:
    seen = {}
    <span class="text-violet-400">for</span> i, num <span class="text-violet-400">in</span> <span class="text-emerald-400">enumerate</span>(nums):
        complement = target - num
        <span class="text-violet-400">if</span> complement <span class="text-violet-400">in</span> seen:
            <span class="text-violet-400">return</span> [seen[complement], i]
        seen[num] = i
    <span class="text-violet-400">return</span> []

<span class="text-emerald-400">two_sum</span>([<span class="text-emerald-400">2</span>, <span class="text-emerald-400">7</span>, <span class="text-emerald-400">11</span>, <span class="text-emerald-400">15</span>], <span class="text-emerald-400">9</span>)  <span class="text-zinc-500"># [0, 1]</span>`
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