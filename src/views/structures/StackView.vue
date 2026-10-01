<template>
  <StructureTabs
    title="Stack"
    subtitle="Estrutura 03"
    description="Estrutura LIFO — Last In, First Out. O último elemento a entrar é o primeiro a sair."
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
      <CodeTab structure="stack" />
    </template>
  </StructureTabs>
</template>

<script setup lang="ts">
import StructureTabs from '@/components/structure/StructureTabs.vue'
import ExplanationTab from '@/components/structure/tabs/stack/ExplanationTab.vue'
import DiagramTab from '@/components/structure/tabs/stack/DiagramTab.vue'
import AnimationTab from '@/components/structure/tabs/stack/AnimationTab.vue'
import CodeTab from '@/components/structure/CodeTab.vue'
</script>
