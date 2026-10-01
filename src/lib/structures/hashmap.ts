// HashMap — chaining para resolver colisões
export class HashMap<V> {
  private buckets: Array<Array<[string, V]>>
  private count = 0

  constructor(private capacity = 53) {
    this.buckets = Array.from({ length: capacity }, () => [])
  }

  hash(key: string): number {
    let h = 0
    for (const char of key) h = (h * 31 + char.charCodeAt(0)) % this.capacity
    return h
  }

  // O(1) médio
  set(key: string, value: V): void {
    const bucket = this.buckets[this.hash(key)]!
    const existing = bucket.findIndex(([k]) => k === key)
    if (existing >= 0) {
      bucket[existing] = [key, value]
    } else {
      bucket.push([key, value])
      this.count++
    }
  }

  // O(1) médio
  get(key: string): V | undefined {
    const bucket = this.buckets[this.hash(key)]!
    return bucket.find(([k]) => k === key)?.[1]
  }

  // O(1) médio
  delete(key: string): boolean {
    const bucket = this.buckets[this.hash(key)]!
    const idx = bucket.findIndex(([k]) => k === key)
    if (idx < 0) return false
    bucket.splice(idx, 1)
    this.count--
    return true
  }

  // O(1) médio — procura a chave (não o valor), por isso funciona com valores undefined
  has(key: string): boolean {
    return this.buckets[this.hash(key)]!.some(([k]) => k === key)
  }

  get length(): number {
    return this.count
  }
}

// Padrão — Two Sum em O(n)
export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]!
    if (seen.has(complement)) return [seen.get(complement)!, i]
    seen.set(nums[i]!, i)
  }
  return []
}
