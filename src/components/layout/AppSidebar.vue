<template>
  <!-- Mobile top bar -->
  <div class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 z-50">
    <span class="font-bold text-base tracking-tight">
      <span class="text-violet-400">DATA STRUCTURES</span>
    </span>
    <button
      @click="isOpen = !isOpen"
      class="text-zinc-400 hover:text-zinc-100 p-2 -mr-2"
      aria-label="Abrir menu"
    >
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Mobile backdrop -->
  <div
    v-if="isOpen"
    @click="isOpen = false"
    class="lg:hidden fixed inset-0 bg-black/60 z-40"
  />

  <!-- Sidebar -->
  <aside
    class="fixed left-0 top-0 h-screen w-60 bg-zinc-900 border-r border-zinc-800 flex flex-col z-50 overflow-y-auto transition-transform duration-200 pt-14 lg:pt-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >

    <!-- Logo (desktop only, mobile has its own top bar) -->
    <div class="hidden lg:block px-6 py-5 border-b border-zinc-800">
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
        @click="isOpen = false"
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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => { isOpen.value = false })

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