// Singly Linked List com tail pointer
class ListNode<T> {
  next: ListNode<T> | null = null
  constructor(public value: T) {}
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null
  private tail: ListNode<T> | null = null
  private size = 0

  // O(1) — inserção no início
  prepend(value: T): void {
    const node = new ListNode(value)
    if (!this.head) {
      this.head = this.tail = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.size++
  }

  // O(1) — inserção no fim (com tail pointer)
  append(value: T): void {
    const node = new ListNode(value)
    if (!this.tail) {
      this.head = this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.size++
  }

  // O(1) — remoção do início
  removeHead(): T | null {
    if (!this.head) return null
    const val = this.head.value
    this.head = this.head.next
    if (!this.head) this.tail = null
    this.size--
    return val
  }

  // O(n) — pesquisa
  search(value: T): number {
    let current = this.head
    let index = 0
    while (current) {
      if (current.value === value) return index
      current = current.next
      index++
    }
    return -1
  }

  toArray(): T[] {
    const result: T[] = []
    for (let node = this.head; node; node = node.next) result.push(node.value)
    return result
  }

  get length(): number {
    return this.size
  }
}
