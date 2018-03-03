var boardUtils = require('../utilities/board');
var Point = require('../classes/point');
var config = require('../config.json');

module.exports = function (req, res, next) {
    // Get the vertex for the head of our snake
    let headPoint = new Point(req.body.you.body.data[0].x, req.body.you.body.data[0].y);
    let headVertex = boardUtils.getBoardCell(req.body.board, headPoint);

    // Flood fill from our head
    floodFill(req, headVertex, 0);


    // TODO: Remove later
    let adj = boardUtils.getAdjacentVertices(req.body.board, headPoint);
    
    adj.forEach(vertex => {
        console.log('Vertex: ', vertex.maxSubtreeHeight);
    });

    next();
}

function floodFill(req, vertex, depth) {
    // Increment depth
    depth++;
    // Mark vertex as visited
    vertex.visited = true;

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
            return;
        }
        // Depth first search for max subtree height
        vertex.maxSubtreeHeight = Math.max(vertex.maxSubtreeHeight, floodFill(req, destinationVertex, depth));
    });

    // Mark vertex as unvisited
    vertex.visited = false;
    return vertex.maxSubtreeHeight;
}
