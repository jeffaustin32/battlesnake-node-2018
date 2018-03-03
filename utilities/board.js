/*
*
* Returns the contents of a board cell or null if it is out of bounds
*
*/

var Point = require('../classes/point');

module.exports = {
    getBoardCell: function (board, coords) {
        // Check that it is a valid board cell
        if (!this.validCell(board, coords)) {
            return null;
        }

        return board[coords.x][coords.y];
    },
    setBoardCell: function (board, coords, cell) {
        return board[coords.x][coords.y] = cell;
    },
    validCell: function (board, coords) {
        if (!board || !coords) {
            return false;
        }

        if (coords.x < 0 || coords.x >= board.length) {
            return false;
        }

        var col = board[coords.x];

        if (coords.y < 0 || coords.y >= col.length) {
            return false;
        }

        return true;
    },
    // Get all adjacent vertices, regardless of connecting edges
    getAdjacentVertices: function (board, coords) {
        var vertex = this.getBoardCell(board, coords);
        var adjacentVertices = [];

        // Get north adjacent vertex
        if (this.getBoardCell(board, new Point(coords.x, coords.y - 1))) {            
            adjacentVertices.push(this.getBoardCell(board, new Point(coords.x, coords.y - 1)));
        }
        
        // Get east adjacent vertex
        if (this.getBoardCell(board, new Point(coords.x + 1, coords.y))) {
            adjacentVertices.push(this.getBoardCell(board, new Point(coords.x + 1, coords.y)));
        }
        
        // Get south adjacent vertex
        if (this.getBoardCell(board, new Point(coords.x, coords.y + 1))) {
            adjacentVertices.push(this.getBoardCell(board, new Point(coords.x, coords.y + 1)));
        }
        
        // Get west adjacent vertex
        if (this.getBoardCell(board, new Point(coords.x - 1, coords.y))) {
            adjacentVertices.push(this.getBoardCell(board, new Point(coords.x - 1, coords.y)));
        }

        return adjacentVertices;
    },
    // Get an edge that connects two vertices: or null if none exists
    getConnectingEdge: function (vertex, adjacentVertex) {
        var connectingEdge = null;

        adjacentVertex.outEdges.forEach(edge => {
            if (edge.destination.equals(vertex.coords)) {
                connectingEdge = edge;
            }
        });

        return connectingEdge;
    },

    weightEnemySnakeHeadVertices: function (board, vertex, health, youSnakeSize, enemySnakeSize) {

        // Marker to see if we would win a head-on collison - assume a loss by default
        var win = false;
        if (youSnakeSize > enemySnakeSize) {
            win = true;
        }

        // Grab our surrounding vertices (possible max 3, can't go back to own body)
        var adjacentVertices = this.getAdjacentVertices(board, vertex.coords);

        // Now we can add weight to inner and then secondary vertices.
        adjacentVertices.forEach(outerVertex => {

            var hp = health;
            if (win) {
                outerVertex.tempWeight += parseInt(eval(Config.weightValues.turnWeights.first.win));
            } else {
                outerVertex.tempWeight += parseInt(eval(Config.weightValues.turnWeights.first.loss));
            }

            //Then get all other attaching vertices.
            var secondaryVertices = utils.getAdjacentVertices(board, outerVertex.coords);
            secondaryVertices.forEach(secondVertex => {
                // Weigh these edges from each node
                // We want to look back towards the parent of these secondary nodes, and increase the wieght along that path.
                if (win) {
                    outerVertex.tempWeight += parseInt(eval(Config.weightValues.turnWeights.second.win));
                } else {
                    outerVertex.tempWeight += parseInt(eval(Config.weightValues.turnWeights.second.loss));
                }
            });
        });
    }
}
