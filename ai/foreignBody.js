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
    if(vertex.snake.you === req.you ){
    	// We are only concerned with foreign snakes here
    	return vertex;
    }

    // Now we can add weight to inner and then secondary nodes.
    foreach(nodes as node){
    	//Then get all other attaching nodes.
    	secondaryNodes = // Jeffs forthcoming function
    	foreach(secondaryNodes as sNode){
    		// Weigh these edges from each node
            // We want to look back towards the parent of these secondary nodes, and increase the wieght along that path.

    	}
    }

    return vertex;
}