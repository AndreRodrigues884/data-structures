import { describe, it, expect } from 'vitest'
import { HashMap, twoSum } from '../hashmap'

describe('HashMap', () => {
  it('guarda e lê valores', () => {
    const map = new HashMap<number>()
    map.set('a', 1)
    map.set('b', 2)
    expect(map.get('a')).toBe(1)
    expect(map.get('b')).toBe(2)
    expect(map.get('c')).toBeUndefined()
    expect(map.length).toBe(2)
  })

  it('set numa chave existente atualiza sem aumentar o tamanho', () => {
    const map = new HashMap<number>()
    map.set('a', 1)
    map.set('a', 2)
    expect(map.get('a')).toBe(2)
    expect(map.length).toBe(1)
  })

  it('delete remove e devolve se existia', () => {
    const map = new HashMap<number>()
    map.set('a', 1)
    expect(map.delete('a')).toBe(true)
    expect(map.delete('a')).toBe(false)
    expect(map.has('a')).toBe(false)
    expect(map.length).toBe(0)
  })

  it('resolve colisões com chaining', () => {
    const map = new HashMap<string>(1) // capacidade 1 → tudo colide
    map.set('x', 'X')
    map.set('y', 'Y')
    map.set('z', 'Z')
    expect(map.hash('x')).toBe(map.hash('y'))
    expect(map.get('x')).toBe('X')
    expect(map.get('y')).toBe('Y')
    expect(map.get('z')).toBe('Z')
    map.delete('y')
    expect(map.get('x')).toBe('X')
    expect(map.get('z')).toBe('Z')
  })

  it('has funciona mesmo quando o valor é undefined', () => {
    const map = new HashMap<undefined>()
    map.set('k', undefined)
    expect(map.has('k')).toBe(true)
  })

  it('hash é determinístico e dentro dos limites', () => {
    const map = new HashMap<number>(53)
    for (const key of ['', 'a', 'hello', 'uma chave bem mais comprida']) {
      const h = map.hash(key)
      expect(h).toBe(map.hash(key))
      expect(h).toBeGreaterThanOrEqual(0)
      expect(h).toBeLessThan(53)
    }
  })
})

describe('twoSum', () => {
  it('encontra os índices cuja soma dá o alvo', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2])
    expect(twoSum([3, 3], 6)).toEqual([0, 1])
  })

  it('devolve [] quando não há solução', () => {
    expect(twoSum([1, 2, 3], 100)).toEqual([])
  })
})
