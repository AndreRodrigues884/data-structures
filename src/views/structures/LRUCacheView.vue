<template>
  <StructureTabs
    title="LRU Cache"
    subtitle="Estrutura 14"
    description="Least Recently Used — cache de capacidade fixa que combina HashMap e lista duplamente ligada para get/put em O(1)."
  >
    <template #explanation>
      <ExplanationTab />
    </template>

    <template #diagram>
      <DiagramTab />
    </template>

    <template #animation>
      <AnimationTab />
    </template>

    <template #code>
      <CodeTab structure="lru-cache" />
    </template>
  </StructureTabs>
</template>

<script setup lang="ts">
import StructureTabs from '@/components/structure/StructureTabs.vue'
import ExplanationTab from '@/components/structure/tabs/lru-cache/ExplanationTab.vue'
import DiagramTab from '@/components/structure/tabs/lru-cache/DiagramTab.vue'
import AnimationTab from '@/components/structure/tabs/lru-cache/AnimationTab.vue'
import CodeTab from '@/components/structure/CodeTab.vue'
</script>
