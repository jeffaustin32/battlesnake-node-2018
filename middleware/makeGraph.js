/*
* Create a graph from the board array
*
* Traverses over every cell of the board
* For each cell in the board it will:
* - Create an array of out edges connecting to adjacent vertices with default weight of 100
* - Mark each vertex as not visited and with infinity distance for Dijkstra's algorithm
*
*/

var config = require('../config.json');
var PriorityQueue = require('js-priority-queue');
var boardUtils = require('../utilities/board');
var Vertex = require('../classes/vertex');
var Point = require('../classes/point');

module.exports = function (methods) {
  // O(width * height * # methods)
  return function (req, res, next) {
    // Setup priority queue to use in Dijkstra's algorithm
    req.body.vertexDistancePQueue = new PriorityQueue({
      strategy: PriorityQueue.BinaryHeapStrategy,
      comparator: function (a, b) { return a.compareTo(b) }
    });

    // Go through all the board cells
    for (let col = 0; col < req.body.width; col++) {
      for (let row = 0; row < req.body.height; row++) {
        // Get the current board cell
        let cell = req.body.board[col][row];
        let cellCoords = new Point(col, row);
        
        // Create a new vertex representing that cell
        let vertex = new Vertex(cell.state, cell.snake, cellCoords);

        // This is the source node, keep track of it for when we choose our next move
        if (vertex.isSource) {
          req.body.source = vertex;
        }

        // Do not make any connections to an enemy snake segment or our own snake's body
        if (vertex.containsSnake(req.body.board, cellCoords, true)) {
          // Store the vertex back in the request body's board
          boardUtils.setBoardCell(req.body.board, cellCoords, vertex);
          // Don't want any outgoing edges from this cell
          continue;
        }

        // This vertex does not contain an enemy snake or our body, add all out edges for this vertex
        vertex.addEdges(req.body.board);

        // For vertex in the graph, apply all edge weight adjusting method
        methods.forEach(method => {
          vertex = method(vertex);
        });

        // Store the vertex back in the request body's board
        boardUtils.setBoardCell(req.body.board, cellCoords, vertex);
        // Add the vertex to the priority queue
        req.body.vertexDistancePQueue.queue(vertex);
      }
    }

    next();
  };
}
