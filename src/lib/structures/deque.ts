// Deque — implementado com Doubly Linked List para O(1) em ambas as extremidades
class DequeNode<T> {
  prev: DequeNode<T> | null = null
  next: DequeNode<T> | null = null
  constructor(public value: T) {}
}

export class Deque<T> {
  private front: DequeNode<T> | null = null
  private back: DequeNode<T> | null = null
  private size = 0

  // O(1)
  pushFront(value: T): void {
    const node = new DequeNode(value)
    if (!this.front) {
      this.front = this.back = node
    } else {
      node.next = this.front
      this.front.prev = node
      this.front = node
    }
    this.size++
  }

  // O(1)
  pushBack(value: T): void {
    const node = new DequeNode(value)
    if (!this.back) {
      this.front = this.back = node
    } else {
      node.prev = this.back
      this.back.next = node
      this.back = node
    }
    this.size++
  }

  // O(1)
  popFront(): T | null {
    if (!this.front) return null
    const val = this.front.value
    this.front = this.front.next
    if (this.front) this.front.prev = null
    else this.back = null
    this.size--
    return val
  }

  // O(1)
  popBack(): T | null {
    if (!this.back) return null
    const val = this.back.value
    this.back = this.back.prev
    if (this.back) this.back.next = null
    else this.front = null
    this.size--
    return val
  }

  peekFront(): T | null {
    return this.front?.value ?? null
  }

  peekBack(): T | null {
    return this.back?.value ?? null
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  get length(): number {
    return this.size
  }
}
