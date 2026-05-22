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
        filename: 'deque.ts',
        code: `<span class="text-zinc-500">// Deque em TypeScript</span>
<span class="text-zinc-500">// Implementado com Doubly Linked List para O(1) em ambas as extremidades</span>

<span class="text-violet-400">class</span> <span class="text-emerald-400">DequeNode</span>&lt;T&gt; {
  value: T
  prev: <span class="text-emerald-400">DequeNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  next: <span class="text-emerald-400">DequeNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">constructor</span>(value: T) { <span class="text-violet-400">this</span>.value = value }
}

<span class="text-violet-400">class</span> <span class="text-emerald-400">Deque</span>&lt;T&gt; {
  <span class="text-violet-400">private</span> front: <span class="text-emerald-400">DequeNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">private</span> back: <span class="text-emerald-400">DequeNode</span>&lt;T&gt; | <span class="text-amber-400">null</span> = <span class="text-amber-400">null</span>
  <span class="text-violet-400">private</span> size: <span class="text-amber-400">number</span> = <span class="text-emerald-400">0</span>

  <span class="text-zinc-500">// O(1)</span>
  pushFront(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> node = <span class="text-violet-400">new</span> <span class="text-emerald-400">DequeNode</span>(value)
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.front) {
      <span class="text-violet-400">this</span>.front = <span class="text-violet-400">this</span>.back = node
    } <span class="text-violet-400">else</span> {
      node.next = <span class="text-violet-400">this</span>.front
      <span class="text-violet-400">this</span>.front.prev = node
      <span class="text-violet-400">this</span>.front = node
    }
    <span class="text-violet-400">this</span>.size++
  }

  <span class="text-zinc-500">// O(1)</span>
  pushBack(value: T): <span class="text-amber-400">void</span> {
    <span class="text-violet-400">const</span> node = <span class="text-violet-400">new</span> <span class="text-emerald-400">DequeNode</span>(value)
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.back) {
      <span class="text-violet-400">this</span>.front = <span class="text-violet-400">this</span>.back = node
    } <span class="text-violet-400">else</span> {
      node.prev = <span class="text-violet-400">this</span>.back
      <span class="text-violet-400">this</span>.back.next = node
      <span class="text-violet-400">this</span>.back = node
    }
    <span class="text-violet-400">this</span>.size++
  }

  <span class="text-zinc-500">// O(1)</span>
  popFront(): T | <span class="text-amber-400">null</span> {
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.front) <span class="text-violet-400">return</span> <span class="text-amber-400">null</span>
    <span class="text-violet-400">const</span> val = <span class="text-violet-400">this</span>.front.value
    <span class="text-violet-400">this</span>.front = <span class="text-violet-400">this</span>.front.next
    <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.front) <span class="text-violet-400">this</span>.front.prev = <span class="text-amber-400">null</span>
    <span class="text-violet-400">else</span> <span class="text-violet-400">this</span>.back = <span class="text-amber-400">null</span>
    <span class="text-violet-400">this</span>.size--
    <span class="text-violet-400">return</span> val
  }

  <span class="text-zinc-500">// O(1)</span>
  popBack(): T | <span class="text-amber-400">null</span> {
    <span class="text-violet-400">if</span> (!<span class="text-violet-400">this</span>.back) <span class="text-violet-400">return</span> <span class="text-amber-400">null</span>
    <span class="text-violet-400">const</span> val = <span class="text-violet-400">this</span>.back.value
    <span class="text-violet-400">this</span>.back = <span class="text-violet-400">this</span>.back.prev
    <span class="text-violet-400">if</span> (<span class="text-violet-400">this</span>.back) <span class="text-violet-400">this</span>.back.next = <span class="text-amber-400">null</span>
    <span class="text-violet-400">else</span> <span class="text-violet-400">this</span>.front = <span class="text-amber-400">null</span>
    <span class="text-violet-400">this</span>.size--
    <span class="text-violet-400">return</span> val
  }

  peekFront(): T | <span class="text-amber-400">null</span> { <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.front?.value ?? <span class="text-amber-400">null</span> }
  peekBack(): T | <span class="text-amber-400">null</span>  { <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.back?.value ?? <span class="text-amber-400">null</span>  }
  isEmpty(): <span class="text-amber-400">boolean</span>    { <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.size === <span class="text-emerald-400">0</span>         }
  <span class="text-violet-400">get</span> length()         { <span class="text-violet-400">return</span> <span class="text-violet-400">this</span>.size                    }
}

<span class="text-zinc-500">// Uso</span>
<span class="text-violet-400">const</span> dq = <span class="text-violet-400">new</span> <span class="text-emerald-400">Deque</span>&lt;<span class="text-amber-400">number</span>&gt;()
dq.pushBack(<span class="text-emerald-400">1</span>)
dq.pushBack(<span class="text-emerald-400">2</span>)
dq.pushFront(<span class="text-emerald-400">0</span>)   <span class="text-zinc-500">// [0, 1, 2]</span>
dq.popFront()       <span class="text-zinc-500">// 0 → [1, 2]</span>
dq.popBack()        <span class="text-zinc-500">// 2 → [1]</span>`
    },
    python: {
        filename: 'deque.py',
        code: `<span class="text-zinc-500"># Deque em Python</span>
<span class="text-zinc-500"># collections.deque é a implementação nativa otimizada</span>

<span class="text-violet-400">from</span> collections <span class="text-violet-400">import</span> deque

<span class="text-violet-400">class</span> <span class="text-emerald-400">Deque</span>:
    <span class="text-violet-400">def</span> <span class="text-emerald-400">__init__</span>(self):
        self.data = <span class="text-emerald-400">deque</span>()

    <span class="text-zinc-500"># O(1)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">push_front</span>(self, value):
        self.data.<span class="text-emerald-400">appendleft</span>(value)

    <span class="text-zinc-500"># O(1)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">push_back</span>(self, value):
        self.data.<span class="text-emerald-400">append</span>(value)

    <span class="text-zinc-500"># O(1)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">pop_front</span>(self):
        <span class="text-violet-400">if not</span> self.data:
            <span class="text-violet-400">return None</span>
        <span class="text-violet-400">return</span> self.data.<span class="text-emerald-400">popleft</span>()

    <span class="text-zinc-500"># O(1)</span>
    <span class="text-violet-400">def</span> <span class="text-emerald-400">pop_back</span>(self):
        <span class="text-violet-400">if not</span> self.data:
            <span class="text-violet-400">return None</span>
        <span class="text-violet-400">return</span> self.data.<span class="text-emerald-400">pop</span>()

    <span class="text-violet-400">def</span> <span class="text-emerald-400">peek_front</span>(self):
        <span class="text-violet-400">return</span> self.data[<span class="text-emerald-400">0</span>] <span class="text-violet-400">if</span> self.data <span class="text-violet-400">else None</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">peek_back</span>(self):
        <span class="text-violet-400">return</span> self.data[-<span class="text-emerald-400">1</span>] <span class="text-violet-400">if</span> self.data <span class="text-violet-400">else None</span>

    <span class="text-violet-400">def</span> <span class="text-emerald-400">is_empty</span>(self) -> <span class="text-amber-400">bool</span>:
        <span class="text-violet-400">return</span> len(self.data) == <span class="text-emerald-400">0</span>


<span class="text-zinc-500"># Uso</span>
dq = <span class="text-emerald-400">Deque</span>()
dq.<span class="text-emerald-400">push_back</span>(<span class="text-emerald-400">1</span>)
dq.<span class="text-emerald-400">push_back</span>(<span class="text-emerald-400">2</span>)
dq.<span class="text-emerald-400">push_front</span>(<span class="text-emerald-400">0</span>)   <span class="text-zinc-500"># [0, 1, 2]</span>
dq.<span class="text-emerald-400">pop_front</span>()        <span class="text-zinc-500"># 0 → [1, 2]</span>
dq.<span class="text-emerald-400">pop_back</span>()         <span class="text-zinc-500"># 2 → [1]</span>`
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