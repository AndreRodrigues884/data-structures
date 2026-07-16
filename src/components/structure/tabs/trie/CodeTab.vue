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
        filename: 'trie.ts',
        code: `<span class="text-zinc-500">// Trie (Prefix Tree) em TypeScript</span>
<span class="text-zinc-500">// insert/search/startsWith/delete → O(m), m = tamanho da palavra</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">TrieNode</span> {
  children: <span class="text-amber-400">Map</span>&lt;<span class="text-amber-400">string</span>, <span class="text-emerald-400">TrieNode</span>&gt; = <span class="text-violet-400">new</span> <span class="text-amber-400">Map</span>()
  isEndOfWord = <span class="text-violet-400">false</span>
}

<span class="text-violet-400">class</span> <span class="text-emerald-400">Trie</span> {
  <span class="text-violet-400">private</span> root = <span class="text-violet-400">new</span> <span class="text-emerald-400">TrieNode</span>()

  <span class="text-zinc-500">// O(m) — insere uma palavra</span>
  insert(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">let</span> node = <span class="text-violet-400">this</span>.root
    <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> ch <span class="text-violet-400">of</span> word) {
      <span class="text-violet-400">if</span> (!node.children.<span class="text-emerald-400">has</span>(ch)) {
        node.children.<span class="text-emerald-400">set</span>(ch, <span class="text-violet-400">new</span> <span class="text-emerald-400">TrieNode</span>())
      }
      node = node.children.<span class="text-emerald-400">get</span>(ch)!
    }
    node.isEndOfWord = <span class="text-violet-400">true</span>
  }

  <span class="text-zinc-500">// O(m) — verifica se a palavra exata existe</span>
  search(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">const</span> node = <span class="text-violet-400">this</span>.<span class="text-emerald-400">walk</span>(word)
    <span class="text-violet-400">return</span> node !== <span class="text-violet-400">null</span> && node.isEndOfWord
  }

  <span class="text-zinc-500">// O(m) — verifica se algum prefixo existe</span>
  startsWith(prefix: <span class="text-amber-400">string</span>): <span class="text-amber-400">boolean</span> {
    <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.<span class="text-emerald-400">walk</span>(prefix) !== <span class="text-violet-400">null</span>
  }

  <span class="text-zinc-500">// O(m) — percorre os nós de uma string, devolve null se não existir caminho</span>
  <span class="text-violet-400">private</span> walk(str: <span class="text-amber-400">string</span>): <span class="text-emerald-400">TrieNode</span> | <span class="text-violet-400">null</span> {
    <span class="text-violet-400">let</span> node = <span class="text-violet-400">this</span>.root
    <span class="text-violet-400">for</span> (<span class="text-violet-400">const</span> ch <span class="text-violet-400">of</span> str) {
      <span class="text-violet-400">const</span> next = node.children.<span class="text-emerald-400">get</span>(ch)
      <span class="text-violet-400">if</span> (!next) <span class="text-violet-400">return null</span>
      node = next
    }
    <span class="text-violet-400">return</span> node
  }

  <span class="text-zinc-500">// O(m) — remove uma palavra e limpa nós órfãos</span>
  delete(word: <span class="text-amber-400">string</span>): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> <span class="text-emerald-400">dfs</span> = (node: <span class="text-emerald-400">TrieNode</span>, i: <span class="text-amber-400">number</span>): <span class="text-amber-400">boolean</span> => {
      <span class="text-violet-400">if</span> (i === word.length) {
        <span class="text-violet-400">if</span> (!node.isEndOfWord) <span class="text-violet-400">return false</span>
        node.isEndOfWord = <span class="text-violet-400">false</span>
        <span class="text-violet-400">return</span> node.children.size === <span class="text-emerald-400">0</span>
      }
      <span class="text-violet-400">const</span> ch = word[i]!
      <span class="text-violet-400">const</span> child = node.children.<span class="text-emerald-400">get</span>(ch)
      <span class="text-violet-400">if</span> (!child) <span class="text-violet-400">return false</span>

      <span class="text-violet-400">const</span> shouldPrune = <span class="text-emerald-400">dfs</span>(child, i + <span class="text-emerald-400">1</span>)
      <span class="text-violet-400">if</span> (shouldPrune) node.children.<span class="text-emerald-400">delete</span>(ch)
      <span class="text-violet-400">return</span> node.children.size === <span class="text-emerald-400">0</span> && !node.isEndOfWord
    }
    <span class="text-emerald-400">dfs</span>(<span class="text-violet-400">this</span>.root, <span class="text-emerald-400">0</span>)
  }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> trie = <span class="text-violet-400">new</span> <span class="text-emerald-400">Trie</span>()
trie.<span class="text-emerald-400">insert</span>(<span class="text-amber-400">'car'</span>)
trie.<span class="text-emerald-400">insert</span>(<span class="text-amber-400">'card'</span>)
trie.<span class="text-emerald-400">insert</span>(<span class="text-amber-400">'cat'</span>)

trie.<span class="text-emerald-400">search</span>(<span class="text-amber-400">'car'</span>)       <span class="text-zinc-500">// true</span>
trie.<span class="text-emerald-400">search</span>(<span class="text-amber-400">'ca'</span>)        <span class="text-zinc-500">// false — não é fim de palavra</span>
trie.<span class="text-emerald-400">startsWith</span>(<span class="text-amber-400">'ca'</span>)    <span class="text-zinc-500">// true  — "car" e "cat" começam por "ca"</span>
trie.<span class="text-emerald-400">delete</span>(<span class="text-amber-400">'car'</span>)
trie.<span class="text-emerald-400">search</span>(<span class="text-amber-400">'car'</span>)       <span class="text-zinc-500">// false</span>
trie.<span class="text-emerald-400">search</span>(<span class="text-amber-400">'card'</span>)      <span class="text-zinc-500">// true  — "card" mantém-se</span>`
    },
    python: {
        filename: 'trie.py',
        code: `<span class="text-zinc-500"># Trie (Prefix Tree) em Python</span>
<span class="text-zinc-500"># insert/search/starts_with/delete → O(m), m = tamanho da palavra</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">TrieNode</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.children: <span class="text-amber-400">dict</span>[<span class="text-amber-400">str</span>, <span class="text-amber-400">'TrieNode'</span>] = {}
        self.is_end_of_word = <span class="text-violet-400">False</span>


<span class="text-violet-400">class</span> <span class="text-emerald-400">Trie</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.root = <span class="text-emerald-400">TrieNode</span>()

    <span class="text-zinc-500"># O(m) — insere uma palavra</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">insert</span>(self, word: <span class="text-amber-400">str</span>) -> <span class="text-violet-400">None</span>:
        node = self.root
        <span class="text-violet-400">for</span> ch <span class="text-violet-400">in</span> word:
            <span class="text-violet-400">if</span> ch <span class="text-violet-400">not in</span> node.children:
                node.children[ch] = <span class="text-emerald-400">TrieNode</span>()
            node = node.children[ch]
        node.is_end_of_word = <span class="text-violet-400">True</span>

    <span class="text-zinc-500"># O(m) — verifica se a palavra exata existe</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">search</span>(self, word: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">bool</span>:
        node = self.<span class="text-emerald-400">_walk</span>(word)
        <span class="text-violet-400">return</span> node <span class="text-violet-400">is not None</span> <span class="text-violet-400">and</span> node.is_end_of_word

    <span class="text-zinc-500"># O(m) — verifica se algum prefixo existe</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">starts_with</span>(self, prefix: <span class="text-amber-400">str</span>) -> <span class="text-amber-400">bool</span>:
        <span class="text-violet-400">return</span> self.<span class="text-emerald-400">_walk</span>(prefix) <span class="text-violet-400">is not None</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">_walk</span>(self, s: <span class="text-amber-400">str</span>):
        node = self.root
        <span class="text-violet-400">for</span> ch <span class="text-violet-400">in</span> s:
            <span class="text-violet-400">if</span> ch <span class="text-violet-400">not in</span> node.children:
                <span class="text-violet-400">return None</span>
            node = node.children[ch]
        <span class="text-violet-400">return</span> node

    <span class="text-zinc-500"># O(m) — remove uma palavra e limpa nós órfãos</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">delete</span>(self, word: <span class="text-amber-400">str</span>) -> <span class="text-violet-400">None</span>:
        <span class="text-violet-400">def</span> <span class="text-emerald-400">dfs</span>(node: <span class="text-emerald-400">TrieNode</span>, i: <span class="text-amber-400">int</span>) -> <span class="text-amber-400">bool</span>:
            <span class="text-violet-400">if</span> i == <span class="text-emerald-400">len</span>(word):
                <span class="text-violet-400">if not</span> node.is_end_of_word:
                    <span class="text-violet-400">return False</span>
                node.is_end_of_word = <span class="text-violet-400">False</span>
                <span class="text-violet-400">return len</span>(node.children) == <span class="text-emerald-400">0</span>

            ch = word[i]
            child = node.children.<span class="text-emerald-400">get</span>(ch)
            <span class="text-violet-400">if not</span> child:
                <span class="text-violet-400">return False</span>

            should_prune = <span class="text-emerald-400">dfs</span>(child, i + <span class="text-emerald-400">1</span>)
            <span class="text-violet-400">if</span> should_prune:
                <span class="text-violet-400">del</span> node.children[ch]
            <span class="text-violet-400">return len</span>(node.children) == <span class="text-emerald-400">0</span> <span class="text-violet-400">and not</span> node.is_end_of_word

        <span class="text-emerald-400">dfs</span>(self.root, <span class="text-emerald-400">0</span>)


<span class="text-zinc-500"># Uso</span>
trie = <span class="text-emerald-400">Trie</span>()
trie.<span class="text-emerald-400">insert</span>(<span class="text-amber-400">'car'</span>)
trie.<span class="text-emerald-400">insert</span>(<span class="text-amber-400">'card'</span>)
trie.<span class="text-emerald-400">insert</span>(<span class="text-amber-400">'cat'</span>)

trie.<span class="text-emerald-400">search</span>(<span class="text-amber-400">'car'</span>)        <span class="text-zinc-500"># True</span>
trie.<span class="text-emerald-400">search</span>(<span class="text-amber-400">'ca'</span>)         <span class="text-zinc-500"># False</span>
trie.<span class="text-emerald-400">starts_with</span>(<span class="text-amber-400">'ca'</span>)    <span class="text-zinc-500"># True</span>
trie.<span class="text-emerald-400">delete</span>(<span class="text-amber-400">'car'</span>)
trie.<span class="text-emerald-400">search</span>(<span class="text-amber-400">'card'</span>)       <span class="text-zinc-500"># True  — "card" mantém-se</span>`
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