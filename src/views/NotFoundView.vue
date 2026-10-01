<template>
  <div class="flex flex-col justify-center min-h-screen px-6 py-20 sm:px-10 sm:py-24 lg:px-16">

    <p class="font-mono text-xs text-violet-400 uppercase tracking-widest mb-6">
      — Erro 404
    </p>

    <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
      Página<br>
      <span class="text-emerald-400">não encontrada</span>
    </h1>

    <p class="text-zinc-500 text-base sm:text-lg max-w-md mb-10">
      O endereço <span class="font-mono text-zinc-300 break-all">{{ route.fullPath }}</span> não existe.
      Talvez a estrutura que procuras esteja no menu.
    </p>

    <div class="flex flex-wrap gap-4">
      <RouterLink
        to="/"
        class="bg-violet-500 hover:bg-violet-600 text-white font-mono text-sm px-6 py-3 transition-colors"
      >
        ← Voltar ao início
      </RouterLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
