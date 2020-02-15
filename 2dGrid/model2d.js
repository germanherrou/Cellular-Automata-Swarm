let grid = [
    [1, 0, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1],
];
let births = [3];
let survivors = [2, 3];
let mooreNeighborhood = true; // Moore 8 vecinos, Von Neumann 4 vecinos


function addRows(value) {
    for (let index = 0; index < value; index++) {
        let newRow = [];
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
    let times = 0;
    while (grid.length > 0 && times < value) {
        grid.pop();
        times++;
    }
}

function removeColumns(value) {
    grid.forEach(row => {
        let times = 0;
        while (row.length > 0 && times < value) {
            row.pop();
            times++;
        }
    });
}

function toggle(name, value) {
    let array = births;
    if (name == 'survivors')
        array = survivors;

    if (array.includes(value))
        array.splice(array.indexOf(value), 1);
    else
        array.push(value);
}

function isMooreNeighborhood() {
    return mooreNeighborhood;
}

function toogleNeighborhood() {
    mooreNeighborhood = !mooreNeighborhood;
}

function evolve(row, column) {
    let neighbors = 0;
    let result = false;

    if (mooreNeighborhood)
        neighbors = mooreNeighbors(row, column);
    else
        neighbors = vonNeumannNeighbors(row, column);

    if (grid[row][column])
        result = survivors.includes(neighbors);
    else result = births.includes(neighbors);

    if (result)
        return 1
    else return 0;

}

function newGrid(func) {
    let newGrid = [];
    grid.forEach(row => {
        let newRow = [];
        row.forEach(element => {
            let number = func();
            newRow.push(number);
        });
        newGrid.push(newRow);
    });
    grid = newGrid;
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

function mooreNeighbors(row, column) {
    let total = 0;
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
    let total = 0;
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