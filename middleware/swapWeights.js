var boardUtils = require('../utilities/board');
var Point = require('../classes/point');
var config = require('../config.json');

module.exports = function (req, res, next) {

    // Swap the tempWeights from the vertices to edges
    // Need two vertices to get a pair of edges
    req.body.board.forEach((col, colIndex) => {
        col.forEach((vertex, rowIndex) => {
            let adjacentVertices = boardUtils.getAdjacentVertices(req.body.board, vertex.coords);
            adjacentVertices.forEach((outerVertex) => {
                //Apply the appropriate vertex weight to both connected edges
                let edgeDestToSource = boardUtils.getConnectingEdge(vertex, outerVertex);
                let edgeSourceToDest = boardUtils.getConnectingEdge(outerVertex, vertex);
                
                edgeDestToSource.weight = vertex.tempWeight;
                edgeSourceToDest.weight = outerVertex.tempWeight;
            });
        });
    });

    next();

}