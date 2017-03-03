/*
*
* Returns the contents of a board cell or null if it is out of bounds
*
*/

require('../classes/point');

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

        let col = board[coords.x];

        if (coords.y < 0 || coords.y >= col.length) {
            return false;
        }

        return true;
    }
}
