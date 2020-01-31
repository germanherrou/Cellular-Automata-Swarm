var squares = [];
var texts = [];
side = 100;


function updateImage(grid) {
    squares.forEach(square => {
        square.remove();
    });
    squares = [];

    texts.forEach(text => {
        text.remove();
    });
    texts = [];

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const element = grid[rowIndex][columnIndex];

            var info = "⚪ " + element.tribe + "" + "🍗 " + element.food + "\n" + "🗡️ " + element.war + "" + "🕌 " + element.culture;

            var square = new Konva.Rect({
                id: (rowIndex * 10) + columnIndex,
                x: columnIndex * side,
                y: 20 + rowIndex * side,
                width: side,
                height: side,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 4
            });

            square.on('click tap', function (info) {
                var row = (this.attrs.y - 20) / side;
                var column = this.attrs.x / side;
                setInfoChangeMenu(row, column);
            })

            var text = new Konva.Text({
                x: 5 + columnIndex * side,
                y: 45 + rowIndex * side,
                text: info,
                fontSize: 25,
                fontFamily: 'Calibri',
                fill: 'black'
            });

            text.on('click tap', function (info) {
                var row = (this.attrs.y - 45) / side;
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
    layer.draw();
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