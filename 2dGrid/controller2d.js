function changeNeighborhood() {
    toogleNeighborhood();
    setNeighborhoodButtons();
}

function changeRows(total) {
    var length = getGrid().length;
    if (length < total)
        addRows(total - length);
    else
        removeRows(length - total);
    fitStageInConainer();
}

function changeColumns(total) {
    var length = getGrid()[0].length;
    if (length < total)
        addColumns(total - length);
    else
        removeColumns(length - total);
    fitStageInConainer();
}