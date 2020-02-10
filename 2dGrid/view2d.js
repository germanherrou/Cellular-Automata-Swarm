var offsetWidth = 20;
var offsetHeight = 20;

function setNeighborhoodButtons() {
    var elements = document.getElementsByClassName("mooreNeighborhood");
    for (let element of elements) {
        if (isMooreNeighborhood()) {
            element.disabled = false;
        }
        else {
            element.checked = false;
            element.disabled = true;
        }
    }
}

function stop2d() {
    stop();
    setNeighborhoodButtons();
}

function fitStageInConainer() {
    var container = document.getElementById("stage-container");
    var containerWidth = container.offsetWidth - offsetWidth;
    if (containerWidth < maxWidth) {
        stage.width(containerWidth);
    }
    else {
        stage.width(maxWidth);
    }

    if (grid[0].length * defaultSide >= stage.width()) {
        side = Math.floor((stage.width() - offsetWidth) / grid[0].length);
    }
    else {
        side = defaultSide;
    }

    stage.height(side * grid.length + offsetHeight + 5);

    updateImage(grid);
}

window.addEventListener('resize', fitStageInConainer);
fitStageInConainer();