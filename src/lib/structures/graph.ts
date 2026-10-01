// Graph — Adjacency List
export class Graph {
  private adjacency = new Map<string, string[]>()

  // O(1)
  addVertex(id: string): void {
    if (!this.adjacency.has(id)) this.adjacency.set(id, [])
  }

  // O(1) — cria os vértices se ainda não existirem
  addEdge(from: string, to: string, directed = false): void {
    this.addVertex(from)
    this.addVertex(to)
    this.adjacency.get(from)!.push(to)
    if (!directed) this.adjacency.get(to)!.push(from)
  }

  neighbors(id: string): string[] {
    return [...(this.adjacency.get(id) ?? [])]
  }

  // O(V + E) — Breadth-First Search
  bfs(start: string): string[] {
    if (!this.adjacency.has(start)) return []
    const visited = new Set<string>([start])
    const queue = [start]
    const result: string[] = []

    while (queue.length) {
      const node = queue.shift()!
      result.push(node)
      for (const neighbor of this.adjacency.get(node) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }
    return result
  }

  // O(V + E) — Depth-First Search
  dfs(start: string): string[] {
    if (!this.adjacency.has(start)) return []
    const visited = new Set<string>()
    const result: string[] = []

    const explore = (node: string) => {
      visited.add(node)
      result.push(node)
      for (const neighbor of this.adjacency.get(node) ?? []) {
        if (!visited.has(neighbor)) explore(neighbor)
      }
    }

    explore(start)
    return result
  }

  // O(V + E) — verifica se existe caminho
  hasPath(from: string, to: string): boolean {
    return this.bfs(from).includes(to)
  }
}
