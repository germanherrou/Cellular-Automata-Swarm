function next() {
    transition();
    updateImage(getGrid());
}

function setRandom() {
    randomConfiguration();
    updateImage(getGrid());
}

function setClear() {
    clear();
    updateImage(getGrid());
}
