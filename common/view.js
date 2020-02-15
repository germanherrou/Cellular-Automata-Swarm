let timer;
let running = false;

function start() {
    if (!running) {
        disableControls(true);
        running = true;
        timer = setInterval(next, 1000);
        let texto = document.getElementById("simulacion");
        texto.innerHTML = "Simulación en curso";
        texto.style.color = "green";
    }

}

function stop() {
    clearInterval(timer);
    running = false;
    disableControls(false);
    let texto = document.getElementById("simulacion");
    texto.innerHTML = "Simulación detenida";
    texto.style.color = "red";
}

function isRunning() {
    return running;
}

function disableControls(state) {
    let elements = document.getElementsByClassName("settings-configuration");
    for (let element of elements) {
        element.disabled = state;
    }
}