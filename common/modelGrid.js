function getGrid() {
    return grid;
}

function update(row, column, value) {
    grid[row][column] = value;
}

function transition() {
    let newGrid = [];
    let value;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        let newRow = [];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            let value = evolve(rowIndex, columnIndex);
            newRow.push(value);
        }
        newGrid.push(newRow);
    }

    grid = newGrid;
}