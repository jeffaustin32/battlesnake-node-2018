/*
*   Edge {
*        direction:     'north' | 'east' | 'south' | 'west',
*        weight:        Integer,
*        source:        Point | null,
*        destination:   Point | null
*   }
*/

var boardUtils = require('../utilities/board');
var Point = require('./point');

module.exports = Edge;

function Edge(direction = 'north', source = null, destination = null) {
    this.direction = direction;
    this.weight = 100;
    this.source = source;
    this.destination = destination;
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