import { describe, it, expect } from 'vitest'
import { BloomFilter } from '../bloom-filter'

describe('BloomFilter', () => {
  it('nunca dá falsos negativos', () => {
    const bf = new BloomFilter(64)
    const words = ['hello', 'world', 'vue', 'typescript', 'heap', 'trie', 'graph']
    words.forEach((w) => bf.add(w))
    for (const w of words) expect(bf.has(w)).toBe(true)
  })

  it('filtro vazio diz que nada está presente', () => {
    const bf = new BloomFilter(64)
    expect(bf.has('hello')).toBe(false)
    expect(bf.has('')).toBe(false)
  })

  it('palavras não inseridas são normalmente rejeitadas', () => {
    const bf = new BloomFilter(64)
    bf.add('hello')
    bf.add('world')
    expect(bf.has('foo')).toBe(false)
  })

  it('gera 3 hashes dentro dos limites do array de bits', () => {
    const bf = new BloomFilter(64)
    for (const w of ['a', 'hello', 'uma frase com espaços', 'çãé']) {
      const hashes = bf.getHashes(w)
      expect(hashes).toHaveLength(3)
      for (const h of hashes) {
        expect(Number.isInteger(h)).toBe(true)
        expect(h).toBeGreaterThanOrEqual(0)
        expect(h).toBeLessThan(64)
      }
    }
  })

  it('dá um falso positivo para "set" num filtro de 16 bits (igual ao exemplo em Python)', () => {
    const bf = new BloomFilter(16)
    bf.add('hello')
    bf.add('world')
    expect(bf.has('set')).toBe(true)
  })

  it('pode dar falsos positivos quando o filtro está cheio', () => {
    const bf = new BloomFilter(8)
    for (let i = 0; i < 50; i++) bf.add(`palavra-${i}`)
    expect(bf.has('nunca-inserida')).toBe(true)
  })
})
