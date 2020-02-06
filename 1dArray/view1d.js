var offsetWidth = 15;

function fitStageInConainer() {
    var container = document.getElementById("stage-container");
    var containerWidth = container.offsetWidth - offsetWidth;
    stage.width(containerWidth);
    updateImage(array); 
}


window.addEventListener('resize', fitStageInConainer);
fitStageInConainer();