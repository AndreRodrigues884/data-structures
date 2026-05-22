<template>
  <StructureTabs
    title="Array"
    subtitle="Estrutura 01"
    description="Coleção de elementos armazenados em memória contígua, acessíveis por índice em tempo constante."
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
import StructureTabs from '@/components/structure/StructureTabs.vue'
import ExplanationTab from '@/components/structure/tabs/array/ExplanationTab.vue'
import DiagramTab from '@/components/structure/tabs/array/DiagramTab.vue'
import AnimationTab from '@/components/structure/tabs/array/AnimationTab.vue'
import CodeTab from '@/components/structure/tabs/array/CodeTab.vue'
</script>