# Singly Linked List em Python

class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    # O(1) — inserção no início
    def prepend(self, value):
        node = ListNode(value)
        if not self.head:
            self.head = self.tail = node
        else:
            node.next = self.head
            self.head = node
        self.size += 1

    # O(1) — inserção no fim (com tail pointer)
    def append(self, value):
        node = ListNode(value)
        if not self.tail:
            self.head = self.tail = node
        else:
            self.tail.next = node
            self.tail = node
        self.size += 1

    # O(1) — remoção do início
    def remove_head(self):
        if not self.head:
            return None
        val = self.head.value
        self.head = self.head.next
        if not self.head:
            self.tail = None
        self.size -= 1
        return val

    # O(n) — pesquisa
    def search(self, value) -> int:
        current = self.head
        index = 0
        while current:
            if current.value == value:
                return index
            current = current.next
            index += 1
        return -1

# Uso
ll = LinkedList()
ll.append(12)
ll.append(45)
ll.prepend(99)    # [99, 12, 45]
ll.remove_head()     # [12, 45]
assert ll.search(45) == 1
