import { describe, it, expect } from 'vitest'
import { BinaryTree, TreeNode } from '../tree'

//        1
//       / \
//      2   3
//     / \
//    4   5
function buildTree() {
  const tree = new BinaryTree<number>()
  tree.root = new TreeNode(1)
  tree.root.left = new TreeNode(2)
  tree.root.right = new TreeNode(3)
  tree.root.left.left = new TreeNode(4)
  tree.root.left.right = new TreeNode(5)
  return tree
}

describe('BinaryTree', () => {
  it('inorder: Left → Root → Right', () => {
    expect(buildTree().inorder()).toEqual([4, 2, 5, 1, 3])
  })

  it('preorder: Root → Left → Right', () => {
    expect(buildTree().preorder()).toEqual([1, 2, 4, 5, 3])
  })

  it('postorder: Left → Right → Root', () => {
    expect(buildTree().postorder()).toEqual([4, 5, 2, 3, 1])
  })

  it('bfs: nível a nível', () => {
    expect(buildTree().bfs()).toEqual([1, 2, 3, 4, 5])
  })

  it('height conta arestas no caminho mais longo', () => {
    expect(buildTree().height()).toBe(2)
  })

  it('tree vazia', () => {
    const tree = new BinaryTree<number>()
    expect(tree.inorder()).toEqual([])
    expect(tree.bfs()).toEqual([])
    expect(tree.height()).toBe(-1)
  })

  it('chamadas repetidas não acumulam resultados', () => {
    const tree = buildTree()
    tree.inorder()
    expect(tree.inorder()).toEqual([4, 2, 5, 1, 3])
  })
})
