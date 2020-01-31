function disableControls(state) {
    var elements = document.getElementsByClassName("settings-configuration");
    for (let element of elements) {
        element.disabled = state;
    }
}