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

    // We will only have a max of 3 surrounding nodes if this is the tail. Else max 2.
    var snakeProximity = getAdjacentVertices(req.body.board, vertex.coords);
    var thisEdge = ''
    // Now we can add weight to inner and then secondary nodes.
    snakeProximity.forEach(proximity=>{
    	//Then get all other attaching nodes.
    	var secondaryNodes = getAdjacentVertices(req.body.board, proximity.coords);
    	secondaryNodes.forEach(sNode=>{
    		// Weigh these edges from each node
            // We want to look back towards the parent of these secondary nodes, and increase the wieght along that path.
            thisEdge = getConnectingEdge(sNode, proximityNode);
            thisEdge.weight += 50;


    	});
    });

    return vertex;
}