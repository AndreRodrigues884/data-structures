<template>
    <div class="max-w-2xl space-y-8">

        <!-- O que é -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-3">O que é?</h2>
            <p class="text-zinc-400 leading-relaxed">
                Uma <span class="text-zinc-100 font-medium">Tree</span> é uma estrutura
                <span class="text-violet-400">hierárquica</span> de nós onde cada nó tem
                um <span class="text-emerald-400">pai</span> e zero ou mais
                <span class="text-violet-400">filhos</span>. É uma versão não linear
                de uma Linked List — em vez de uma sequência, forma uma
                <span class="text-zinc-100">hierarquia</span>.
            </p>
        </section>

        <!-- Terminologia -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-4">Terminologia</h2>
            <div class="space-y-px border border-zinc-800">
                <div v-for="term in terminology" :key="term.name" class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
                    <div class="bg-zinc-900 px-4 py-3">
                        <p class="font-mono text-sm text-violet-400">{{ term.name }}</p>
                    </div>
                    <div class="bg-zinc-900 px-4 py-3 col-span-2">
                        <p class="text-sm text-zinc-400">{{ term.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tipos -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-4">Tipos de Tree</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
                <div v-for="type in types" :key="type.name" class="bg-zinc-900 p-4">
                    <p class="font-mono text-sm text-violet-400 mb-1">{{ type.name }}</p>
                    <p class="text-sm text-zinc-400">{{ type.desc }}</p>
                    <p class="font-mono text-xs text-zinc-600 mt-2">{{ type.example }}</p>
                </div>
            </div>
        </section>

        <!-- Traversals -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-4">Traversals — como percorrer</h2>
            <p class="text-zinc-400 text-sm mb-4">
                Existem 4 formas de percorrer uma tree. A ordem em que visitas os nós
                muda completamente o resultado.
            </p>
            <div class="space-y-px border border-zinc-800">
                <div v-for="traversal in traversals" :key="traversal.name" class="grid grid-cols-1 sm:grid-cols-4 gap-px bg-zinc-800">
                    <div class="bg-zinc-900 px-4 py-3">
                        <p class="font-mono text-sm text-violet-400">{{ traversal.name }}</p>
                    </div>
                    <div class="bg-zinc-900 px-4 py-3">
                        <p class="font-mono text-xs text-emerald-400">{{ traversal.order }}</p>
                    </div>
                    <div class="bg-zinc-900 px-4 py-3 col-span-2">
                        <p class="text-sm text-zinc-400">{{ traversal.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Complexidade -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-4">Complexidade</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
                <div v-for="op in operations" :key="op.name" class="bg-zinc-900 px-5 py-4">
                    <p class="font-mono text-sm text-zinc-100 mb-1">{{ op.name }}</p>
                    <p class="font-mono text-lg" :class="op.color">{{ op.complexity }}</p>
                    <p class="text-xs text-zinc-600 mt-1">{{ op.note }}</p>
                </div>
            </div>
        </section>

        <!-- No mundo real -->
        <section>
            <h2 class="text-xl font-bold tracking-tight mb-4">No mundo real</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
                <div v-for="use in realWorld" :key="use.title" class="bg-zinc-900 p-4">
                    <p class="font-mono text-sm text-violet-400 mb-1">{{ use.title }}</p>
                    <p class="text-sm text-zinc-400">{{ use.desc }}</p>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
const terminology = [
    { name: 'Root', desc: 'O nó no topo da árvore — não tem pai' },
    { name: 'Node', desc: 'Cada elemento da árvore com um valor e referências para filhos' },
    { name: 'Leaf', desc: 'Nó sem filhos — está na extremidade da árvore' },
    { name: 'Edge', desc: 'A ligação entre um pai e um filho' },
    { name: 'Height', desc: 'Número de edges do root até à leaf mais profunda' },
    { name: 'Depth', desc: 'Número de edges do root até a um nó específico' },
    { name: 'Subtree', desc: 'Uma tree formada por um nó e todos os seus descendentes' },
    { name: 'Siblings', desc: 'Nós que partilham o mesmo pai' },
]

const types = [
    { name: 'Binary Tree', desc: 'Cada nó tem no máximo 2 filhos.', example: 'Base para BST e Heap' },
    { name: 'Binary Search Tree', desc: 'Left < Root < Right em todos os nós.', example: 'Search em O(log n)' },
    { name: 'AVL Tree', desc: 'BST auto-balanceada — altura O(log n).', example: 'Bases de dados' },
    { name: 'Trie', desc: 'Tree de caracteres para strings.', example: 'Autocomplete, spell check' },
    { name: 'Heap', desc: 'Tree onde pai é sempre maior/menor que filhos.', example: 'Priority Queue' },
    { name: 'N-ary Tree', desc: 'Cada nó pode ter N filhos.', example: 'File system, DOM' },
]

const traversals = [
    { name: 'Inorder', order: 'Left → Root → Right', desc: 'Visita nós em ordem crescente numa BST' },
    { name: 'Preorder', order: 'Root → Left → Right', desc: 'Útil para copiar ou serializar a tree' },
    { name: 'Postorder', order: 'Left → Right → Root', desc: 'Útil para apagar a tree ou avaliar expressões' },
    { name: 'BFS', order: 'Nível a nível', desc: 'Usa Queue — visita todos os nós por profundidade' },
]

const operations = [
    { name: 'Inserção', complexity: 'O(n)', color: 'text-amber-400', note: 'O(log n) se balanceada' },
    { name: 'Pesquisa', complexity: 'O(n)', color: 'text-amber-400', note: 'O(log n) se balanceada' },
    { name: 'Remoção', complexity: 'O(n)', color: 'text-amber-400', note: 'O(log n) se balanceada' },
    { name: 'Traversal', complexity: 'O(n)', color: 'text-amber-400', note: 'Visita todos os nós' },
]

const realWorld = [
    { title: 'DOM do browser', desc: 'O HTML é uma tree de elementos — React e Vue manipulam uma Virtual DOM tree.' },
    { title: 'File system', desc: 'Pastas e ficheiros formam uma N-ary tree. cd e ls navegam nessa tree.' },
    { title: 'Base de dados', desc: 'Índices B-Tree permitem lookup em O(log n) em milhões de registos.' },
    { title: 'Compiladores', desc: 'O código fonte é transformado numa AST (Abstract Syntax Tree) antes de compilar.' },
]
</script>