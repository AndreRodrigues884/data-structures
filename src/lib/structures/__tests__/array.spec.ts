import { describe, it, expect, beforeEach } from 'vitest'
import { DynamicArray } from '../array'

describe('DynamicArray', () => {
  let arr: DynamicArray<number>

  beforeEach(() => {
    arr = new DynamicArray<number>()
    ;[12, 45, 7].forEach((v) => arr.push(v))
  })

  it('acede por índice', () => {
    expect(arr.get(0)).toBe(12)
    expect(arr.get(2)).toBe(7)
    expect(arr.get(99)).toBeUndefined()
  })

  it('insere no meio fazendo shift', () => {
    arr.insertAt(1, 99)
    expect(arr.toArray()).toEqual([12, 99, 45, 7])
  })

  it('insere no fim com insertAt(length)', () => {
    arr.insertAt(3, 1)
    expect(arr.toArray()).toEqual([12, 45, 7, 1])
  })

  it('rejeita índices fora dos limites no insertAt', () => {
    expect(() => arr.insertAt(-1, 0)).toThrow(RangeError)
    expect(() => arr.insertAt(4, 0)).toThrow(RangeError)
  })

  it('remove do meio e devolve o valor', () => {
    expect(arr.removeAt(1)).toBe(45)
    expect(arr.toArray()).toEqual([12, 7])
    expect(arr.length).toBe(2)
  })

  it('removeAt fora dos limites não altera o array', () => {
    expect(arr.removeAt(-1)).toBeUndefined()
    expect(arr.removeAt(3)).toBeUndefined()
    expect(arr.length).toBe(3)
  })

  it('pesquisa linear devolve o índice ou -1', () => {
    expect(arr.search(45)).toBe(1)
    expect(arr.search(1000)).toBe(-1)
  })
})
