# Disjoint Set (Union-Find) em Python
# Union by Rank + Path Compression

class DisjointSet:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank   = [0] * n

    # O(α(n)) — path compression
    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    # O(α(n)) — union by rank
    def union(self, x: int, y: int) -> bool:
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False

        if   self.rank[rx] < self.rank[ry]: self.parent[rx] = ry
        elif self.rank[rx] > self.rank[ry]: self.parent[ry] = rx
        else:
            self.parent[ry] = rx
            self.rank[rx] += 1
        return True

    def connected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)


# Uso
ds = DisjointSet(5)
ds.union(0, 1)
ds.union(2, 3)
ds.union(0, 2)

assert ds.connected(1, 3)
assert not ds.connected(1, 4)
assert ds.find(3) == 0


# Caso de uso — detetar ciclos
def has_cycle(n: int, edges: list) -> bool:
    ds = DisjointSet(n)
    for u, v in edges:
        if not ds.union(u, v):
            return True  # já conectados = ciclo
    return False
