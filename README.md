# Data Structures — Interactive Visualizer

[![CI](https://github.com/AndreRodrigues884/data-structures/actions/workflows/ci.yml/badge.svg)](https://github.com/AndreRodrigues884/data-structures/actions/workflows/ci.yml)

An interactive platform to **see, understand and play with** 14 fundamental data structures. Each one comes with an explanation, a diagram, a step-by-step animation you can drive yourself, and a reference implementation.

**🔗 Live demo:** https://data-structures-tau.vercel.app/

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
| **Code** | The tested TypeScript implementation, its unit tests, and a Python version |

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
- [Vitest](https://vitest.dev/) unit tests for every data structure; the Python versions are checked in CI through `assert`-based examples
- The **Code** tab renders the real source files (TypeScript, tests and Python) with [highlight.js](https://highlightjs.org/), so what you read is exactly what is tested
- Deployed on [Vercel](https://vercel.com/)

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
| `npm test` | Run the unit tests (Vitest) |
| `npm run test:unit` | Run the tests in watch mode |
| `npm run lint` | Lint and auto-fix with ESLint |
| `npm run format` | Format the code with Prettier |

## Project structure

```
src/
├── lib/structures/          # Pure, framework-free implementations
│   ├── __tests__/           # Vitest unit tests
│   └── python/              # Python versions (run in CI)
├── components/
│   ├── layout/              # Sidebar
│   └── structure/
│       ├── StructureTabs.vue    # Shared tab layout
│       ├── CodeTab.vue          # Renders the real source files from lib/
│       └── tabs/<structure>/    # Explanation, Diagram and Animation tabs
├── router/                  # One lazy-loaded route per structure
└── views/structures/        # One page per structure
```

## Author

**André Rodrigues** — [GitHub](https://github.com/AndreRodrigues884)
