// Important class definitions
var Point = require('../classes/point');
var Edge = require('../classes/edge');
var Vertex = require('../classes/vertex');
var Config = require('../config.json');

// Utility functions to get board cells
var utils = require('../utilities/board');

module.exports = function (req, cellCoords) {
	// Get the Vertex
	console.log(cellCoords);
	var vertex = utils.getBoardCell(req.body.board, cellCoords);

	// Check if it is our snake
	if (vertex.snake.id === req.body.you.id) {
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
	if (ourSnakeSize > enemySnakeSize) {
		predatory = true;
	}

	// Grab our surrounding nodes (possible max 3, can't go back on our own body)
	var headPath = utils.getAdjacentVertices(req.body.board, vertex.coords);

	// Now we can add weight to inner and then secondary nodes.
	headPath.forEach(currentNode => {
		//Then get all other attaching nodes.
		var secondaryNodes = utils.getAdjacentVertices(req.body.board, currentNode.coords);
		var connectionToHeadPath = new Array();
		secondaryNodes.forEach(secondNode => {
			// Weigh these edges from each node
			// We want to look back towards the parent of these secondary nodes, and increase the wieght along that path.
			if (predatory) {
				// Get aggresive son!
				// We need to pull this from edges array if they are there to manipulate them - or else add with new values
				connectionToHeadPath = utils.getConnectingEdge(secondNode, currentNode);
				if (connectionToHeadPath) {
					// Update edge between outer node (secondNode) toward currentNode(closest to this foreign snake) aggressivley.
					connectionToHeadPath.weight -= 50;
					// Push this back up to our edge array
				}
			} else {
				// Run away! Run away!
				var connectionToHeadPath = utils.getConnectingEdge(secondNode, currentNode);
				if (connectionToHeadPath) {
					// Update edge between outer node (secondNode) toward currentNode(closest to this foreign snake) to scare our poor snake away.
					connectionToHeadPath.weight += 100;
					// push this back up to our edge array
				}
			}
		});
	});
	return vertex;
}
