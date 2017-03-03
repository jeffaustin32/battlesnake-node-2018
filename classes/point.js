/*
*   Point {
*        x: Integer,
*        y: Integer
*   }
*/

module.exports = Point;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.equals = function (otherPoint) {
    if (otherPoint.x === this.x && otherPoint.y === this.y) {
        return true;
    }

    return false;
};
