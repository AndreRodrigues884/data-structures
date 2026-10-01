# Bloom Filter em Python

class BloomFilter:
    def __init__(self, size=64):
        self.size = size
        self.bits = [0] * size

    def _hash1(self, word: str) -> int:
        h = 0
        for c in word:
            h = (h * 31 + ord(c)) % self.size
        return h

    def _hash2(self, word: str) -> int:
        h = 5381
        for c in word:
            h = ((h << 5) + h + ord(c)) % self.size
        return abs(h)

    def _hash3(self, word: str) -> int:
        return sum(ord(c) * (i + 1) for i, c in enumerate(word)) % self.size

    def _hashes(self, word):
        return [self._hash1(word), self._hash2(word), self._hash3(word)]

    # O(k)
    def add(self, word: str):
        for h in self._hashes(word):
            self.bits[h] = 1

    # O(k)
    def has(self, word: str) -> bool:
        return all(self.bits[h] == 1 for h in self._hashes(word))


# Uso
bf = BloomFilter(64)
bf.add('hello')
bf.add('world')

assert bf.has('hello')  # verdadeiro positivo
assert not bf.has('foo')  # definitivamente não está

# Falso positivo — com poucos bits, palavras diferentes acabam por partilhar posições
small = BloomFilter(16)
small.add('hello')
small.add('world')
assert small.has('set')  # True, mas 'set' nunca foi inserido!
