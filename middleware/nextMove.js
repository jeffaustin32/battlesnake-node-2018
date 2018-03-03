/*
* Decide on our next move
*
* We have the shortest path to each node
* Decide which node to move towards
*/
var PriorityQueue = require('js-priority-queue');
var boardUtils = require('../utilities/board');
var Point = require('../classes/point');

module.exports = function (req, res, next) {
  // If there is no food, set req.move to a direction
  if (req.body.food.data.length === 0) {
    req.body.source.outEdges.sort(function (a, b) {
      return a.compareTo(b);
    });

    req.move = req.body.source.outEdges[0].direction;
    return next();
  }

  // There is food, find the food with the lowest distance
  var foods = [];

  // Add all the vertices with food to the foodQueue
  req.body.food.data.map(food => { return new Point(food.x, food.y) })
    .forEach(food => foods.push(boardUtils.getBoardCell(req.body.board, food)));

  // Sort the food based on vertex distance
  foods.sort(function (a, b) {
    return a.compareTo(b);
  });

  // Get the food with the lowest distance, it is the end of our path
  var path = boardUtils.getBoardCell(req.body.board, foods[0].coords);

  // Continue working up the path until the grandparent is null
  // When it is null, it means we are on the first node in the path
  while (path.parent && boardUtils.getBoardCell(req.body.board, path.parent).parent != null) {
    path = boardUtils.getBoardCell(req.body.board, path.parent);
  }

  // Now find the edge from the source that connects to this vertex
  req.body.source.outEdges.forEach(edge => {
    if (edge.destination.equals(path.coords)) {
      var destination = boardUtils.getBoardCell(req.body.board, edge.destination);
      // Path now contains the first vertex of the path, which is our next move
      req.move = edge.direction;
    }
  });

  // There is no eligible path to food
  if (!req.move) {    
    req.body.source.outEdges.sort(function (a, b) {
      return a.compareTo(b);
    });

    req.move = req.body.source.outEdges[0].direction;
    return next();
  } 

  // Store the direction of the first move  
  next();
}

