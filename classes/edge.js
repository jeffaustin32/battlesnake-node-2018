/*
*   Edge {
*        direction:     'up' | 'left' | 'down' | 'right',
*        weight:        Integer,
*        source:        Point | null,
*        destination:   Point | null
*   }
*/

var boardUtils = require('../utilities/board');
var Point = require('./point');

module.exports = Edge;

function Edge(direction, source, destination) {
    this.direction = direction || 'up';
    this.weight = 100;
    this.source = source || null;
    this.destination = destination || null;
}

Edge.prototype.getSource = function(board) {
    return boardUtils.getBoardCell(board, this.source);
}

Edge.prototype.getDestination = function(board) {
    return boardUtils.getBoardCell(board, this.destination);
}

Edge.prototype.compareTo = function (otherEdge) {
    otherEdge.weight - this.weight;
};