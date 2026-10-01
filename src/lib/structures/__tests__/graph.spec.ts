import { describe, it, expect } from 'vitest'
import { Graph } from '../graph'

//   A
//  / \
// B   C
// |   |
// D   E
function buildGraph(directed = false) {
  const g = new Graph()
  ;['A', 'B', 'C', 'D', 'E'].forEach((v) => g.addVertex(v))
  g.addEdge('A', 'B', directed)
  g.addEdge('A', 'C', directed)
  g.addEdge('B', 'D', directed)
  g.addEdge('C', 'E', directed)
  return g
}

describe('Graph', () => {
  it('bfs visita nível a nível', () => {
    expect(buildGraph().bfs('A')).toEqual(['A', 'B', 'C', 'D', 'E'])
  })

  it('dfs vai o mais fundo possível antes de recuar', () => {
    expect(buildGraph().dfs('A')).toEqual(['A', 'B', 'D', 'C', 'E'])
  })

  it('grafo não-dirigido: existe caminho nos dois sentidos', () => {
    const g = buildGraph()
    expect(g.hasPath('A', 'E')).toBe(true)
    expect(g.hasPath('D', 'E')).toBe(true) // D → B → A → C → E
  })

  it('grafo dirigido: as arestas só vão num sentido', () => {
    const g = buildGraph(true)
    expect(g.hasPath('A', 'E')).toBe(true)
    expect(g.hasPath('D', 'E')).toBe(false)
    expect(g.bfs('B')).toEqual(['B', 'D'])
  })

  it('vértice isolado só se alcança a si próprio', () => {
    const g = buildGraph()
    g.addVertex('Z')
    expect(g.bfs('Z')).toEqual(['Z'])
    expect(g.hasPath('A', 'Z')).toBe(false)
  })

  it('vértice inexistente devolve travessia vazia', () => {
    const g = buildGraph()
    expect(g.bfs('?')).toEqual([])
    expect(g.dfs('?')).toEqual([])
  })

  it('addEdge cria vértices em falta', () => {
    const g = new Graph()
    g.addEdge('X', 'Y')
    expect(g.neighbors('X')).toEqual(['Y'])
    expect(g.neighbors('Y')).toEqual(['X'])
  })

  it('lida com ciclos sem entrar em loop', () => {
    const g = new Graph()
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    g.addEdge('C', 'A')
    expect(g.bfs('A')).toEqual(['A', 'B', 'C'])
    expect(g.dfs('A')).toEqual(['A', 'B', 'C'])
  })
})
