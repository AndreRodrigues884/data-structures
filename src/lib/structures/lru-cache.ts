// LRU Cache — HashMap + lista duplamente ligada → get/put em O(1)
class DNode<K, V> {
  prev: DNode<K, V> | null = null
  next: DNode<K, V> | null = null
  constructor(
    public key: K,
    public value: V,
  ) {}
}

export class LRUCache<K, V> {
  private map = new Map<K, DNode<K, V>>()
  // nós sentinela — evitam verificações de null nas pontas
  private head = new DNode<K, V>(null as K, null as V)
  private tail = new DNode<K, V>(null as K, null as V)

  constructor(private capacity: number) {
    if (capacity < 1) throw new RangeError('a capacidade tem de ser pelo menos 1')
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  // O(1) — desliga um nó dos seus vizinhos
  private remove(node: DNode<K, V>): void {
    node.prev!.next = node.next
    node.next!.prev = node.prev
  }

  // O(1) — insere logo a seguir ao head (posição MRU)
  private insertAtHead(node: DNode<K, V>): void {
    node.next = this.head.next
    node.prev = this.head
    this.head.next!.prev = node
    this.head.next = node
  }

  // O(1) — lê e marca como recém-usado
  get(key: K): V | undefined {
    const node = this.map.get(key)
    if (!node) return undefined
    this.remove(node)
    this.insertAtHead(node)
    return node.value
  }

  // O(1) — insere/atualiza; remove o LRU se exceder a capacidade
  put(key: K, value: V): void {
    const existing = this.map.get(key)
    if (existing) {
      existing.value = value
      this.remove(existing)
      this.insertAtHead(existing)
      return
    }

    if (this.map.size >= this.capacity) {
      const lru = this.tail.prev!
      this.remove(lru)
      this.map.delete(lru.key)
    }

    const node = new DNode(key, value)
    this.map.set(key, node)
    this.insertAtHead(node)
  }

  // chaves do mais recente (MRU) para o menos recente (LRU)
  keys(): K[] {
    const result: K[] = []
    for (let node = this.head.next; node && node !== this.tail; node = node.next) result.push(node.key)
    return result
  }

  get size(): number {
    return this.map.size
  }
}
