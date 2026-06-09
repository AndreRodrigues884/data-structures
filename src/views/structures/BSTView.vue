<template>
  <StructureTabs
    title="BST"
    subtitle="Estrutura 09"
    description="Binary Search Tree — árvore onde left < root < right em todos os nós, permitindo search em O(log n)."
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
      <CodeTab />
    </template>
  </StructureTabs>
</template>

<script setup lang="ts">
import StructureTabs  from '@/components/structure/StructureTabs.vue'
import ExplanationTab from '@/components/structure/tabs/bst/ExplanationTab.vue'
import DiagramTab     from '@/components/structure/tabs/bst/DiagramTab.vue'
import AnimationTab   from '@/components/structure/tabs/bst/AnimationTab.vue'
import CodeTab        from '@/components/structure/tabs/bst/CodeTab.vue'
</script>