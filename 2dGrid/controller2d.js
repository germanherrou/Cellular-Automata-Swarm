function next() {
    transition();
    var grid = getGrid();
    squares.forEach(square => {
        var row = (square.attrs.y - 20) / side;
        var column = square.attrs.x / side;
        var value = grid[row][column];
        if (value) {
            square.fill('gray');
        }
        else {
            square.fill('white');
        }
    });
    layer.draw();
}
var bigNeighborhood = true;
function changeNeighborhood() {
    bigNeighborhood = !bigNeighborhood;
    var elements = document.getElementsByClassName("bigNeighborhood");
    for (let element of elements) {
        if (bigNeighborhood) {
            element.disabled = false;
        }
        else
        {
            element.checked = false;
            element.disabled = true;
        }
            
    }
    toogleNeighborhood();
}

function changeRows(total) {
    var length = getGrid().length;
    if (length < total)
        addRows(total - length);
    else
        removeRows(length - total);
    updateGrid(getGrid());
}

function changeColumns(total) {
    var length = getGrid()[0].length;
    if (length < total)
        addColumns(total - length);
    else
        removeColumns(length - total);
    updateGrid(getGrid());
}