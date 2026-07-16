<template>
  <StructureTabs
    title="Graph"
    subtitle="Estrutura 10"
    description="Conjunto de nós (vértices) ligados por arestas. A estrutura mais geral e poderosa para modelar relações."
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
import ExplanationTab from '@/components/structure/tabs/graph/ExplanationTab.vue'
import DiagramTab     from '@/components/structure/tabs/graph/DiagramTab.vue'
import AnimationTab   from '@/components/structure/tabs/graph/AnimationTab.vue'
import CodeTab        from '@/components/structure/tabs/graph/CodeTab.vue'
</script>