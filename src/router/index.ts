import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/array', name: 'array', component: () => import('@/views/structures/ArrayView.vue') },
    { path: '/linked-list', name: 'linked-list', component: () => import('@/views/structures/LinkedListView.vue') },
    { path: '/stack', name: 'stack', component: () => import('@/views/structures/StackView.vue') },
    { path: '/queue', name: 'queue', component: () => import('@/views/structures/QueueView.vue') },
    { path: '/deque', name: 'deque', component: () => import('@/views/structures/DequeView.vue') },
    { path: '/hashmap', name: 'hashmap', component: () => import('@/views/structures/HashMapView.vue') },
    { path: '/tree', name: 'tree', component: () => import('@/views/structures/TreeView.vue') },
    { path: '/heap', name: 'heap', component: () => import('@/views/structures/HeapView.vue') },
    { path: '/bst', name: 'bst', component: () => import('@/views/structures/BSTView.vue') },
    { path: '/graph', name: 'graph', component: () => import('@/views/structures/GraphView.vue') },
    { path: '/bloom-filter', name: 'bloom-filter', component: () => import('@/views/structures/BloomFilterView.vue') },
    { path: '/disjoint-set', name: 'disjoint-set', component: () => import('@/views/structures/DisjointSetView.vue') },
    { path: '/trie', name: 'trie', component: () => import('@/views/structures/TrieView.vue') },
    { path: '/lru-cache', name: 'lru-cache', component: () => import('@/views/structures/LRUCacheView.vue') },
  ]
})

export default router