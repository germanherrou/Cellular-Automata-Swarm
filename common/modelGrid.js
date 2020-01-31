function getGrid() {
    return grid;
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