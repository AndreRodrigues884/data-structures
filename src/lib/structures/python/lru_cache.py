# LRU Cache em Python
# OrderedDict mantém ordem de inserção → get/put em O(1)

from collections import OrderedDict


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache: OrderedDict[int, str] = OrderedDict()

    # O(1) — lê e marca como recém-usado
    def get(self, key: int) -> str:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key, last=False)  # move para o head
        return self.cache[key]

    # O(1) — insere/atualiza; remove o LRU se exceder capacidade
    def put(self, key: int, value: str) -> None:
        if key in self.cache:
            del self.cache[key]
        elif len(self.cache) >= self.capacity:
            self.cache.popitem(last=True)  # remove o LRU (fim do dict)

        self.cache[key] = value
        self.cache.move_to_end(key, last=False)  # coloca no head


# Uso
cache = LRUCache(3)
cache.put(1, 'a')
cache.put(2, 'b')
cache.put(3, 'c')
assert cache.get(1) == 'a'  # 1 passa a MRU
cache.put(4, 'd')      # cheia — remove 2 (LRU)
assert cache.get(2) == -1  # foi removido
