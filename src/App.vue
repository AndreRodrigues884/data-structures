<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">
    <AppSidebar />
    <main class="ml-60 min-h-screen">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>