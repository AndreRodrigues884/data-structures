<template>
  <StructureTabs
    title="Deque"
    subtitle="Estrutura 05"
    description="Double-Ended Queue — inserção e remoção eficiente em ambas as extremidades."
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
import ExplanationTab from '@/components/structure/tabs/deque/ExplanationTab.vue'
import DiagramTab     from '@/components/structure/tabs/deque/DiagramTab.vue'
import AnimationTab   from '@/components/structure/tabs/deque/AnimationTab.vue'
import CodeTab        from '@/components/structure/tabs/deque/CodeTab.vue'
</script>