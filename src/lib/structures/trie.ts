// Trie (Prefix Tree) — insert/search/startsWith/delete em O(m), m = tamanho da palavra
class TrieNode {
  children = new Map<string, TrieNode>()
  isEndOfWord = false
}

export class Trie {
  private root = new TrieNode()

  // O(m) — insere uma palavra
  insert(word: string): void {
    let node = this.root
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode())
      node = node.children.get(ch)!
    }
    node.isEndOfWord = true
  }

  // O(m) — verifica se a palavra exata existe
  search(word: string): boolean {
    const node = this.walk(word)
    return node !== null && node.isEndOfWord
  }

  // O(m) — verifica se alguma palavra começa pelo prefixo
  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null
  }

  // O(m) — percorre os nós de uma string; null se o caminho não existir
  private walk(str: string): TrieNode | null {
    let node = this.root
    for (const ch of str) {
      const next = node.children.get(ch)
      if (!next) return null
      node = next
    }
    return node
  }

  // O(m) — remove uma palavra e limpa nós órfãos
  delete(word: string): void {
    const dfs = (node: TrieNode, i: number): boolean => {
      if (i === word.length) {
        if (!node.isEndOfWord) return false
        node.isEndOfWord = false
        return node.children.size === 0
      }
      const ch = word[i]!
      const child = node.children.get(ch)
      if (!child) return false

      const shouldPrune = dfs(child, i + 1)
      if (shouldPrune) node.children.delete(ch)
      return node.children.size === 0 && !node.isEndOfWord
    }
    dfs(this.root, 0)
  }

  // O(n) — conta os nós (sem a raiz); útil para verificar a limpeza no delete
  get nodeCount(): number {
    const count = (node: TrieNode): number =>
      [...node.children.values()].reduce((sum, child) => sum + 1 + count(child), 0)
    return count(this.root)
  }
}
