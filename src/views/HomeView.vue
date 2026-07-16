<template>
  <div class="flex flex-col justify-center min-h-screen px-6 py-20 sm:px-10 sm:py-24 lg:px-16">

    <p class="font-mono text-xs text-violet-400 uppercase tracking-widest mb-6">
      — Ciência da Computação
    </p>

    <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
      Algoritmos<br>
      <span class="text-violet-400">&</span><br>
      Estruturas<br>
      <span class="text-emerald-400">de Dados</span>
    </h1>

    <p class="text-zinc-500 text-base sm:text-lg max-w-md mb-10">
      Visualiza, compreende e domina os 14 conceitos fundamentais —
      com explicações, gráficos, animações e código real.
    </p>

    <div class="flex flex-wrap gap-4">
      <RouterLink
        to="/array"
        class="bg-violet-500 hover:bg-violet-600 text-white font-mono text-sm px-6 py-3 transition-colors"
      >
        → Começar
      </RouterLink>

        <a href="#estruturas"
        class="border border-zinc-700 hover:border-violet-400 text-zinc-300 font-mono text-sm px-6 py-3 transition-colors"
      >
        Ver estruturas
      </a>
    </div>

    <!-- Stats -->
    <div class="flex flex-wrap gap-8 sm:gap-12 mt-16">
      <div>
        <p class="text-3xl font-bold tracking-tight">14</p>
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mt-1">Estruturas</p>
      </div>
      <div>
        <p class="text-3xl font-bold tracking-tight">4</p>
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mt-1">Tabs por página</p>
      </div>
      <div>
        <p class="text-3xl font-bold tracking-tight text-violet-400">O(n)</p>
        <p class="font-mono text-xs text-zinc-600 uppercase tracking-widest mt-1">Big-O</p>
      </div>
    </div>

  </div>
</template>