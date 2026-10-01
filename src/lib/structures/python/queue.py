# Queue em Python
# collections.deque é a implementação eficiente nativa

from collections import deque

class Queue:
    def __init__(self):
        self.data = deque()

    # O(1) — adiciona no tail
    def enqueue(self, value):
        self.data.append(value)

    # O(1) — remove do head
    def dequeue(self):
        if self.is_empty():
            return None
        return self.data.popleft()

    # O(1) — lê o head sem remover
    def peek(self):
        if self.is_empty():
            return None
        return self.data[0]

    def is_empty(self) -> bool:
        return len(self.data) == 0

    def __len__(self):
        return len(self.data)


# Uso
q = Queue()
q.enqueue(12)
q.enqueue(45)
q.enqueue(7)
assert q.peek() == 12
assert q.dequeue() == 12  # FIFO
assert q.dequeue() == 45
