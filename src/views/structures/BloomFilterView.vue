<template>
  <StructureTabs
    title="Bloom Filter"
    subtitle="Estrutura 11"
    description="Estrutura probabilística que verifica se um elemento pode estar num conjunto — extremamente eficiente em memória."
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
import ExplanationTab from '@/components/structure/tabs/bloom-filter/ExplanationTab.vue'
import DiagramTab     from '@/components/structure/tabs/bloom-filter/DiagramTab.vue'
import AnimationTab   from '@/components/structure/tabs/bloom-filter/AnimationTab.vue'
import CodeTab        from '@/components/structure/tabs/bloom-filter/CodeTab.vue'
</script>