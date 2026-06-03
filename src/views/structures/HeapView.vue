<template>
  <StructureTabs
    title="Heap"
    subtitle="Estrutura 08"
    description="Binary Tree especializada onde o pai é sempre maior (Max Heap) ou menor (Min Heap) que os filhos."
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
import ExplanationTab from '@/components/structure/tabs/heap/ExplanationTab.vue'
import DiagramTab     from '@/components/structure/tabs/heap/DiagramTab.vue'
import AnimationTab   from '@/components/structure/tabs/heap/AnimationTab.vue'
import CodeTab        from '@/components/structure/tabs/heap/CodeTab.vue'
</script>