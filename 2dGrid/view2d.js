var layer = new Konva.Layer();
var defaultSide = 50;
var side = defaultSide;
var grid = getGrid();
var squares = [];
var offsetWidth = 45;
var offsetHeight = 20;
var maxWidth = 780;

function updateImage(grid) {
    squares.forEach(square => {
        square.remove();
    });
    squares = [];

    var color = 'white';

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const element = grid[rowIndex][columnIndex];

            if (element)
                color = 'gray'
            else
                color = 'white'

            var square = new Konva.Rect({
                id: (rowIndex * 10) + columnIndex,
                x: columnIndex * side,
                y: offsetHeight + rowIndex * side,
                width: side,
                height: side,
                fill: color,
                stroke: 'black',
                strokeWidth: 4
            });

            square.on('click tap', function (info) {
                if (!isRunning()) {
                    value = 0;
                    if (this.fill() == 'gray') {
                        this.fill('white');
                    } else {
                        this.fill('gray');
                        value = 1;
                    }
                    layer.draw();
                    var row = (this.attrs.y - 20) / side;
                    var column = this.attrs.x / side;
                    update(row, column, value);
                }
            })

            squares.push(square);

        }

    }

    // add the shape to the layer
    squares.forEach(square => {
        layer.add(square);
    });

    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.draw();
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


var stage = new Konva.Stage({
    container: 'container2d', // id of container <div>
    width: maxWidth,
    height: 780,
});

window.addEventListener('resize', fitStageInConainer);
fitStageInConainer();