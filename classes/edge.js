/*
*   Edge {
*        direction:         'up' | 'left' | 'down' | 'right',
*        weight:            Integer,
*        source:            Point | null,
*        destination:       Point | null,
*        sourceVertex:      Vertex | null,
*        destinationVertex: Vertex | null
*   }
*/

var boardUtils = require('../utilities/board');
var Point = require('./point');

module.exports = Edge;

function Edge(direction, source, destination, sourceVertex, destinationVertex) {
    this.direction = direction || 'up';
    this.weight = 100;
    this.source = source || null;
    this.destination = destination || null;
    this.sourceVertex = sourceVertex || null;
    this.destinationVertex = destinationVertex || null;
}

Edge.prototype.getSource = function (board) {
    return boardUtils.getBoardCell(board, this.source);
}

Edge.prototype.getDestination = function (board) {
    return boardUtils.getBoardCell(board, this.destination);
}

Edge.prototype.compareTo = function (otherEdge) {
    if (this.weight < otherEdge.weight) {
        return -1;
    }
    if (this.weight > otherEdge.weight) {
        return 1;
    }

    return 0;
};