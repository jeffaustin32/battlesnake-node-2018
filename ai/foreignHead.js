// Important class definitions
var Point = require('../classes/point');
var Edge = require('../classes/edge');
var Vertex = require('../classes/vertex');
var Config = require('../config.json');

// Utility functions to get board cells
var utils = require('../utilities/board');

module.exports = function(board, cellCoords) {
    // Get the Vertex
    var vertex = utils.getBoardCell(board, cellCoords);

    // Check if it is our snake
    if(vertex.snake === "you" ){
    	// We are only concerned with foreign snakes here
    	return vertex;
    }

    // Get this snakes current connected coords from Jeff and increase them
    headNodes = 

    
    // If we are bigger, decrease them substantially
    // Get this snakes current size
    enemySnakeSize = vertex.snake.coords.length;
    // Our snake
    ourSnake = req.body.you.coords.lenght;

    



    return vertex;
}
