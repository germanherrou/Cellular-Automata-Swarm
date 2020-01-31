var size = 4;
var grid = [];
var foodNeeded = 3;

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
    grid.push(row);
}

function evolve(row, column) {
    var cell = getGrid()[row][column];
    var neighbours = neighbors(row, column);
    if (isAlive(cell))
        cell.tribe = survives(cell, neighbours);
    else
        cell.tribe = births(neighbours);

    return cell;
}

function neighbors(row, column) {
    var neighbors = [];
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
            if ((rowOffset != 0 || columnOffset != 0) &&
                row + rowOffset < grid.length &&
                column + columnOffset < grid[0].length &&
                row + rowOffset >= 0 &&
                column + columnOffset >= 0)
                neighbors.push(grid[row + rowOffset][column + columnOffset]);
        }
    }
    return neighbors;
}

function isAlive(cell) {
    return cell.tribe != 0;
}

function survives(cell, neighbours) {
    var sameTribe = 0;
    var diferentTribe = 0;
    var food = cell.food;
    var warScore = cell.war;
    var enemyWarScore = 0;
    var newTribe;

    neighbours.forEach(neighbour => {
        //0 no hay nadie en la celda
        if (neighbour.tribe != 0) {
            if (neighbour.tribe == cell.tribe) {
                sameTribe++;
                food += neighbour.food;
                warScore += neighbour.war;
            }
            else {
                diferentTribe++;
                enemyWarScore += neighbour.war;
            }

        }

    });
    //Requiero suficiente alimento
    if (food >= foodNeeded) {
        //Deben superar o igualar tribus enemigas
        if (enemyWarScore > warScore) {
            newTribe = 0; //Muere por tener menos punt. guerra
        }
        else {
            newTribe = cell.tribe; //Sobrevive por tener punt. guerra suficiente
        }
    }
    else {
        newTribe = 0; //Muere de inanición
    }

    return newTribe;
}

function births(neighbours) {
    //neighboursPerTribe[n] cantidad miembros tribu n + 1
    //tribus 1 azul 2 rojo 3 amarillo 4 verde
    var foodPerTribe = [0, 0, 0, 0];
    var culturePerTribe = [0, 0, 0, 0];
    var newTribe = 0;
    var mostCulture = 0;

    neighbours.forEach(neighbour => {
        if (neighbour.tribe > 0) {
            foodPerTribe[neighbour.tribe - 1] += neighbour.food;
            culturePerTribe[neighbour.tribe - 1] += neighbour.culture;
        }
    });

    for (let index = 0; index < foodPerTribe.length; index++) {
        //Solo los tengo en cuenta si juntan
        //el requisito de alimentos
        if (foodPerTribe[index] >= foodNeeded) {
            //Me quedo con el que tenga mayor cultura
            if (culturePerTribe[index] > mostCulture) {
                newTribe = index + 1;
                mostCulture = culturePerTribe[index];
            }
            else if (culturePerTribe[index] == mostCulture) {
                //Si hay dos o mas tribus con misma puntuacion
                //ninguna se queda con la casilla
                newTribe = 0;
            }
        }
    }

    return newTribe;
}