var boardUtils = require('../utilities/board');
var Point = require('../classes/point');
var config = require('../config.json');

module.exports = function (req, res, next) {
    // Get the vertex for the head of our snake
    let headPoint = new Point(req.body.you.body.data[0].x, req.body.you.body.data[0].y);
    let adj = boardUtils.getAdjacentVertices(req.body.board, headPoint);
    
    adj.forEach(vertex => {
        // Flood fill from our head
        floodFill(req, vertex, 0);
        let maxSubtreeHeight = vertex.maxSubtreeHeight;
        console.log(`Old weight: ${vertex.tempWeight}`);
        vertex.tempWeight += parseInt(eval(config.weightValues.floodFill.pathLength));
        console.log(`New weight: ${vertex.tempWeight}`);
        console.log(`Vertex coords: (${vertex.coords.x}, ${vertex.coords.y}), maxSubtreeHeight: ${vertex.maxSubtreeHeight}, adding: ${parseInt(eval(config.weightValues.floodFill.pathLength))} weight`);
    });

    next();
}

function floodFill(req, vertex, depth) {
    // Increment depth
    depth++;
    // Mark vertex as visited
    vertex.visited = true;

    console.log(`Visiting cell (${vertex.coords.x}, ${vertex.coords.y}), Current depth: ${depth}`);

    // If no children
    if (vertex.outEdges.length === 0 || depth === config.boardValues.floodFillLimit) {
        // Reset visisted property so other paths can reach this vertex
        vertex.visited = false;
        // Return depth
        return depth;
    }

    // For every node adjacent to our head
    vertex.outEdges.forEach((edge) => {
        let destinationVertex = boardUtils.getBoardCell(req.body.board, edge.destination);

        // This vertex has already been visited
        if (destinationVertex.visited) {
            vertex.maxSubtreeHeight = Math.max(vertex.maxSubtreeHeight, depth);
            return;
        }

        // Depth first search for max subtree height

        if (vertex.maxSubtreeHeight < config.boardValues.floodFillLimit) {
            vertex.maxSubtreeHeight = Math.max(vertex.maxSubtreeHeight, floodFill(req, destinationVertex, depth));
        }
    });

    // Mark vertex as unvisited
    vertex.visited = false;
    return vertex.maxSubtreeHeight;
}
