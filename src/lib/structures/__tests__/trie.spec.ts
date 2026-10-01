import { describe, it, expect, beforeEach } from 'vitest'
import { Trie } from '../trie'

describe('Trie', () => {
  let trie: Trie

  beforeEach(() => {
    trie = new Trie()
    ;['car', 'card', 'cat'].forEach((w) => trie.insert(w))
  })

  it('search só encontra palavras completas', () => {
    expect(trie.search('car')).toBe(true)
    expect(trie.search('card')).toBe(true)
    expect(trie.search('ca')).toBe(false)
    expect(trie.search('dog')).toBe(false)
  })

  it('startsWith encontra prefixos', () => {
    expect(trie.startsWith('ca')).toBe(true)
    expect(trie.startsWith('car')).toBe(true)
    expect(trie.startsWith('do')).toBe(false)
    expect(trie.startsWith('')).toBe(true)
  })

  it('partilha nós entre palavras com o mesmo prefixo', () => {
    // c-a-r-d + t = 5 nós para 3 palavras
    expect(trie.nodeCount).toBe(5)
  })

  it('delete de uma palavra que é prefixo de outra mantém os nós', () => {
    trie.delete('car')
    expect(trie.search('car')).toBe(false)
    expect(trie.search('card')).toBe(true)
    expect(trie.nodeCount).toBe(5)
  })

  it('delete limpa os nós órfãos', () => {
    trie.delete('card')
    expect(trie.search('card')).toBe(false)
    expect(trie.search('car')).toBe(true)
    expect(trie.nodeCount).toBe(4) // remove só o "d"
  })

  it('delete de uma palavra inexistente não altera nada', () => {
    trie.delete('ca')
    trie.delete('dog')
    expect(trie.search('car')).toBe(true)
    expect(trie.nodeCount).toBe(5)
  })

  it('apagar todas as palavras deixa a trie vazia', () => {
    ;['car', 'card', 'cat'].forEach((w) => trie.delete(w))
    expect(trie.nodeCount).toBe(0)
    expect(trie.startsWith('c')).toBe(false)
  })
})
