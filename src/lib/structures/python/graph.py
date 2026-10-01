# Graph em Python — Adjacency List

from collections import deque

class Graph:
    def __init__(self):
        self.adjacency = {}

    # O(1)
    def add_vertex(self, id):
        if id not in self.adjacency:
            self.adjacency[id] = []

    # O(1)
    def add_edge(self, from_v, to_v, directed=False):
        self.adjacency[from_v].append(to_v)
        if not directed:
            self.adjacency[to_v].append(from_v)

    # O(V + E) — BFS
    def bfs(self, start) -> list:
        visited = {start}
        queue   = deque([start])
        result  = []

        while queue:
            node = queue.popleft()
            result.append(node)
            for neighbor in self.adjacency.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return result

    # O(V + E) — DFS
    def dfs(self, start) -> list:
        visited = set()
        result  = []

        def explore(node):
            visited.add(node)
            result.append(node)
            for neighbor in self.adjacency.get(node, []):
                if neighbor not in visited:
                    explore(neighbor)

        explore(start)
        return result

    # O(V + E) — verifica caminho
    def has_path(self, from_v, to_v) -> bool:
        return to_v in self.bfs(from_v)


# Uso
g = Graph()
for v in ['A', 'B', 'C', 'D', 'E']:
    g.add_vertex(v)

g.add_edge('A', 'B')
g.add_edge('A', 'C')
g.add_edge('B', 'D')
g.add_edge('C', 'E')

assert g.bfs('A') == ['A','B','C','D','E']
assert g.dfs('A') == ['A','B','D','C','E']
assert g.has_path('A', 'E')
