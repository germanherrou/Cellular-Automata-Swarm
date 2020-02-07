var maxWidth = 780;
var stage = new Konva.Stage({
    container: 'container2d', // id of container <div>
    width: maxWidth,
    height: 780,
});
var layer = new Konva.Layer();
var grid = getGrid();
var squares = [];
var defaultSide = 50;
var side = defaultSide;

function updateImage(grid) {
    squares.forEach(square => {
        square.destroy();
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
                strokeWidth: 4,
                preventDefault: false
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