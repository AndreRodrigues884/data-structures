<template>
  <StructureTabs
    title="Trie"
    subtitle="Estrutura 13"
    description="Prefix Tree — árvore especializada em armazenar strings, permitindo pesquisa rápida por palavra exata ou por prefixo."
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
import ExplanationTab from '@/components/structure/tabs/trie/ExplanationTab.vue'
import DiagramTab     from '@/components/structure/tabs/trie/DiagramTab.vue'
import AnimationTab   from '@/components/structure/tabs/trie/AnimationTab.vue'
import CodeTab        from '@/components/structure/tabs/trie/CodeTab.vue'
</script>