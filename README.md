# Data Structures — Interactive Visualizer

An interactive platform to **see, understand and play with** 14 fundamental data structures. Each one comes with an explanation, a diagram, a step-by-step animation you can drive yourself, and a reference implementation.

**🔗 Live demo:** <!-- TODO: replace with the Vercel URL --> https://YOUR-PROJECT.vercel.app

<!-- TODO: add a short GIF of an animation (e.g. heap push/pop) at docs/preview.gif -->
<!-- ![Preview](docs/preview.gif) -->

> The interface is in Portuguese 🇵🇹.

## Features

Every structure has four views:

| View | What it shows |
| --- | --- |
| **Explanation** | How it works, when to use it, time complexity of each operation |
| **Diagram** | A static visual of the internal layout |
| **Animation** | Interactive playground — run operations and watch each step |
| **Code** | A TypeScript implementation |

## Structures

| Linear | Hashing | Trees | Graphs & Sets | Composite |
| --- | --- | --- | --- | --- |
| Array | HashMap | Tree | Graph | LRU Cache |
| Linked List | Bloom Filter | Binary Search Tree | Disjoint Set (Union-Find) | |
| Stack | | Heap (min / max) | | |
| Queue | | Trie | | |
| Deque | | | | |

## Tech stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and builds
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [Vue Router](https://router.vuejs.org/) with lazy-loaded routes, one chunk per structure
- Animations built with plain SVG and reactive state — no animation libraries
- Deployed on [Vercel](https://data-structures-tau.vercel.app/)

## Getting started

Requires Node.js `^20.19.0` or `>=22.12.0`.

```sh
git clone https://github.com/AndreRodrigues884/data-structures.git
cd data-structures
npm install
npm run dev
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run type-check` | Run `vue-tsc` only |

## Project structure

```
src/
├── components/
│   ├── layout/              # Header and sidebar
│   └── structure/
│       ├── StructureTabs.vue    # Shared tab layout
│       └── tabs/<structure>/    # Explanation, Diagram, Animation and Code tabs
├── router/                  # One lazy-loaded route per structure
└── views/structures/        # One page per structure
```

## Author

**André Rodrigues** — [GitHub](https://github.com/AndreRodrigues884)
