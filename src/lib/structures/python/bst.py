# Binary Search Tree em Python

class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left  = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    # O(log n) médio
    def insert(self, value):
        if not self.root:
            self.root = BSTNode(value); return
        curr = self.root
        while True:
            if value < curr.value:
                if not curr.left: curr.left = BSTNode(value); break
                curr = curr.left
            else:
                if not curr.right: curr.right = BSTNode(value); break
                curr = curr.right

    # O(log n) médio
    def search(self, value) -> bool:
        curr = self.root
        while curr:
            if value == curr.value: return True
            curr = curr.left if value < curr.value else curr.right
        return False

    # O(n) — inorder: produz lista ordenada
    def inorder(self):
        result = []
        def visit(node):
            if not node: return
            visit(node.left)
            result.append(node.value)
            visit(node.right)
        visit(self.root)
        return result

    def min(self):
        curr = self.root
        while curr and curr.left: curr = curr.left
        return curr.value if curr else None

    def max(self):
        curr = self.root
        while curr and curr.right: curr = curr.right
        return curr.value if curr else None


# Uso
bst = BST()
for v in [8, 3, 10, 1, 6, 14, 4, 7, 13]:
    bst.insert(v)

assert bst.search(7)
assert bst.min() == 1
assert bst.max() == 14
assert bst.inorder() == [1,3,4,6,7,8,10,13,14]
