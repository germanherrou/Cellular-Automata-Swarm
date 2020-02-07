function setCellValues() {
 var tribe = document.getElementById("tribe-input").value;
 var food = document.getElementById("food-input").value;
 var war = document.getElementById("war-input").value;
 var culture = document.getElementById("culture-input").value;

 var cell = getGrid()[currentRow][currentColumn];
 cell.tribe = tribe;
 cell.food = food;
 cell.war = war;
 cell.culture = culture;

 update(currentRow, currentColumn, cell);
 resetCellInput();
 updateImage(getGrid());
}