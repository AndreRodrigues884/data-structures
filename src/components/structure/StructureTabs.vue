<template>
  <div class="min-h-screen px-12 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="font-mono text-xs text-violet-400 uppercase tracking-widest mb-3">
        {{ subtitle }}
      </p>
      <h1 class="text-5xl font-bold tracking-tighter mb-4">{{ title }}</h1>
      <p class="text-zinc-500 max-w-xl">{{ description }}</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-zinc-800 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="font-mono text-sm px-5 py-3 transition-colors border-b-2 -mb-px"
        :class="activeTab === tab.id
          ? 'text-violet-400 border-violet-400'
          : 'text-zinc-500 border-transparent hover:text-zinc-300'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div>
      <slot :name="activeTab" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  subtitle: string
  description: string
}>()

const tabs = [
  { id: 'explanation', label: '01 — Explicação' },
  { id: 'diagram',     label: '02 — Diagrama'   },
  { id: 'animation',   label: '03 — Animação'   },
  { id: 'code',        label: '04 — Código'      },
]

const activeTab = ref('explanation')
</script>