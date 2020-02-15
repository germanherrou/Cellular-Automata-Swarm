function setCellValues() {
 var tribe = document.getElementById("tribe-input").value;
 var food = document.getElementById("food-input").value;
 var war = document.getElementById("war-input").value;
 var culture = document.getElementById("culture-input").value;

 var cell = getGrid()[currentRow][currentColumn];
 cell.tribe = Number(tribe);
 cell.food = Number(food);
 cell.war = Number(war);
 cell.culture = Number(culture);

 update(currentRow, currentColumn, cell);
 resetCellInput();
 updateTextCell(currentRow, currentColumn, cell);
}

function setRandom() {
    randomConfiguration();
    createCanvas(getGrid());
}