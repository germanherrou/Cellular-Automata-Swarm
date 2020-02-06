var offsetWidth = 45;
var offsetHeight = 20;

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