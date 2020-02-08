var squares = [];
var texts = [];
side = 40;

function getColor(tribe) {
    switch (tribe) {
        case 1:
            return 'blue';
            break;
        case 2:
            return 'red';
            break;
        case 3:
            return 'yellow';
            break;
        case 4:
            return 'green';
            break;

        default:
            return 'white';
            break;
    }
}


function updateImage(grid) {
    squares.forEach(square => {
        square.destroy();
    });
    squares = [];

    texts.forEach(text => {
        text.destroy();
    });
    texts = [];

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const element = grid[rowIndex][columnIndex];

            var color = getColor(element.tribe);

            var info = "🍗 " + element.food + "\n" + "🗡️ " + element.war + "\n" + "🗿 " + element.culture;

            var square = new Konva.Rect({
                id: (rowIndex * 10) + columnIndex,
                x: columnIndex * side,
                y: rowIndex * side,
                width: side,
                height: side,
                fill: color,
                stroke: 'black',
                strokeWidth: 4,
                preventDefault: false
            });

            square.on('click', function (info) {
                var row = (this.attrs.y - 20) / side;
                var column = this.attrs.x / side;
                setInfoChangeMenu(row, column);
            })

            var text = new Konva.Text({
                x: 5 + columnIndex * side,
                y: 5 + rowIndex * side,
                text: info,
                fontSize: 11,
                fontFamily: 'Calibri',
                fill: 'black'
            });

            text.on('click', function (info) {
                var row = (this.attrs.y - 5) / side;
                var column = (this.attrs.x - 5) / side;
                setInfoChangeMenu(row, column);
            })


            squares.push(square);
            texts.push(text);

        }

    }

    // add the shape to the layer
    squares.forEach(square => {
        layer.add(square);
    });

    texts.forEach(text => {
        layer.add(text);
    });

    // add the layer to the stage
    stage.add(layer);

    // draw the image
    layer.batchDraw();
}

var stage = new Konva.Stage({
    container: 'container-swarm', // id of container <div>
    width: 1000,
    height: 1000,
});

var layer = new Konva.Layer();
randomConfiguration();

var grid = getGrid();


updateImage(grid);