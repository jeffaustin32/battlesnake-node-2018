/*
*   Edge {
*        direction:         'up' | 'left' | 'down' | 'right',
*        weight:            Integer,
*        source:            Point | null,
*        destination:       Point | null
*   }
*/

var boardUtils = require('../utilities/board');
var Point = require('./point');
var config = require('../config.json');

module.exports = Edge;

function Edge(direction, source, destination) {
    this.direction = direction || 'up';
    this.weight = parseInt(eval(config.weightValues.default));
    this.source = source || null;
    this.destination = destination || null;
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