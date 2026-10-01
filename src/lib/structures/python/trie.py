# Trie (Prefix Tree) em Python
# insert/search/starts_with/delete → O(m), m = tamanho da palavra

class TrieNode:
    def __init__(self):
        self.children: dict[str, 'TrieNode'] = {}
        self.is_end_of_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    # O(m) — insere uma palavra
    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end_of_word = True

    # O(m) — verifica se a palavra exata existe
    def search(self, word: str) -> bool:
        node = self._walk(word)
        return node is not None and node.is_end_of_word

    # O(m) — verifica se algum prefixo existe
    def starts_with(self, prefix: str) -> bool:
        return self._walk(prefix) is not None

    def _walk(self, s: str):
        node = self.root
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    # O(m) — remove uma palavra e limpa nós órfãos
    def delete(self, word: str) -> None:
        def dfs(node: TrieNode, i: int) -> bool:
            if i == len(word):
                if not node.is_end_of_word:
                    return False
                node.is_end_of_word = False
                return len(node.children) == 0

            ch = word[i]
            child = node.children.get(ch)
            if not child:
                return False

            should_prune = dfs(child, i + 1)
            if should_prune:
                del node.children[ch]
            return len(node.children) == 0 and not node.is_end_of_word

        dfs(self.root, 0)


# Uso
trie = Trie()
trie.insert('car')
trie.insert('card')
trie.insert('cat')

assert trie.search('car')
assert not trie.search('ca')
assert trie.starts_with('ca')
trie.delete('car')
assert trie.search('card')  # "card" mantém-se
