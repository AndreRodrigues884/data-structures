<template>
  <aside class="fixed left-0 top-0 h-screen w-60 bg-zinc-900 border-r border-zinc-800 flex flex-col z-50 overflow-y-auto">
    
    <!-- Logo -->
    <div class="px-6 py-5 border-b border-zinc-800">
      <span class="font-bold text-lg tracking-tight">
        <span class="text-violet-400">DATA STRUCTURES</span>
      </span>
    </div>

    <!-- Nav -->
    <nav class="flex flex-col py-4">
      <p class="text-xs text-zinc-600 uppercase tracking-widest px-6 py-2 font-mono">
        Estruturas
      </p>
      <RouterLink
        v-for="item in structures"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-6 py-2 text-sm text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        active-class="text-violet-400 bg-zinc-800 border-r-2 border-violet-400"
      >
        <span class="font-mono text-xs text-zinc-700">{{ item.tag }}</span>
        {{ item.name }}
      </RouterLink>
    </nav>

  </aside>
</template>

<script setup lang="ts">
const structures = [
  { name: 'Array',         path: '/array',        tag: '01' },
  { name: 'Linked List',   path: '/linked-list',  tag: '02' },
  { name: 'Stack',         path: '/stack',        tag: '03' },
  { name: 'Queue',         path: '/queue',        tag: '04' },
  { name: 'Deque',         path: '/deque',        tag: '05' },
  { name: 'HashMap',       path: '/hashmap',      tag: '06' },
  { name: 'Tree',          path: '/tree',         tag: '07' },
  { name: 'Heap',          path: '/heap',         tag: '08' },
  { name: 'BST',           path: '/bst',          tag: '09' },
  { name: 'Graph',         path: '/graph',        tag: '10' },
  { name: 'Bloom Filter',  path: '/bloom-filter', tag: '11' },
  { name: 'Disjoint Set',  path: '/disjoint-set', tag: '12' },
  { name: 'Trie',          path: '/trie',         tag: '13' },
  { name: 'LRU Cache',     path: '/lru-cache',    tag: '14' },
]
</script>