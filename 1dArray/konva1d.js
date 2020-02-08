var array = getGrid();
var defaultSide = 50;
var side = defaultSide;
var squares = [];
var stage = new Konva.Stage({
    container: 'container1d', // id of container <div>
    width: 760,
    height: 100,

});
var layer = new Konva.Layer();

function updateImage(array) {
    squares.forEach(square => {
        square.remove();
    });
    squares = [];

    if (array.length * defaultSide - offsetWidth >= stage.width()){
        side = Math.floor((stage.width() - offsetWidth) / array.length);
    }
    else {
        side = defaultSide;
    }

    var color = 'white';
    for (let index = 0; index < array.length; index++) {
        if (array[index])
            color = 'gray'
        else
            color = 'white'


        var square = new Konva.Rect({
            id: index,
            index: index,
            x: index * side,
            y: 20,
            width: side,
            height: side,
            fill: color,
            stroke: 'black',
            strokeWidth: 4,
            preventDefault: false
        });

        square.on('click', function(info) {
            if (!isRunning()) {
                value = 0;
                if (this.fill() == 'gray') {
                    this.fill('white');
                } else {
                    this.fill('gray');
                    value = 1;
                }
                layer.draw();
                update(this.index, value);
            }

        })

        squares.push(square);

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