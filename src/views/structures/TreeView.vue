<template>
  <StructureTabs
    title="Tree"
    subtitle="Estrutura 07"
    description="Estrutura hierárquica de nós onde cada nó tem um pai e zero ou mais filhos."
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
      <CodeTab structure="tree" />
    </template>
  </StructureTabs>
</template>

<script setup lang="ts">
import StructureTabs from '@/components/structure/StructureTabs.vue'
import ExplanationTab from '@/components/structure/tabs/tree/ExplanationTab.vue'
import DiagramTab from '@/components/structure/tabs/tree/DiagramTab.vue'
import AnimationTab from '@/components/structure/tabs/tree/AnimationTab.vue'
import CodeTab from '@/components/structure/CodeTab.vue'
</script>
