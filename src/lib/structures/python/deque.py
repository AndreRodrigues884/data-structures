# Deque em Python
# collections.deque é a implementação nativa otimizada

from collections import deque

class Deque:
    def __init__(self):
        self.data = deque()

    # O(1)
    def push_front(self, value):
        self.data.appendleft(value)

    # O(1)
    def push_back(self, value):
        self.data.append(value)

    # O(1)
    def pop_front(self):
        if not self.data:
            return None
        return self.data.popleft()

    # O(1)
    def pop_back(self):
        if not self.data:
            return None
        return self.data.pop()

    def peek_front(self):
        return self.data[0] if self.data else None

    def peek_back(self):
        return self.data[-1] if self.data else None

    def is_empty(self) -> bool:
        return len(self.data) == 0


# Uso
dq = Deque()
dq.push_back(1)
dq.push_back(2)
dq.push_front(0)   # [0, 1, 2]
assert dq.pop_front() == 0  # [1, 2]
assert dq.pop_back() == 2  # [1]
