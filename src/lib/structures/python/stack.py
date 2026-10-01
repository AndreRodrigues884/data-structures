# Stack em Python

class Stack:
    def __init__(self):
        self.data = []

    # O(1) — adiciona no topo
    def push(self, value):
        self.data.append(value)

    # O(1) — remove e devolve o topo
    def pop(self):
        if self.is_empty():
            return None
        return self.data.pop()

    # O(1) — lê o topo sem remover
    def peek(self):
        if self.is_empty():
            return None
        return self.data[-1]

    # O(1) — verifica se está vazia
    def is_empty(self) -> bool:
        return len(self.data) == 0

    def __len__(self):
        return len(self.data)


# Caso de uso — validar parênteses
def is_balanced(expr: str) -> bool:
    stack = Stack()
    pairs = {')': '(', ']': '[', '}': '{'}

    for char in expr:
        if char in '([{':
            stack.push(char)
        elif char in pairs:
            if stack.peek() != pairs[char]:
                return False
            stack.pop()

    return stack.is_empty()


assert is_balanced('([{}])')
assert not is_balanced('([)]')
