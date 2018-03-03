var boardUtils = require('../utilities/board');
var Point = require('../classes/point');

module.exports = function (req, res, next) {
    // Get the vertex for the head of our snake
    let headPoint = new Point(req.body.you.body.data[0].x, req.body.you.body.data[0].y);
    let headVertex = getBoardCell(req.body.board, head);

    // Flood fill from our head
    floodFill(req, headVertex, 0);

    next();
}

function floodFill(req, vertex, depth) {
    // Increment depth
    depth++;
    // Mark vertex as visited
    vertex.visited = true;

    // If no children
    if (vertex.outEdges.length === 0) {
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
