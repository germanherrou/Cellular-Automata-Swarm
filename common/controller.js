var timer;
var running = false;

function start() {
    if (!running) {
        disableControls(true);
        running = true;
        timer = setInterval(next, 1000);
        var texto = document.getElementById("simulacion");
        texto.innerHTML = "Simulación en curso";
        texto.style.color = "green";
    }

}

function stop() {
    clearInterval(timer);
    running = false;
    disableControls(false);
    var texto = document.getElementById("simulacion");
    texto.innerHTML = "Simulación detenida";
    texto.style.color = "red";
}

function isRunning() {
    return running;
}