# Heap em Python
# heapq é a implementação nativa — sempre Min Heap

import heapq

# Min Heap nativo
min_heap = []
heapq.heappush(min_heap, 3)
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 5)
min_heap[0]              # peek → 3
heapq.heappop(min_heap)  # pop  → 3

# Max Heap — inverte os valores
max_heap = []
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -10)
heapq.heappush(max_heap, -5)
-max_heap[0]              # peek → 10
-heapq.heappop(max_heap) # pop  → 10


# Implementação manual
class Heap:
    def __init__(self, heap_type='max'):
        self.data = []
        self.is_max = heap_type == 'max'

    def _compare(self, a, b):
        return a > b if self.is_max else a < b

    # O(log n)
    def push(self, value):
        self.data.append(value)
        i = len(self.data) - 1
        while i > 0:
            p = (i - 1) // 2
            if self._compare(self.data[i], self.data[p]):
                self.data[i], self.data[p] = self.data[p], self.data[i]
                i = p
            else: break

    # O(log n)
    def pop(self):
        if not self.data: return None
        root = self.data[0]
        self.data[0] = self.data.pop()
        self._bubble_down(0)
        return root

    def _bubble_down(self, i):
        n = len(self.data)
        while True:
            target = i
            l, r = 2*i+1, 2*i+2
            if l < n and self._compare(self.data[l], self.data[target]): target = l
            if r < n and self._compare(self.data[r], self.data[target]): target = r
            if target == i: break
            self.data[i], self.data[target] = self.data[target], self.data[i]
            i = target

    def peek(self):
        return self.data[0] if self.data else None
