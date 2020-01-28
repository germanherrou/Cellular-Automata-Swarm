var grid = [[1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 0], [0, 0, 0, 1]];
var births = [3];
var survives = [2, 3];
var mooreNeighborhood = true; // Moore 8 vecinos, Von Neumann 4 vecinos

function getGrid() {
    return grid;
}

function update(row, column, value) {
    grid[row][column] = value;
}

function toggle(name, number) {
    var array = births;
    if (name == 'survives')
        array = survives;

    if (array.includes(number))
        array.splice(array.indexOf(number), 1);
    else
        array.push(number);
}

function toogleNeighborhood() {
    mooreNeighborhood = !mooreNeighborhood;
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
    var result = false;

    if (mooreNeighborhood)
        neighbors = mooreNeighbors(row, column);
    else
        neighbors = vonNeumannNeighbors(row, column);

    if (grid[row][column])
        result = survives.includes(neighbors);
    else result = births.includes(neighbors);

    if (result)
        return 1
    else return 0;

}

function mooreNeighbors(row, column) {
    var total = 0;
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
            if ((rowOffset != 0 || columnOffset != 0)
                && row + rowOffset < grid.length
                && column + columnOffset < grid[0].length
                && row + rowOffset >= 0
                && column + columnOffset >= 0)
                total += grid[row + rowOffset][column + columnOffset];
        }
    }
    return total;
}

function vonNeumannNeighbors(row, column) {
    var total = 0;
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
            if (rowOffset != columnOffset
                && rowOffset != -columnOffset
                && row + rowOffset < grid.length
                && column + columnOffset < grid[0].length
                && row + rowOffset >= 0
                && column + columnOffset >= 0)
                total += grid[row + rowOffset][column + columnOffset];
        }
    }
    return total;
}