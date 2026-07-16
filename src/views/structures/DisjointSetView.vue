<template>
  <StructureTabs
    title="Disjoint Set"
    subtitle="Estrutura 12"
    description="Union-Find — estrutura que agrupa elementos em conjuntos disjuntos e verifica se dois elementos pertencem ao mesmo conjunto."
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
import ExplanationTab from '@/components/structure/tabs/disjoint-set/ExplanationTab.vue'
import DiagramTab     from '@/components/structure/tabs/disjoint-set/DiagramTab.vue'
import AnimationTab   from '@/components/structure/tabs/disjoint-set/AnimationTab.vue'
import CodeTab        from '@/components/structure/tabs/disjoint-set/CodeTab.vue'
</script>