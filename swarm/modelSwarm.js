var size = 4;
var grid = [];
for (let index = 0; index < size; index++) {
    var row = [];
    for (let index = 0; index < size; index++) {
        var number = Math.floor(Math.random() * 4);
        var cell = new SwarmCell(number, 1, 2, 3);
        row.push(cell);
    }
    grid.push(row);
}

function getGrid() {
    return grid;
}