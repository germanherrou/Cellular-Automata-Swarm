var currentRow = -1;
var currentColumn = -1;
function setInfoChangeMenu(row, column) {
    currentRow = row;
    currentColumn = column;
    var cell = getGrid()[row][column];
    document.getElementById("current-cell").innerHTML =
     "(" + row +" " + column + ")";
    document.getElementById("tribe-input").value = cell.tribe;
    document.getElementById("food-input").value = cell.food;
    document.getElementById("war-input").value = cell.war;
    document.getElementById("culture-input").value = cell.culture;
    document.getElementById("swarm-cell-button").disabled = false;
}

function resetCellInput() {
    urrentRow = -1;
    currentColumn = -1;
    document.getElementById("current-cell").innerHTML =
     "-Ninguna-";
    document.getElementById("tribe-input").value = 0;
    document.getElementById("food-input").value = 0;
    document.getElementById("war-input").value = 0;
    document.getElementById("culture-input").value = 0;
    document.getElementById("swarm-cell-button").disabled = true;
}

