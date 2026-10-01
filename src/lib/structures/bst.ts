// Binary Search Tree — esquerda < nó < direita
class BSTNode<T> {
  left: BSTNode<T> | null = null
  right: BSTNode<T> | null = null
  constructor(public value: T) {}
}

export class BST<T> {
  root: BSTNode<T> | null = null

  // O(log n) médio — insere mantendo a BST property (ignora duplicados)
  insert(value: T): void {
    const node = new BSTNode(value)
    if (!this.root) {
      this.root = node
      return
    }
    let curr = this.root
    while (true) {
      if (value === curr.value) return
      if (value < curr.value) {
        if (!curr.left) {
          curr.left = node
          return
        }
        curr = curr.left
      } else {
        if (!curr.right) {
          curr.right = node
          return
        }
        curr = curr.right
      }
    }
  }

  // O(log n) médio — pesquisa
  search(value: T): boolean {
    let curr = this.root
    while (curr) {
      if (value === curr.value) return true
      curr = value < curr.value ? curr.left : curr.right
    }
    return false
  }

  // O(n) — inorder: produz array ordenado
  inorder(node = this.root, result: T[] = []): T[] {
    if (!node) return result
    this.inorder(node.left, result)
    result.push(node.value)
    this.inorder(node.right, result)
    return result
  }

  // O(log n) médio — mínimo (nó mais à esquerda)
  min(node = this.root): T | null {
    if (!node) return null
    while (node.left) node = node.left
    return node.value
  }

  // O(log n) médio — máximo (nó mais à direita)
  max(node = this.root): T | null {
    if (!node) return null
    while (node.right) node = node.right
    return node.value
  }

  // O(log n) médio — remoção
  delete(value: T): void {
    this.root = this.deleteNode(this.root, value)
  }

  private deleteNode(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (!node) return null
    if (value < node.value) {
      node.left = this.deleteNode(node.left, value)
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value)
    } else {
      // caso 1: folha
      if (!node.left && !node.right) return null
      // caso 2: um filho
      if (!node.left) return node.right
      if (!node.right) return node.left
      // caso 3: dois filhos — substitui pelo inorder successor
      let successor = node.right
      while (successor.left) successor = successor.left
      node.value = successor.value
      node.right = this.deleteNode(node.right, successor.value)
    }
    return node
  }
}
