// Stack (LIFO) — implementada com array interno
export class Stack<T> {
  private data: T[] = []

  // O(1) — adiciona no topo
  push(value: T): void {
    this.data.push(value)
  }

  // O(1) — remove e devolve o topo
  pop(): T | undefined {
    return this.data.pop()
  }

  // O(1) — lê o topo sem remover
  peek(): T | undefined {
    return this.data[this.data.length - 1]
  }

  // O(1) — verifica se está vazia
  isEmpty(): boolean {
    return this.data.length === 0
  }

  get size(): number {
    return this.data.length
  }
}

// Caso de uso — validar parênteses
export function isBalanced(expr: string): boolean {
  const stack = new Stack<string>()
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' }

  for (const char of expr) {
    if ('([{'.includes(char)) {
      stack.push(char)
    } else if (pairs[char]) {
      if (stack.peek() !== pairs[char]) return false
      stack.pop()
    }
  }
  return stack.isEmpty()
}
