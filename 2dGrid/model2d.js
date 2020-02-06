var grid = [
    [1, 0, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1],
];
var births = [3];
var survives = [2, 3];
var mooreNeighborhood = true; // Moore 8 vecinos, Von Neumann 4 vecinos


function addRows(value) {
    for (let index = 0; index < value; index++) {
        var newRow = [];
        grid[0].forEach(element => {
            newRow.push(0);
        });
        grid.push(newRow);
    }
}

function addColumns(value) {
    grid.forEach(row => {
        for (let index = 0; index < value; index++) {
            row.push(0);
        }
    });
}

function removeRows(value) {
    var times = 0;
    while (grid.length > 0 && times < value) {
        grid.pop();
        times++;
    }
}

function removeColumns(value) {
    grid.forEach(row => {
        var times = 0;
        while (row.length > 0 && times < value) {
            row.pop();
            times++;
        }
    });
}

function toggle(name, value) {
    var array = births;
    if (name == 'survives')
        array = survives;

    if (array.includes(value))
        array.splice(array.indexOf(value), 1);
    else
        array.push(value);
}

function toogleNeighborhood() {
    mooreNeighborhood = !mooreNeighborhood;
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

function randomConfiguration() {
    newGrid(function () {
        return Math.round(Math.random());
    })
}

function clear() {
    newGrid(function () {
        return 0;
    })
}

function newGrid(func) {
    var newGrid = [];
    grid.forEach(row => {
        var newRow = [];
        row.forEach(element => {
            var number = func();
            newRow.push(number);
        });
        newGrid.push(newRow);
    });
    grid = newGrid;
}

function mooreNeighbors(row, column) {
    var total = 0;
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
            if (rowOffset != 0 || columnOffset != 0) {
                if (row + rowOffset == grid.length)
                    newRow = 0;
                else if (row + rowOffset < 0)
                    newRow = grid.length - 1;
                else
                    newRow = row + rowOffset;

                if (column + columnOffset == grid[0].length)
                    newColumn = 0;
                else if (column + columnOffset < 0)
                    newColumn = grid[0].length - 1;
                else
                    newColumn = column + columnOffset;

                total += grid[newRow][newColumn];
            }
        }
    }
    return total;
}

function vonNeumannNeighbors(row, column) {
    var total = 0;
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
            if (rowOffset != columnOffset &&
                rowOffset != -columnOffset) {
                if (row + rowOffset == grid.length)
                    newRow = 0;
                else if (row + rowOffset < 0)
                    newRow = grid.length - 1;
                else
                    newRow = row + rowOffset;

                if (column + columnOffset == grid[0].length)
                    newColumn = 0;
                else if (column + columnOffset < 0)
                    newColumn = grid[0].length - 1;
                else
                    newColumn = column + columnOffset;

                total += grid[newRow][newColumn];
            }
        }
    }
    return total;
}