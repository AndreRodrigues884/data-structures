import { describe, it, expect } from 'vitest'
import { DisjointSet, hasCycle } from '../disjoint-set'

describe('DisjointSet', () => {
  it('cada elemento começa no seu próprio conjunto', () => {
    const ds = new DisjointSet(3)
    expect(ds.find(0)).toBe(0)
    expect(ds.find(2)).toBe(2)
    expect(ds.connected(0, 1)).toBe(false)
  })

  it('union junta conjuntos de forma transitiva', () => {
    const ds = new DisjointSet(5)
    ds.union(0, 1)
    ds.union(2, 3)
    ds.union(0, 2)
    expect(ds.connected(1, 3)).toBe(true)
    expect(ds.connected(1, 4)).toBe(false)
    expect(ds.find(3)).toBe(0)
  })

  it('union devolve false quando já estão no mesmo conjunto', () => {
    const ds = new DisjointSet(3)
    expect(ds.union(0, 1)).toBe(true)
    expect(ds.union(1, 0)).toBe(false)
  })

  it('union by rank: a árvore mais baixa fica por baixo', () => {
    const ds = new DisjointSet(4)
    ds.union(0, 1) // rank(0) = 1
    ds.union(2, 0) // rank(2) = 0 < rank(0) → 2 fica por baixo de 0
    expect(ds.find(2)).toBe(0)
  })

  it('lida com cadeias longas sem stack overflow', () => {
    const n = 10_000
    const ds = new DisjointSet(n)
    for (let i = 1; i < n; i++) ds.union(i - 1, i)
    expect(ds.connected(0, n - 1)).toBe(true)
  })
})

describe('hasCycle', () => {
  it('deteta ciclos', () => {
    expect(
      hasCycle(3, [
        [0, 1],
        [1, 2],
        [2, 0],
      ]),
    ).toBe(true)
  })

  it('uma árvore não tem ciclos', () => {
    expect(
      hasCycle(4, [
        [0, 1],
        [1, 2],
        [1, 3],
      ]),
    ).toBe(false)
  })
})
