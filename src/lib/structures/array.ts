// Array dinâmico — wrapper com operações explícitas para fins didáticos
export class DynamicArray<T> {
  private data: T[] = []

  // O(1) — acesso direto por índice
  get(index: number): T | undefined {
    return this.data[index]
  }

  // O(1) amortizado — inserção no fim
  push(value: T): void {
    this.data.push(value)
  }

  // O(n) — inserção no meio (shift de elementos)
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this.data.length) throw new RangeError(`índice inválido: ${index}`)
    this.data.splice(index, 0, value)
  }

  // O(n) — remoção no meio (shift de elementos)
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.data.length) return undefined
    return this.data.splice(index, 1)[0]
  }

  // O(n) — pesquisa linear
  search(value: T): number {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === value) return i
    }
    return -1
  }

  toArray(): T[] {
    return [...this.data]
  }

  get length(): number {
    return this.data.length
  }
}
