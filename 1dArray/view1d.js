let offsetWidth = 15;

function fitStageInConainer() {
    let container = document.getElementById("stage-container");
    let containerWidth = container.offsetWidth - offsetWidth;
    stage.width(containerWidth);
    updateImage(array); 
}


window.addEventListener('resize', fitStageInConainer);
fitStageInConainer();