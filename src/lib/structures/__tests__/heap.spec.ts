import { describe, it, expect } from 'vitest'
import { Heap, heapSort } from '../heap'

// verifica a heap property: cada pai é >= (max) ou <= (min) que os filhos
function isValidHeap(data: number[], type: 'max' | 'min'): boolean {
  for (let i = 1; i < data.length; i++) {
    const parent = data[Math.floor((i - 1) / 2)]!
    if (type === 'max' ? parent < data[i]! : parent > data[i]!) return false
  }
  return true
}

describe('Heap', () => {
  it('max heap: peek/pop devolvem sempre o máximo', () => {
    const heap = new Heap('max')
    ;[3, 10, 5].forEach((v) => heap.push(v))
    expect(heap.peek()).toBe(10)
    expect(heap.pop()).toBe(10)
    expect(heap.peek()).toBe(5)
  })

  it('min heap: peek/pop devolvem sempre o mínimo', () => {
    const heap = new Heap('min')
    ;[3, 10, 5].forEach((v) => heap.push(v))
    expect(heap.peek()).toBe(3)
    expect(heap.pop()).toBe(3)
    expect(heap.peek()).toBe(5)
  })

  it('heap vazio devolve undefined', () => {
    const heap = new Heap()
    expect(heap.pop()).toBeUndefined()
    expect(heap.peek()).toBeUndefined()
  })

  it.each(['max', 'min'] as const)('%s heap mantém a heap property após pushes e pops aleatórios', (type) => {
    const heap = new Heap(type)
    let seed = 42
    const random = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) % 1000

    for (let i = 0; i < 200; i++) {
      if (heap.size > 0 && random() % 3 === 0) heap.pop()
      else heap.push(random())
      expect(isValidHeap(heap.toArray(), type)).toBe(true)
    }
  })

  it('lida com valores repetidos', () => {
    const heap = new Heap('max')
    ;[5, 5, 5, 1].forEach((v) => heap.push(v))
    expect([heap.pop(), heap.pop(), heap.pop(), heap.pop()]).toEqual([5, 5, 5, 1])
  })
})

describe('heapSort', () => {
  const input = [100, 19, 36, 17, 3, 25, 1, 2, 7]

  it('ordena por ordem crescente', () => {
    expect(heapSort(input)).toEqual([...input].sort((a, b) => a - b))
  })

  it('ordena por ordem decrescente', () => {
    expect(heapSort(input, 'desc')).toEqual([...input].sort((a, b) => b - a))
  })

  it('não altera o array original', () => {
    const copy = [...input]
    heapSort(input)
    expect(input).toEqual(copy)
  })
})
