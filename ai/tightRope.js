// Important class definitions
var Point = require('../classes/point');
var Edge = require('../classes/edge');
var Vertex = require('../classes/vertex');
var Config = require('../config.json');

// Utility functions to get board cells
var utils = require('../utilities/board');

module.exports = function (board, cellCoords) {
    // Get the Vertex
    var vertex = utils.getBoardCell(board, cellCoords);

    // Check if it is our snake
    if (vertex.snake.id !== req.you.id) {
        // We are only concerned with our snakes positionhere
        return vertex;
    }

    // Height && width of board (to establish our positionality)
    var headHeight = req.body.height;
    var headWidth = req.body.width;
    var adjacentVert = new Array();
    var thisEdge = '';
    // We are at the horizontal walls and need to move in
    if (vertex.coords.x >= headWidth - 2 || vertex.coords.x <= 1) {
        // Weigh so we move in and away from wall
        // Weigh forward heavier then away from wall
        // Get the current edgewight of the vertex 
        adjacentVert = utils.getAdjacentVertices(req.body.board, vertex.coords);
        adjacentVert.forEach(advert => {
            if (advert.coords.x >= headWidth - 2) {
                // Move away from right wall by increasing the edges here.
                thisEdge = utils.getConnectingEdge(advert, vertex);
                thisEdge.weight += 50;
            }
            if (advert.coords.x <= 1) {
                // Move away from left wall by increasing the edges here
                thisEdge = utils.getConnectingEdge(advert, vertex);
                thisEdge.weight += 50;
            }
        });

    }

    // We are at vertical walls and need to move in
    if (vertexcoords.y >= headHeight - 2 || vertex.coords.y <= 1) {
        // Weigh so we move in and away from wall
        // Weigh forward heavier then away from wall
        // Get the current edgewight of the vertex 
        adjacentVert = utils.getAdjacentVertices(req.body.board, vertex.coords);
        adjacentVert.forEach(advert => {
            if (advert.coords.y >= headHeight - 2) {
                // Move away from bottom wall by increasing the edges here.
                thisEdge = utils.getConnectingEdge(advert, vertex);
                thisEdge.weight += 50;
                // Push this value back up to outEdges
            }
            if (advert.coords.y <= 1) {
                // Move away from top wall by increasing the edges here
                thisEdge = utils.getConnectingEdge(advert, vertex);
                thisEdge.weight += 50;
                // Push this value back up to outEdges
            }
        });
    }

    return vertex;
}