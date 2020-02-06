
function changeRule(value) {
    if (value >= 0 && value < 256) {
        valueString = parseInt(value, 10).toString(2);
        valueString = "00000000".substr(valueString.length) + valueString;
        var texto = document.getElementById("ruleRange");
        texto.innerHTML = value;
        updateRule(valueString);
        updateResults(valueString);
    }
}

function resize(newSize) {
    if (newSize >= getSize())
        growArray(newSize);
    else
        shrinkArray(newSize);
    var array = getGrid();
    updateImage(array);
}