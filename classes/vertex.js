/*
* Vertex {
*        state:         'head'|'body'|'food'|'empty'
*        boardState:    'border'|'center'|'standard'
*        snake:         'you'|'enemy'|'none'
*        distance:      Infinity | 0,
*        visited:       false
*        outEdges:      [Edges]
*        parent:        null | Point
*        coords:        Point
*        isSource:      true | false
*        maxSubtreeHeight: Integer
*        tempWeight:    Integer
*   }
*/

var config = require('../config.json');
var boardUtils = require('../utilities/board');
var Edge = require('./edge');
var Point = require('./point');

module.exports = Vertex;

function Vertex(state, snake, coords) {
    this.state = state || 'empty';
    this.snake = snake || 'enemy';
    this.distance = Infinity; // Fundamental to Dijkstra's. The weight of the shortest path (in terms of distance, not moves)
    this.visited = false; // Allows us to eliminate vertices pulled from priority queue instead of linear time to remove
    this.outEdges = [];
    this.parent = null; // When we have lightest food, work backwards through parent to find path
    this.coords = coords || null; // Store the coordinates so we can later check if vertex is visited in constant time
    this.isSource = false;
    this.maxSubtreeHeight = 0; // Used in flood fill
    this.tempWeight = parseInt(eval(Config.weightValues.default));

    // This is the head of our snake
    if (state === 'head' && snake === config.snake.name) {
        // We will use this as the shortest path source
        this.distance = 0;
        this.isSource = true;
    }

    // Establish adjacent cells
    this.adjacentCells = [
        { direction: 'up', coords: new Point(this.coords.x, this.coords.y - 1) },
        { direction: 'right', coords: new Point(this.coords.x + 1, this.coords.y) },
        { direction: 'down', coords: new Point(this.coords.x, this.coords.y + 1) },
        { direction: 'left', coords: new Point(this.coords.x - 1, this.coords.y) }];
}

Vertex.prototype.compareTo = function (otherVertex) {
    if (this.distance < otherVertex.distance) {
        return -1;
    }
    if (this.distance > otherVertex.distance) {
        return 1;
    }

    return 0;
};

Vertex.prototype.containsSnake = function (board, coords, allowOwnHead) {
    allowOwnHead = allowOwnHead || false;
    // Get the cell in question
    var cell = boardUtils.getBoardCell(board, coords);

    if (!cell) {
        return false;
    }

    // Cell contains the head or body of a snake
    if (/head|body/.test(cell.state)) {
        // Allow connection with our own head
        if (allowOwnHead && cell.snake === config.snake.name) {
            return false;
        }
        return true;
    }

    return false;
};

Vertex.prototype.addEdges = function (board) {
    // Filter out off-the-board vertices
    this.adjacentCells.filter(cell => boardUtils.validCell(board, cell.coords))
        // Filter out vertices contains a snake
        .filter(cell => !this.containsSnake(board, cell.coords))
        // Edge is safe, add it to the outedges of this vertex
        .forEach(cell => this.outEdges.push(new Edge(cell.direction, this.coords, cell.coords)));
};