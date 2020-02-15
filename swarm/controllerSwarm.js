function setCellValues() {
 let tribe = document.getElementById("tribe-input").value;
 let food = document.getElementById("food-input").value;
 let war = document.getElementById("war-input").value;
 let culture = document.getElementById("culture-input").value;

 let cell = getGrid()[currentRow][currentColumn];
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