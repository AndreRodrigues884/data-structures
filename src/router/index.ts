import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const SITE_TITLE = 'Data Structures'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/array', name: 'array', component: () => import('@/views/structures/ArrayView.vue'), meta: { title: 'Array' } },
    { path: '/linked-list', name: 'linked-list', component: () => import('@/views/structures/LinkedListView.vue'), meta: { title: 'Linked List' } },
    { path: '/stack', name: 'stack', component: () => import('@/views/structures/StackView.vue'), meta: { title: 'Stack' } },
    { path: '/queue', name: 'queue', component: () => import('@/views/structures/QueueView.vue'), meta: { title: 'Queue' } },
    { path: '/deque', name: 'deque', component: () => import('@/views/structures/DequeView.vue'), meta: { title: 'Deque' } },
    { path: '/hashmap', name: 'hashmap', component: () => import('@/views/structures/HashMapView.vue'), meta: { title: 'HashMap' } },
    { path: '/tree', name: 'tree', component: () => import('@/views/structures/TreeView.vue'), meta: { title: 'Tree' } },
    { path: '/heap', name: 'heap', component: () => import('@/views/structures/HeapView.vue'), meta: { title: 'Heap' } },
    { path: '/bst', name: 'bst', component: () => import('@/views/structures/BSTView.vue'), meta: { title: 'Binary Search Tree' } },
    { path: '/graph', name: 'graph', component: () => import('@/views/structures/GraphView.vue'), meta: { title: 'Graph' } },
    { path: '/bloom-filter', name: 'bloom-filter', component: () => import('@/views/structures/BloomFilterView.vue'), meta: { title: 'Bloom Filter' } },
    { path: '/disjoint-set', name: 'disjoint-set', component: () => import('@/views/structures/DisjointSetView.vue'), meta: { title: 'Disjoint Set' } },
    { path: '/trie', name: 'trie', component: () => import('@/views/structures/TrieView.vue'), meta: { title: 'Trie' } },
    { path: '/lru-cache', name: 'lru-cache', component: () => import('@/views/structures/LRUCacheView.vue'), meta: { title: 'LRU Cache' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue'), meta: { title: 'Página não encontrada' } },
  ]
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · ${SITE_TITLE}` : SITE_TITLE
})

export default router
