<template>
    <div class="max-w-3xl space-y-6">

        <!-- Language selector -->
        <div class="flex gap-1 border-b border-zinc-800">
            <button v-for="lang in languages" :key="lang.id" @click="activeLang = lang.id"
                class="font-mono text-sm px-4 py-2 border-b-2 -mb-px transition-colors" :class="activeLang === lang.id
                    ? 'text-violet-400 border-violet-400'
                    : 'text-zinc-500 border-transparent hover:text-zinc-300'">
                {{ lang.label }}
            </button>
        </div>

        <!-- Code block -->
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
        filename: 'linked-list.ts',
        code: `<span class="text-zinc-500">// Singly Linked List em TypeScript</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">ListNode</span>&lt;T&gt; {
  value: T
  next: <span class="text-emerald-400">ListNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>

  <span class="text-violet-400">constructor</span>(value: T) {
    <span class="text-violet-400">this</span>.value = value
  }
}

<span class="text-violet-400">class</span> <span class="text-emerald-400">LinkedList</span>&lt;T&gt; {
  <span class="text-violet-400">private</span> head: <span class="text-emerald-400">ListNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">private</span> tail: <span class="text-emerald-400">ListNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">private</span> size: <span class="text-amber-400">number</span> = <span class="text-emerald-400">0</span>

  <span class="text-zinc-500">// O(1) — inserção no início</span>
  prepend(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> node = <span class="text-violet-400">new</span> <span class="text-emerald-400">ListNode</span>(value)
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.head) {
      <span class="text-violet-400">this</span>.head = <span class="text-violet-400">this</span>.tail = node
    } <span class="text-violet-400">else</span> {
      node.next = <span class="text-violet-400">this</span>.head
      <span class="text-violet-400">this</span>.head = node
    }
    <span class="text-violet-400">this</span>.size++
  }

  <span class="text-zinc-500">// O(1) — inserção no fim (com tail pointer)</span>
  append(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> node = <span class="text-violet-400">new</span> <span class="text-emerald-400">ListNode</span>(value)
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.tail) {
      <span class="text-violet-400">this</span>.head = <span class="text-violet-400">this</span>.tail = node
    } <span class="text-violet-400">else</span> {
      <span class="text-violet-400">this</span>.tail.next = node
      <span class="text-violet-400">this</span>.tail = node
    }
    <span class="text-violet-400">this</span>.size++
  }

  <span class="text-zinc-500">// O(1) — remoção do início</span>
  removeHead(): T | <span class="text-amber-400">null</span> {
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.head) <span class="text-violet-400">return</span> <span class="text-amber-400">null</span>
    <span class="text-violet-400">const</span> val = <span class="text-violet-400">this</span>.head.value
    <span class="text-violet-400">this</span>.head = <span class="text-violet-400">this</span>.head.next
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.head) <span class="text-violet-400">this</span>.tail = <span class="text-amber-400">null</span>
    <span class="text-violet-400">this</span>.size--
    <span class="text-violet-400">return</span> val
  }

  <span class="text-zinc-500">// O(n) — pesquisa</span>
  search(value: T): <span class="text-amber-400">number</span> {
    <span class="text-violet-400">let</span> current = <span class="text-violet-400">this</span>.head
    <span class="text-violet-400">let</span> index = <span class="text-emerald-400">0</span>
    <span class="text-violet-400">while</span> (current) {
      <span class="text-violet-400">if</span> (current.value === value) <span class="text-violet-400">return</span> index
      current = current.next
      index++
    }
    <span class="text-violet-400">return</span> -<span class="text-emerald-400">1</span>
  }

  <span class="text-violet-400">get</span> length(): <span class="text-amber-400">number</span> { <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.size }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> ll = <span class="text-violet-400">new</span> <span class="text-emerald-400">LinkedList</span>&lt;<span class="text-amber-400">number</span>&gt;()
ll.append(<span class="text-emerald-400">12</span>)
ll.append(<span class="text-emerald-400">45</span>)
ll.prepend(<span class="text-emerald-400">99</span>)   <span class="text-zinc-500">// [99, 12, 45]</span>
ll.removeHead()    <span class="text-zinc-500">// [12, 45]</span>
ll.search(<span class="text-emerald-400">45</span>)    <span class="text-zinc-500">// 1</span>`
    },
    python: {
        filename: 'linked_list.py',
        code: `<span class="text-zinc-500"># Singly Linked List em Python</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">ListNode</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self, value):
        self.value = value
        self.next = <span class="text-amber-400">None</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">LinkedList</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.head = <span class="text-amber-400">None</span>
        self.tail = <span class="text-amber-400">None</span>
        self.size = <span class="text-emerald-400">0</span>

    <span class="text-zinc-500"># O(1) — inserção no início</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">prepend</span>(self, value):
        node = <span class="text-emerald-400">ListNode</span>(value)
        <span class="text-violet-400">if not</span> self.head:
            self.head = self.tail = node
        <span class="text-violet-400">else</span>:
            node.next = self.head
            self.head = node
        self.size += <span class="text-emerald-400">1</span>

    <span class="text-zinc-500"># O(1) — inserção no fim (com tail pointer)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">append</span>(self, value):
        node = <span class="text-emerald-400">ListNode</span>(value)
        <span class="text-violet-400">if not</span> self.tail:
            self.head = self.tail = node
        <span class="text-violet-400">else</span>:
            self.tail.next = node
            self.tail = node
        self.size += <span class="text-emerald-400">1</span>

    <span class="text-zinc-500"># O(1) — remoção do início</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">remove_head</span>(self):
        <span class="text-violet-400">if not</span> self.head:
            <span class="text-violet-400">return None</span>
        val = self.head.value
        self.head = self.head.next
        <span class="text-violet-400">if not</span> self.head:
            self.tail = <span class="text-amber-400">None</span>
        self.size -= <span class="text-emerald-400">1</span>
        <span class="text-violet-400">return</span> val

    <span class="text-zinc-500"># O(n) — pesquisa</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">search</span>(self, value) -> <span class="text-amber-400">int</span>:
        current = self.head
        index = <span class="text-emerald-400">0</span>
        <span class="text-violet-400">while</span> current:
            <span class="text-violet-400">if</span> current.value == value:
                <span class="text-violet-400">return</span> index
            current = current.next
            index += <span class="text-emerald-400">1</span>
        <span class="text-violet-400">return</span> -<span class="text-emerald-400">1</span>

<span class="text-zinc-500"># Uso</span>
ll = <span class="text-emerald-400">LinkedList</span>()
ll.append(<span class="text-emerald-400">12</span>)
ll.append(<span class="text-emerald-400">45</span>)
ll.prepend(<span class="text-emerald-400">99</span>)    <span class="text-zinc-500"># [99, 12, 45]</span>
ll.remove_head()     <span class="text-zinc-500"># [12, 45]</span>
ll.search(<span class="text-emerald-400">45</span>)     <span class="text-zinc-500"># 1</span>`
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