function setMoore(state) {
    if (isMooreNeighborhood() != state) {
        toogleNeighborhood();
        setNeighborhoodButtons();
    }
    
}

function changeRows(total) {
    let length = getGrid().length;
    if (length < total)
        addRows(total - length);
    else
        removeRows(length - total);
    fitStageInConainer();
}

function changeColumns(total) {
    let length = getGrid()[0].length;
    if (length < total)
        addColumns(total - length);
    else
        removeColumns(length - total);
    fitStageInConainer();
}