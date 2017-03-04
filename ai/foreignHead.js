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
    if(vertex.snake.you.id === req.body.you.id ){
    	// We are only concerned with foreign snakes here
    	return vertex;
    }

    // If we are bigger, decrease them substantially
    // Get this snakes current size
    var enemySnakeSize = vertex.snake.coords.length;
    // Our snake
    var ourSnakeSize = req.body.you.coords.length;
    // Marker to see if we are predatory - timid by default
    var predatory = false;
    if(ourSnakeSize > enemySnakeSize){
    	predatory = true;
    } 

    // Grab our surrounding nodes (possible max 3, can't go back on our own body)
    var headPath = //function to get surroundings nodes on vertex.coord

    // Now we can add weight to inner and then secondary nodes.
    headPath.foreach{
    	//Then get all other attaching nodes.
    	secondaryNodes = // Jeffs forthcoming function
    	foreach(secondaryNodes as sNode){
    		// Weigh these edges from each node
    		// We want to look back towards the parent of these secondary nodes, and increase the wieght along that path.
    		if(predatory){
    			// Get aggresive son!
    			// We need to pull this from edges array if they are there to manipulate them - or else add with new values

    		} else {
    			// Run away! Run away!
    		}
    	}
   	}
    return vertex;
}
