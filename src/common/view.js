function disableBars(state) {
    var elements = document.getElementsByClassName("settings-bar");
    for (let element of elements) {
        element.disabled = state;
    }
}