'import graph'

adjacency =
    a: ['b', 'c']
    c: ['a']

console.log "Adjacency:"
console.log adjacency

graph = new Game.Graph adjacency

console.log 'Testing vertices function:'
graph.vertices()

console.log "Testing dijkstra's algorithm:"
graph.dijkstras()
