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
    if(vertex.snake.you !== req.you ){
    	// We are only concerned with our snakes positionhere
    	return vertex;
    }

    // Height && width of board (to establish our positionality)
    var headHeight = req.body.height;        
    var headWidth = req.body.width;

    // We are at the horizontal walls and need to move in
    if(coords.x >= headWidth -2 || coords.x <= 1){
        // Weigh so we move in and away from wall

    } 

    // We are at vertical walls and need to move in
    if(coords.y >= headHeight -2 || coords.y <= 0 ){


    }
    // We will only have a max of 3 surrounding nodes 
    var snakeProximity = //jeffFunction (vertex.coord);

    // Now we can add weight to inner and then secondary nodes.
    snakeProximity.forEach{

    }

    return vertex;
}