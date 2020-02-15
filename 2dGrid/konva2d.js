let maxWidth = 780;
let stage = new Konva.Stage({
    container: 'container2d', // id of container <div>
    width: maxWidth,
    height: 780,
});
let layer = new Konva.Layer();
let squares = [];
let defaultSide = 50;
let side = defaultSide;

function updateImage(grid) {
    squares.forEach(square => {
        square.destroy();
    });
    squares = [];

    let color = 'white';

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const element = grid[rowIndex][columnIndex];

            if (element)
                color = 'gray'
            else
                color = 'white'

            let square = new Konva.Rect({
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

            square.on('mousedown', function (info) {
                if (!isRunning()) {
                    value = 0;
                    if (this.fill() == 'gray') {
                        this.fill('white');
                    } else {
                        this.fill('gray');
                        value = 1;
                    }
                    layer.draw();
                    let row = (this.attrs.y - offsetHeight) / side;
                    let column = this.attrs.x / side;
                    update(row, column, value);
                }
            })

            square.on('mouseover', function (event) {
                if (event.evt.buttons == 1){
                    event.target.fire('mousedown');
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
    layer.batchDraw();
}