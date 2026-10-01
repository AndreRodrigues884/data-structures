// Disjoint Set (Union-Find) — Union by Rank + Path Compression → O(α(n)) amortizado
export class DisjointSet {
  private parent: number[]
  private rank: number[]

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = new Array(n).fill(0)
  }

  // O(α(n)) — encontra a raiz com path compression
  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]!)
    return this.parent[x]!
  }

  // O(α(n)) — une dois conjuntos por rank
  union(x: number, y: number): boolean {
    const rootX = this.find(x)
    const rootY = this.find(y)
    if (rootX === rootY) return false // já no mesmo conjunto

    // a árvore com menor rank fica por baixo
    if (this.rank[rootX]! < this.rank[rootY]!) {
      this.parent[rootX] = rootY
    } else if (this.rank[rootX]! > this.rank[rootY]!) {
      this.parent[rootY] = rootX
    } else {
      this.parent[rootY] = rootX
      this.rank[rootX]!++
    }
    return true
  }

  // O(α(n)) — verifica se estão no mesmo conjunto
  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y)
  }
}

// Caso de uso — detetar ciclos num grafo não-dirigido
export function hasCycle(n: number, edges: [number, number][]): boolean {
  const ds = new DisjointSet(n)
  for (const [u, v] of edges) {
    if (!ds.union(u, v)) return true // já conectados = ciclo
  }
  return false
}
