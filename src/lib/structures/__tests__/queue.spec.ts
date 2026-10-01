import { describe, it, expect } from 'vitest'
import { Queue } from '../queue'

describe('Queue', () => {
  it('segue a ordem FIFO', () => {
    const q = new Queue<number>()
    q.enqueue(12)
    q.enqueue(45)
    q.enqueue(7)
    expect(q.dequeue()).toBe(12)
    expect(q.dequeue()).toBe(45)
    expect(q.dequeue()).toBe(7)
  })

  it('peek lê o head sem remover', () => {
    const q = new Queue<number>()
    q.enqueue(1)
    q.enqueue(2)
    expect(q.peek()).toBe(1)
    expect(q.length).toBe(2)
  })

  it('queue vazia devolve null', () => {
    const q = new Queue<number>()
    expect(q.isEmpty()).toBe(true)
    expect(q.dequeue()).toBeNull()
    expect(q.peek()).toBeNull()
  })

  it('continua a funcionar depois de esvaziar (tail é reposto)', () => {
    const q = new Queue<number>()
    q.enqueue(1)
    q.dequeue()
    q.enqueue(2)
    q.enqueue(3)
    expect(q.dequeue()).toBe(2)
    expect(q.dequeue()).toBe(3)
    expect(q.isEmpty()).toBe(true)
  })
})
