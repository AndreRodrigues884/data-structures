// Queue (FIFO) — implementada com Linked List para O(1) em ambas as operações
class QueueNode<T> {
  next: QueueNode<T> | null = null
  constructor(public value: T) {}
}

export class Queue<T> {
  private head: QueueNode<T> | null = null
  private tail: QueueNode<T> | null = null
  private size = 0

  // O(1) — adiciona no tail
  enqueue(value: T): void {
    const node = new QueueNode(value)
    if (!this.tail) {
      this.head = this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.size++
  }

  // O(1) — remove do head
  dequeue(): T | null {
    if (!this.head) return null
    const val = this.head.value
    this.head = this.head.next
    if (!this.head) this.tail = null
    this.size--
    return val
  }

  // O(1) — lê o head sem remover
  peek(): T | null {
    return this.head?.value ?? null
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  get length(): number {
    return this.size
  }
}
