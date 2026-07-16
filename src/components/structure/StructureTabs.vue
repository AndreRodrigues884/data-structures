<template>
  <div class="min-h-screen px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">

    <!-- Header -->
    <div class="mb-8 lg:mb-10">
      <p class="font-mono text-xs text-violet-400 uppercase tracking-widest mb-3">
        {{ subtitle }}
      </p>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">{{ title }}</h1>
      <p class="text-zinc-500 max-w-xl text-sm sm:text-base">{{ description }}</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-zinc-800 mb-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="font-mono text-xs sm:text-sm px-3 sm:px-5 py-3 transition-colors border-b-2 -mb-px whitespace-nowrap shrink-0"
        :class="activeTab === tab.id
          ? 'text-violet-400 border-violet-400'
          : 'text-zinc-500 border-transparent hover:text-zinc-300'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="overflow-x-auto">
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