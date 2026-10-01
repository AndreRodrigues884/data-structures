import { describe, it, expect, beforeEach } from 'vitest'
import { BST } from '../bst'

describe('BST', () => {
  let bst: BST<number>

  beforeEach(() => {
    bst = new BST<number>()
    ;[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((v) => bst.insert(v))
  })

  it('inorder devolve os valores ordenados', () => {
    expect(bst.inorder()).toEqual([1, 3, 4, 6, 7, 8, 10, 13, 14])
  })

  it('search encontra valores existentes', () => {
    expect(bst.search(7)).toBe(true)
    expect(bst.search(99)).toBe(false)
  })

  it('min e max', () => {
    expect(bst.min()).toBe(1)
    expect(bst.max()).toBe(14)
  })

  it('ignora duplicados', () => {
    bst.insert(6)
    expect(bst.inorder()).toEqual([1, 3, 4, 6, 7, 8, 10, 13, 14])
  })

  it('delete de uma folha', () => {
    bst.delete(4)
    expect(bst.inorder()).toEqual([1, 3, 6, 7, 8, 10, 13, 14])
  })

  it('delete de um nó com um filho', () => {
    bst.delete(14)
    expect(bst.inorder()).toEqual([1, 3, 4, 6, 7, 8, 10, 13])
  })

  it('delete de um nó com dois filhos (usa o inorder successor)', () => {
    bst.delete(3)
    expect(bst.inorder()).toEqual([1, 4, 6, 7, 8, 10, 13, 14])
    expect(bst.root!.left!.value).toBe(4)
  })

  it('delete da raiz', () => {
    bst.delete(8)
    expect(bst.inorder()).toEqual([1, 3, 4, 6, 7, 10, 13, 14])
    expect(bst.root!.value).toBe(10)
  })

  it('delete de um valor inexistente não altera a árvore', () => {
    bst.delete(999)
    expect(bst.inorder()).toEqual([1, 3, 4, 6, 7, 8, 10, 13, 14])
  })

  it('árvore vazia', () => {
    const empty = new BST<number>()
    expect(empty.min()).toBeNull()
    expect(empty.max()).toBeNull()
    expect(empty.search(1)).toBe(false)
    empty.delete(1)
    expect(empty.inorder()).toEqual([])
  })

  it('funciona com strings', () => {
    const words = new BST<string>()
    ;['m', 'c', 'x', 'a'].forEach((w) => words.insert(w))
    expect(words.inorder()).toEqual(['a', 'c', 'm', 'x'])
  })
})
