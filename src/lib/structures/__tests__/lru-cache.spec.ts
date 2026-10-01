import { describe, it, expect } from 'vitest'
import { LRUCache } from '../lru-cache'

describe('LRUCache', () => {
  it('get devolve o valor guardado', () => {
    const cache = new LRUCache<number, string>(2)
    cache.put(1, 'a')
    expect(cache.get(1)).toBe('a')
    expect(cache.get(99)).toBeUndefined()
  })

  it('remove o menos recentemente usado quando fica cheia', () => {
    const cache = new LRUCache<number, string>(3)
    cache.put(1, 'a')
    cache.put(2, 'b')
    cache.put(3, 'c')
    cache.get(1) // 1 passa a MRU → 2 é o LRU
    cache.put(4, 'd')
    expect(cache.get(2)).toBeUndefined()
    expect(cache.keys()).toEqual([4, 1, 3])
  })

  it('put numa chave existente atualiza e marca como recente', () => {
    const cache = new LRUCache<number, string>(2)
    cache.put(1, 'a')
    cache.put(2, 'b')
    cache.put(1, 'A') // 1 passa a MRU
    cache.put(3, 'c') // remove 2
    expect(cache.get(1)).toBe('A')
    expect(cache.get(2)).toBeUndefined()
    expect(cache.size).toBe(2)
  })

  it('keys devolve a ordem MRU → LRU', () => {
    const cache = new LRUCache<string, number>(3)
    cache.put('a', 1)
    cache.put('b', 2)
    cache.put('c', 3)
    expect(cache.keys()).toEqual(['c', 'b', 'a'])
    cache.get('a')
    expect(cache.keys()).toEqual(['a', 'c', 'b'])
  })

  it('capacidade 1 guarda só o último', () => {
    const cache = new LRUCache<number, number>(1)
    cache.put(1, 1)
    cache.put(2, 2)
    expect(cache.get(1)).toBeUndefined()
    expect(cache.get(2)).toBe(2)
  })

  it('rejeita capacidade inválida', () => {
    expect(() => new LRUCache(0)).toThrow(RangeError)
  })
})
