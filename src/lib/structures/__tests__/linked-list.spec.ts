import { describe, it, expect } from 'vitest'
import { LinkedList } from '../linked-list'

describe('LinkedList', () => {
  it('append e prepend mantêm a ordem correta', () => {
    const ll = new LinkedList<number>()
    ll.append(12)
    ll.append(45)
    ll.prepend(99)
    expect(ll.toArray()).toEqual([99, 12, 45])
    expect(ll.length).toBe(3)
  })

  it('removeHead remove do início', () => {
    const ll = new LinkedList<number>()
    ;[1, 2, 3].forEach((v) => ll.append(v))
    expect(ll.removeHead()).toBe(1)
    expect(ll.toArray()).toEqual([2, 3])
  })

  it('removeHead numa lista vazia devolve null', () => {
    expect(new LinkedList<number>().removeHead()).toBeNull()
  })

  it('append funciona depois de esvaziar a lista (tail é reposto)', () => {
    const ll = new LinkedList<number>()
    ll.append(1)
    ll.removeHead()
    ll.append(2)
    expect(ll.toArray()).toEqual([2])
  })

  it('search devolve o índice ou -1', () => {
    const ll = new LinkedList<number>()
    ;[12, 45, 7].forEach((v) => ll.append(v))
    expect(ll.search(45)).toBe(1)
    expect(ll.search(100)).toBe(-1)
  })
})
