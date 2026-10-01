import { describe, it, expect } from 'vitest'
import { Stack, isBalanced } from '../stack'

describe('Stack', () => {
  it('segue a ordem LIFO', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
  })

  it('peek lê o topo sem remover', () => {
    const stack = new Stack<string>()
    stack.push('a')
    stack.push('b')
    expect(stack.peek()).toBe('b')
    expect(stack.size).toBe(2)
  })

  it('stack vazia devolve undefined e isEmpty true', () => {
    const stack = new Stack<number>()
    expect(stack.isEmpty()).toBe(true)
    expect(stack.pop()).toBeUndefined()
    expect(stack.peek()).toBeUndefined()
    expect(stack.size).toBe(0)
  })
})

describe('isBalanced', () => {
  it.each([
    ['([{}])', true],
    ['()[]{}', true],
    ['', true],
    ['a(b)c', true],
    ['([)]', false],
    ['((', false],
    ['))', false],
    ['}', false],
  ])('isBalanced(%j) → %s', (expr, expected) => {
    expect(isBalanced(expr)).toBe(expected)
  })
})
