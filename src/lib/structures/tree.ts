// Binary Tree com as 4 travessias clássicas
export class TreeNode<T> {
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  constructor(public value: T) {}
}

export class BinaryTree<T> {
  root: TreeNode<T> | null = null

  // O(n) — inorder: Left → Root → Right
  inorder(node = this.root, result: T[] = []): T[] {
    if (!node) return result
    this.inorder(node.left, result)
    result.push(node.value)
    this.inorder(node.right, result)
    return result
  }

  // O(n) — preorder: Root → Left → Right
  preorder(node = this.root, result: T[] = []): T[] {
    if (!node) return result
    result.push(node.value)
    this.preorder(node.left, result)
    this.preorder(node.right, result)
    return result
  }

  // O(n) — postorder: Left → Right → Root
  postorder(node = this.root, result: T[] = []): T[] {
    if (!node) return result
    this.postorder(node.left, result)
    this.postorder(node.right, result)
    result.push(node.value)
    return result
  }

  // O(n) — BFS: nível a nível
  bfs(): T[] {
    if (!this.root) return []
    const queue = [this.root]
    const result: T[] = []
    while (queue.length) {
      const node = queue.shift()!
      result.push(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    return result
  }

  // O(n) — altura da tree (-1 para tree vazia)
  height(node = this.root): number {
    if (!node) return -1
    return 1 + Math.max(this.height(node.left), this.height(node.right))
  }
}
