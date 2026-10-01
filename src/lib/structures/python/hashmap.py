# HashMap em Python
# Python dict é um HashMap nativo altamente otimizado

class HashMap:
    def __init__(self, size=53):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key: str) -> int:
        h = 0
        for char in key:
            h = (h * 31 + ord(char)) % self.size
        return h

    # O(1) médio
    def set(self, key: str, value):
        idx = self._hash(key)
        for pair in self.buckets[idx]:
            if pair[0] == key:
                pair[1] = value
                return
        self.buckets[idx].append([key, value])

    # O(1) médio
    def get(self, key: str):
        for pair in self.buckets[self._hash(key)]:
            if pair[0] == key:
                return pair[1]
        return None

    # O(1) médio
    def delete(self, key: str) -> bool:
        idx = self._hash(key)
        for i, pair in enumerate(self.buckets[idx]):
            if pair[0] == key:
                self.buckets[idx].pop(i)
                return True
        return False

    def has(self, key: str) -> bool:
        return self.get(key) is not None


# Padrão — Two Sum em O(n)
def two_sum(nums: list, target: int) -> list:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

assert two_sum([2, 7, 11, 15], 9) == [0, 1]
