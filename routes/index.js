var config = require('../config.json');
var express = require('express');
var router = express.Router();

// Middleware to: create graph, adjust weight, get shortest paths, and decide next move
var middleware = {
  makeGraph: require('../middleware/makeGraph'),
  dijkstra: require('../middleware/dijkstra'),
  nextMove: require('../middleware/nextMove')
}

// Array of weight adjusting functions to apply to each node of the graph
var edgeWeightAdjustments = [];

// Handle GET request to '/'
router.get(config.routes.info, function (req, res) {
  // Response data
  var data = {
    color: config.snake.color,
    head_url: config.snake.head_url,
  };

  return res.json(data);
});

// Handle POST request to '/start'
router.post(config.routes.start, function (req, res) {
  // Response data
  var data = {
    taunt: config.snake.taunt.start,
    color: config.snake.color,
    secondary_color: config.snake.secondary_color,
    head_url: config.snake.head_url,
    name: config.snake.name,
    head_type: config.snake.head_type,
    tail_type: config.snake.tail_type
  };

  return res.json(data);
});

// Handle POST request to '/end'
router.post(config.routes.end, function (req, res) {
  // Do something here to end your snake's session

  // We don't need a response so just send back a 200
  res.status(200);
  res.end();
  return;
});

// Create a graph from the board array
router.use(middleware.makeGraph(edgeWeightAdjustments));
// Dijkstra's Algorithm (Single source shortest path)
router.use(middleware.dijkstra);
// Decide next move 
router.use(middleware.nextMove);

// Handle POST request to '/move'
router.post(config.routes.move, function (req, res) {
  // Response data
  var data = {
    move: req.move, 
    taunt: config.snake.taunt.move
  };

  return res.json(data);
});

module.exports = router;
