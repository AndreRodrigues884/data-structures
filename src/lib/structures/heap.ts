// Binary Heap — implementado como array, sem ponteiros
export type HeapType = 'max' | 'min'

export class Heap {
  private data: number[] = []
  private isMax: boolean

  constructor(type: HeapType = 'max') {
    this.isMax = type === 'max'
  }

  private compare(a: number, b: number): boolean {
    return this.isMax ? a > b : a < b
  }

  private parent(i: number) {
    return Math.floor((i - 1) / 2)
  }

  private left(i: number) {
    return 2 * i + 1
  }

  private right(i: number) {
    return 2 * i + 2
  }

  private swap(i: number, j: number) {
    ;[this.data[i], this.data[j]] = [this.data[j]!, this.data[i]!]
  }

  // O(log n) — insere e faz bubble up
  push(value: number): void {
    this.data.push(value)
    let i = this.data.length - 1
    while (i > 0) {
      const p = this.parent(i)
      if (this.compare(this.data[i]!, this.data[p]!)) {
        this.swap(i, p)
        i = p
      } else break
    }
  }

  // O(log n) — remove a raiz e faz bubble down
  pop(): number | undefined {
    if (this.data.length === 0) return undefined
    const root = this.data[0]
    const last = this.data.pop()!
    if (this.data.length > 0) {
      this.data[0] = last
      this.bubbleDown(0)
    }
    return root
  }

  private bubbleDown(i: number): void {
    const n = this.data.length
    while (true) {
      let target = i
      const l = this.left(i)
      const r = this.right(i)
      if (l < n && this.compare(this.data[l]!, this.data[target]!)) target = l
      if (r < n && this.compare(this.data[r]!, this.data[target]!)) target = r
      if (target === i) break
      this.swap(i, target)
      i = target
    }
  }

  // O(1) — lê a raiz sem remover
  peek(): number | undefined {
    return this.data[0]
  }

  toArray(): number[] {
    return [...this.data]
  }

  get size(): number {
    return this.data.length
  }
}

// O(n log n) — ordena extraindo a raiz repetidamente
export function heapSort(values: number[], order: 'asc' | 'desc' = 'asc'): number[] {
  const heap = new Heap(order === 'asc' ? 'min' : 'max')
  for (const v of values) heap.push(v)
  const result: number[] = []
  while (heap.size > 0) result.push(heap.pop()!)
  return result
}
