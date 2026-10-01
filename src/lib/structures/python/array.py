# Array em Python
# Python usa listas dinâmicas por defeito

class DynamicArray:
    def __init__(self):
        self.data = []

    # O(1) — acesso direto por índice
    def get(self, index: int):
        return self.data[index]

    # O(1) amortizado — inserção no fim
    def push(self, value):
        self.data.append(value)

    # O(n) — inserção no meio
    def insert_at(self, index: int, value):
        self.data.insert(index, value)

    # O(n) — remoção por índice
    def remove_at(self, index: int):
        return self.data.pop(index)

    # O(n) — pesquisa linear
    def search(self, value) -> int:
        for i, item in enumerate(self.data):
            if item == value:
                return i
        return -1

    def __len__(self):
        return len(self.data)


# Uso
arr = DynamicArray()
arr.push(12)
arr.push(45)
arr.push(7)
arr.insert_at(1, 99)  # [12, 99, 45, 7]
arr.remove_at(2)        # [12, 99, 7]
assert arr.search(99) == 1
