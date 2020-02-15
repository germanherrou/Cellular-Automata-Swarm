let squares = [];
let texts = [];
side = 60;

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


function createCanvas(grid) {
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

            let color = getColor(element.tribe);

            let info = "🍗 " + element.food + "\n" + "🗡️ " + element.war + "\n" + "🗿 " + element.culture;

            let square = new Konva.Rect({
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
                let row = this.attrs.y / side;
                let column = this.attrs.x / side;
                setInfoChangeMenu(row, column);
            })

            let text = new Konva.Text({
                x: 5 + columnIndex * side,
                y: 5 + rowIndex * side,
                text: info,
                fontSize: 18,
                fontFamily: 'Calibri',
                fill: 'black',
                preventDefault: false
            });

            text.on('click', function (info) {
                let row = (this.attrs.y - 5) / side;
                let column = (this.attrs.x - 5) / side;
                setInfoChangeMenu(row, column);
            })


            squares.push(square);
            texts.push(text);

        }

    }

    // add the shape to the layer
    squares.forEach(square => {
        squareLayer.add(square);
    });

    texts.forEach(text => {
        textLayer.add(text);
    });

    // add the layers to the stage
    stage.add(squareLayer);
    stage.add(textLayer);

    // draw the image
    squareLayer.batchDraw();
    textLayer.batchDraw();
}

function updateImage(grid) {

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const element = grid[rowIndex][columnIndex];

            let color = getColor(element.tribe);
            let totalColumns = getGrid().length;

            let cell = squares[rowIndex * totalColumns + columnIndex];
            cell.fill(color);
        }
    }
    
    squareLayer.batchDraw();
}

function updateTextCell(row, column, element) {
    let info = "🍗 " + element.food + "\n" + "🗡️ " + element.war + "\n" + "🗿 " + element.culture;
    let color = getColor(element.tribe);

    let totalColumns = getGrid().length;

    let cell = squares[row * totalColumns + column];
    let text = texts[row * totalColumns + column];

    cell.fill(color);
    text.text(info);
    squareLayer.draw();
    textLayer.draw();
}

let stage = new Konva.Stage({
    container: 'container-swarm', // id of container <div>
    width: 850,
    height: 850,
});

let squareLayer = new Konva.Layer();
let textLayer = new Konva.Layer();
randomConfiguration();


createCanvas(grid);