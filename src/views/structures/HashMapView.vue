<template>
  <StructureTabs
    title="HashMap"
    subtitle="Estrutura 06"
    description="Estrutura de pares chave-valor com acesso, inserção e remoção em O(1) médio via função de hash."
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
import ExplanationTab from '@/components/structure/tabs/hashmap/ExplanationTab.vue'
import DiagramTab     from '@/components/structure/tabs/hashmap/DiagramTab.vue'
import AnimationTab   from '@/components/structure/tabs/hashmap/AnimationTab.vue'
import CodeTab        from '@/components/structure/tabs/hashmap/CodeTab.vue'
</script>