<template>
  <StructureTabs
    title="Queue"
    subtitle="Estrutura 04"
    description="Estrutura FIFO — First In, First Out. O primeiro elemento a entrar é o primeiro a sair."
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
      <CodeTab structure="queue" />
    </template>
  </StructureTabs>
</template>

<script setup lang="ts">
import StructureTabs from '@/components/structure/StructureTabs.vue'
import ExplanationTab from '@/components/structure/tabs/queue/ExplanationTab.vue'
import DiagramTab from '@/components/structure/tabs/queue/DiagramTab.vue'
import AnimationTab from '@/components/structure/tabs/queue/AnimationTab.vue'
import CodeTab from '@/components/structure/CodeTab.vue'
</script>
