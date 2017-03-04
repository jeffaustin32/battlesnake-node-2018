/*
* Apply Dijkstra's algorithm to our graph
*
* This will return the same graph but with updated vertex distances
* The vertex with the lowest distance will be our next destination
*/
var priorityQueue = require('js-priority-queue');
var boardUtils = require('../utilities/board');
var Vertex = require('../classes/vertex');
var Edge = require('../classes/edge');
var Point = require('../classes/point');

module.exports = function (req, res, next) {
  // Go through all vertices in the queue (source will always be first as it has distance 0)
  while (req.body.vertexDistancePQueue.length != 0) {
    var vertex = req.body.vertexDistancePQueue.dequeue();
    // We have already seen this vertex before, ignore it
    if (vertex.visited) {
      // This allows us to have the same vertex in the queue multiple times
      // So we don't need to spent linear time finding and removing them as distances change
      continue;
    }

    // Mark this vertex as visited, don't want to see it again
    vertex.visited = true;

    // For every out edge from this vertex
    vertex.outEdges.forEach(edge => {
      // Get the adjacent vertex
      var adjacentVertex = edge.getDestination(req.body.board);
      // Calculate the new potential distance to this vertex
      var newDistance = vertex.distance + edge.weight;

      // If the new distance is less than the old, use the new path to the vertex
      if (newDistance < adjacentVertex.distance) {
        // Store the distance
        adjacentVertex.distance = newDistance;
        // And the previous link in the path
        adjacentVertex.parent = vertex.coords;

        // Push the updated vertex back into the queue
        req.body.vertexDistancePQueue.queue(adjacentVertex);
        // Update the board's version of this adjacent vertex to match
        boardUtils.setBoardCell(req.body.board, edge.destination, adjacentVertex);
      }
    });

    // Update the board's version of the vertex to match
    boardUtils.setBoardCell(req.body.board, vertex.coords, vertex);
  }

  next();
}
