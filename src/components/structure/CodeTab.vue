<template>
  <div class="max-w-3xl space-y-6">
    <div class="flex gap-1 border-b border-zinc-800">
      <button
        v-for="file in files"
        :key="file.id"
        @click="activeId = file.id"
        class="font-mono text-sm px-4 py-2 border-b-2 -mb-px transition-colors"
        :class="
          activeId === file.id
            ? 'text-violet-400 border-violet-400'
            : 'text-zinc-500 border-transparent hover:text-zinc-300'
        "
      >
        {{ file.label }}
      </button>
    </div>

    <div class="bg-zinc-900 border border-zinc-800">
      <div class="flex items-center justify-between gap-4 px-4 py-2 border-b border-zinc-800">
        <a
          :href="githubUrl"
          target="_blank"
          rel="noopener"
          class="font-mono text-xs text-zinc-600 hover:text-violet-400 transition-colors truncate"
          title="Ver no GitHub"
        >
          {{ activeFile.path }} ↗
        </a>
        <button
          @click="copy"
          :disabled="!source"
          class="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
        >
          {{ copied ? '✓ copiado' : 'copiar' }}
        </button>
      </div>
      <p v-if="activeFile.note" class="px-5 pt-4 font-mono text-xs text-zinc-500">{{ activeFile.note }}</p>
      <pre class="code p-5 overflow-x-auto font-mono text-sm leading-relaxed text-zinc-300"><code v-html="html" /></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { highlight, type CodeLanguage } from '@/lib/highlight'

const props = defineProps<{
  // nome do ficheiro em src/lib/structures, sem extensão (ex.: 'heap', 'linked-list')
  structure: string
}>()

const REPO_URL = 'https://github.com/AndreRodrigues884/data-structures/blob/main/'

// carregados só quando o separador de código é aberto — cada ficheiro fica no seu próprio chunk
const sources = import.meta.glob<string>(
  ['/src/lib/structures/*.ts', '/src/lib/structures/__tests__/*.spec.ts', '/src/lib/structures/python/*.py'],
  { query: '?raw', import: 'default' },
)

interface CodeFile {
  id: string
  label: string
  path: string
  language: CodeLanguage
  note?: string
}

const files = computed<CodeFile[]>(() => [
  {
    id: 'typescript',
    label: 'TypeScript',
    path: `src/lib/structures/${props.structure}.ts`,
    language: 'typescript',
  },
  {
    id: 'tests',
    label: 'Testes',
    path: `src/lib/structures/__tests__/${props.structure}.spec.ts`,
    language: 'typescript',
    note: '// testes unitários com Vitest — correm em cada push no CI',
  },
  {
    id: 'python',
    label: 'Python',
    path: `src/lib/structures/python/${props.structure.replace(/-/g, '_')}.py`,
    language: 'python',
  },
])

const activeId = ref('typescript')
const activeFile = computed(() => files.value.find((f) => f.id === activeId.value) ?? files.value[0]!)
const githubUrl = computed(() => REPO_URL + activeFile.value.path)

const source = ref('')
const copied = ref(false)

const html = computed(() => (source.value ? highlight(source.value, activeFile.value.language) : ''))

watch(
  activeFile,
  async (file) => {
    const load = sources[`/${file.path}`]
    const text = load ? await load() : `// ficheiro não encontrado: ${file.path}`
    // ignora respostas antigas se o separador mudou entretanto
    if (activeFile.value.path === file.path) source.value = text
  },
  { immediate: true },
)

async function copy() {
  await navigator.clipboard.writeText(source.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<style scoped>
/* mapeia as classes do highlight.js para a paleta do site */
.code :deep(.hljs-keyword),
.code :deep(.hljs-meta),
.code :deep(.hljs-literal) {
  color: var(--color-violet-400);
}

.code :deep(.hljs-string),
.code :deep(.hljs-number),
.code :deep(.hljs-title),
.code :deep(.hljs-regexp) {
  color: var(--color-emerald-400);
}

.code :deep(.hljs-type),
.code :deep(.hljs-built_in),
.code :deep(.hljs-title.class_) {
  color: var(--color-amber-400);
}

.code :deep(.hljs-comment) {
  color: var(--color-zinc-500);
}
</style>
