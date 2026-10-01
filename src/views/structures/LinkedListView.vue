<template>
  <StructureTabs
    title="Linked List"
    subtitle="Estrutura 02"
    description="Sequência de nós onde cada nó aponta para o seguinte. Inserção e remoção eficientes, acesso lento."
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
      <CodeTab structure="linked-list" />
    </template>
  </StructureTabs>
</template>

<script setup lang="ts">
import StructureTabs from '@/components/structure/StructureTabs.vue'
import ExplanationTab from '@/components/structure/tabs/linked-list/ExplanationTab.vue'
import DiagramTab from '@/components/structure/tabs/linked-list/DiagramTab.vue'
import AnimationTab from '@/components/structure/tabs/linked-list/AnimationTab.vue'
import CodeTab from '@/components/structure/CodeTab.vue'
</script>
