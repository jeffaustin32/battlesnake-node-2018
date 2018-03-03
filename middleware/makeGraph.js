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

    // Define the game board 
    req.body.board = [];

    // Create the empty vertex board    
    for (var i = 0; i < req.body.width; i++) {
      req.body.board[i] = [];
      for (var j = 0; j < req.body.height; j++) {
        var cellCoords = new Point(i, j);

        // Create a new vertex representing that cell
        var vertex = new Vertex('empty', 'none', cellCoords);

        // Store the vertex back in the request body's board
        boardUtils.setBoardCell(req.body.board, cellCoords, vertex);
      }
    }

    // Add all snakes to the board
    req.body.snakes.data.forEach(snake => {
      // Add snake segments to board
      snake.body.data.forEach((segment, index) => {
        var segmentCoords = new Point(segment.x, segment.y);
        var vertex = boardUtils.getBoardCell(req.body.board, segmentCoords);

        if (vertex.state != 'empty') {
          return;
        }

        vertex.state = 'body';

        // Check if the snake is us
        if (snake.id === req.body.you.id) {
          vertex.snake = 'you'
          // Set the state of the vertex
          if (index === 0) {
            vertex.state = 'head';
            vertex.distance = 0;
            vertex.isSource = true;
          }
        // Is enemy snake
        } else {
          vertex.snake = 'enemy';
          if (index === 0) {
            vertex.state = 'head';
          }
        } 

        // Store the vertex back into the board
        boardUtils.setBoardCell(req.body.board, segmentCoords, vertex);
      });
    });

    // Add all food to the board
    req.body.food.data.forEach(food => {
      var foodCoords = new Point(food.x, food.y);
      var vertex = boardUtils.getBoardCell(req.body.board, foodCoords);
      vertex.state = 'food';

      // TODO: Call any food edge adjusting function

      // Store the vertex back into the board
      boardUtils.setBoardCell(req.body.board, foodCoords, vertex);

      req.body.board[foodCoords.x][foodCoords.y] = vertex;
    });

    // Add all out edges
    req.body.board.forEach((col, colIndex) => {
      col.forEach((vertex, rowIndex) => {
        vertex.addEdges(req.body.board);

        if (vertex.isSource) {
          req.body.source = vertex;
        }

        // Apply initial weighting from board state to all edges

        vertex.outEdges.forEach((edge) => {
          // Is border edge?
          if (edge.destination.x == 0 || edge.destination.x == req.body.width ||
            edge.destination.y == 0 || edge.destination.y == req.body.height) {
              edge.weight += parseInt(eval(Config.weightValues.border));
          }

          // Is center edge?
          
        })

        

        

        boardUtils.setBoardCell(req.body.board, new Point(colIndex, rowIndex), vertex);

        // Add each vertex to the priority queue
        req.body.vertexDistancePQueue.queue(vertex);
      });
    });

    // TODO: ADD WEIGHTS

    next();
  };
}



