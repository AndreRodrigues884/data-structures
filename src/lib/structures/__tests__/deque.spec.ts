import { describe, it, expect } from 'vitest'
import { Deque } from '../deque'

describe('Deque', () => {
  it('insere e remove em ambas as extremidades', () => {
    const dq = new Deque<number>()
    dq.pushBack(1)
    dq.pushBack(2)
    dq.pushFront(0) // [0, 1, 2]
    expect(dq.peekFront()).toBe(0)
    expect(dq.peekBack()).toBe(2)
    expect(dq.popFront()).toBe(0)
    expect(dq.popBack()).toBe(2)
    expect(dq.length).toBe(1)
  })

  it('funciona como stack (pushBack + popBack)', () => {
    const dq = new Deque<number>()
    ;[1, 2, 3].forEach((v) => dq.pushBack(v))
    expect([dq.popBack(), dq.popBack(), dq.popBack()]).toEqual([3, 2, 1])
  })

  it('funciona como queue (pushBack + popFront)', () => {
    const dq = new Deque<number>()
    ;[1, 2, 3].forEach((v) => dq.pushBack(v))
    expect([dq.popFront(), dq.popFront(), dq.popFront()]).toEqual([1, 2, 3])
  })

  it('remover o último elemento por qualquer ponta limpa as duas', () => {
    const dq = new Deque<number>()
    dq.pushFront(1)
    expect(dq.popBack()).toBe(1)
    expect(dq.isEmpty()).toBe(true)
    expect(dq.peekFront()).toBeNull()
    expect(dq.peekBack()).toBeNull()
    dq.pushBack(2)
    expect(dq.popFront()).toBe(2)
  })

  it('deque vazio devolve null', () => {
    const dq = new Deque<number>()
    expect(dq.popFront()).toBeNull()
    expect(dq.popBack()).toBeNull()
  })
})
