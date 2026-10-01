# Binary Tree em Python

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left  = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None

    # O(n) — inorder: Left → Root → Right
    def inorder(self):
        result = []
        def visit(node):
            if not node: return
            visit(node.left)
            result.append(node.value)
            visit(node.right)
        visit(self.root)
        return result

    # O(n) — preorder: Root → Left → Right
    def preorder(self):
        result = []
        def visit(node):
            if not node: return
            result.append(node.value)
            visit(node.left)
            visit(node.right)
        visit(self.root)
        return result

    # O(n) — BFS: nível a nível
    def bfs(self):
        if not self.root: return []
        queue, result = [self.root], []
        while queue:
            node = queue.pop(0)
            result.append(node.value)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        return result

    # O(n) — altura da tree
    def height(self):
        def depth(node):
            if not node: return -1
            return 1 + max(depth(node.left), depth(node.right))
        return depth(self.root)


# Uso
tree = BinaryTree()
tree.root = TreeNode(1)
tree.root.left  = TreeNode(2)
tree.root.right = TreeNode(3)
tree.root.left.left  = TreeNode(4)
tree.root.left.right = TreeNode(5)

assert tree.inorder() == [4, 2, 5, 1, 3]
assert tree.preorder() == [1, 2, 4, 5, 3]
assert tree.bfs() == [1, 2, 3, 4, 5]
assert tree.height() == 2
