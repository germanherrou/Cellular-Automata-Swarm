var grid = [[1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 0], [0, 0, 0, 1]];
var births = [3];
var survives = [2, 3];
var mooreNeighborhood = true; // Moore 8 vecinos, Von Neumann 4 vecinos

function getGrid() {
    return grid;
}

function update(row, column, value) {
    grid[row, column] = value;
}

function transition() {
    var newGrid = [];
    var value;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        var newRow = [];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            var value = evolve(rowIndex, columnIndex);
            newRow.push(value);
        }
        newGrid.push(newRow);
    }

    grid = newGrid;
}

function evolve(row, column) {
    var neighbors = 0;
    var result = 0;

    if (mooreNeighborhood)
        neighbors = mooreNeighbors(row, column);
    else
        neighbors = vonNeumannNeighbors(row, column);

    if (grid[row, column])
        result = survives.includes(neighbors);
    else result = births.includes(neighbors);

    return result;

}

function mooreNeighbors(row, column) {
    return grid[row - 1, column - 1] + grid[row - 1, column] + grid[row - 1, column + 1]
        + grid[row, column - 1] + grid[row, column + 1]
        + grid[row + 1, column - 1] + grid[row + 1, column] + grid[row + 1, column + 1];
}

function vonNeumannNeighbors(row, column) {
    return grid[row - 1, column] + grid[row, column - 1] + grid[row, column + 1] + grid[row + 1, column];
}