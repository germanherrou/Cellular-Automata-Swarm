var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 500,
    height: 500
});

// then create layer
var layer = new Konva.Layer();

side = 50;
var array = getArray();
var squares = [];
var color = 'white'
for (let index = 0; index < array.length; index++) {
    if (array[index] == 1)
        color = 'gray'
    else
        color = 'white'


    var square = new Konva.Rect({
        id: index,
        x: index * side,
        y: 20,
        width: side,
        height: side,
        fill: color,
        stroke: 'black',
        strokeWidth: 4
    });

    square.on('click', function (info) {
        value = 0;
        if (this.fill() == 'gray')
        {
            this.fill('white');
        }
        else
        {
            this.fill('gray');
            value = 1;
        }
        layer.draw();
        update(this.index, value);
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

function next() {
    transition();
    var array = getArray();
    squares.forEach(square => {
        var value = array[square.index];
        if (value){
            square.fill('gray');
        }
        else {
            square.fill('white');
        }
    });
    layer.draw();
}