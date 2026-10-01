// Bloom Filter — 3 funções de hash sobre um array de bits
export class BloomFilter {
  private bits: number[]

  constructor(private size = 64) {
    this.bits = new Array(size).fill(0)
  }

  private hash1(word: string): number {
    let h = 0
    for (const c of word) h = (h * 31 + c.charCodeAt(0)) % this.size
    return h
  }

  private hash2(word: string): number {
    let h = 5381
    for (const c of word) h = ((h << 5) + h + c.charCodeAt(0)) % this.size
    return Math.abs(h)
  }

  private hash3(word: string): number {
    let h = 0
    for (let i = 0; i < word.length; i++) h = (h + word.charCodeAt(i) * (i + 1)) % this.size
    return h
  }

  getHashes(word: string): number[] {
    return [this.hash1(word), this.hash2(word), this.hash3(word)]
  }

  // O(k) — insere elemento
  add(word: string): void {
    for (const h of this.getHashes(word)) this.bits[h] = 1
  }

  // O(k) — false = de certeza que não está; true = provavelmente está
  has(word: string): boolean {
    return this.getHashes(word).every((h) => this.bits[h] === 1)
  }
}
