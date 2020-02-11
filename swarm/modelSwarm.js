var size = 14;
var grid = [];
var foodNeeded = 3;

function randomConfiguration() {
    var newGrid = [];
    for (let index = 0; index < size; index++) {
        var row = [];
        for (let index = 0; index < size; index++) {
            var tribe = Math.floor(Math.random() * 5);
            var food = Math.floor(Math.random() * 4);
            var war = Math.floor(Math.random() * 4);
            var culture = Math.floor(Math.random() * 4);
            var cell = new SwarmCell(tribe, food, war, culture);
            row.push(cell);
        }
        newGrid.push(row);
    }
    grid = newGrid;
}

function neighbors(row, column) {
    var neighbors = [];
    var newRow;
    var newColumn;
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

                neighbors.push(grid[newRow][newColumn]);

            }

        }
    }
    return neighbors;
}

function evolve(row, column) {
    var cell = getGrid()[row][column];
    var neigh = neighbors(row, column);
    if (isAlive(cell))
        cell.tribe = survivors(cell, neigh);
    else
        cell.tribe = births(cell, neigh);

    return cell;
}

function isAlive(cell) {
    return cell.tribe != 0;
}

function survivors(cell, neighbors) {
    return mostResources(cell, neighbors, function (element) {
        return element.war;
    })
}

function births(cell, neighbors) {
    return mostResources(cell, neighbors, function (element) {
        return element.culture;
    })
}

function mostResources(cell, neighbors, funcResource) {
    //neighborsPerTribe[n] cantidad miembros tribu n + 1
    //tribus 1 azul 2 rojo 3 amarillo 4 verde
    var foodPerTribe = [0, 0, 0, 0];
    var resourcesPerTribe = [0, 0, 0, 0];
    var newTribe = 0;
    var mostResources = 0;

    if (cell.tribe > 0) {
        foodPerTribe[cell.tribe - 1] += cell.food;
        resourcesPerTribe[cell.tribe - 1] += funcResource(cell);
    }

    neighbors.forEach(neighbor => {
        if (neighbor.tribe > 0) {
            foodPerTribe[neighbor.tribe - 1] += neighbor.food;
            resourcesPerTribe[neighbor.tribe - 1] += funcResource(neighbor);
        }
    });

    for (let index = 0; index < foodPerTribe.length; index++) {
        //Solo los tengo en cuenta si juntan
        //el requisito de alimentos
        if (foodPerTribe[index] >= foodNeeded) {
            //Me quedo con el que tenga mas recursos
            if (resourcesPerTribe[index] > mostResources) {
                newTribe = index + 1;
                mostResources = resourcesPerTribe[index];
            }
            else if (resourcesPerTribe[index] == mostResources) {
                //Si hay dos o mas tribus con misma puntuacion
                //ninguna se queda con la casilla
                newTribe = 0;
            }
        }
    }
    return newTribe;
}