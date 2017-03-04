// Important class definitions
var Point = require('../classes/point');
var Edge = require('../classes/edge');
var Vertex = require('../classes/vertex');

// Utility functions to get board cells
var utils = require('../utilities/board');

module.exports = function(board, cellCoords) {
    // Get the Vertex
    var vertex = utils.getBoardCell(board, cellCoords);

    // TODO: Adjust the weight of the Vertex.outEdges (Vertex.outEdges is an array of Edges)

    // TODO: After making the any changes, store the updated Edges backs into Vertex.outEdges
    return vertex;
}
