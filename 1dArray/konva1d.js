let defaultSide = 50;
let side = defaultSide;
let squares = [];
let stage = new Konva.Stage({
    container: 'container1d', // id of container <div>
    width: 760,
    height: 80,

});
let layer = new Konva.Layer();

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

    let color = 'white';
    for (let index = 0; index < array.length; index++) {
        if (array[index])
            color = 'gray'
        else
            color = 'white'


        let square = new Konva.Rect({
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

        square.on('mousedown', function(info) {
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

        square.on('mouseover', function (event) {
            if (event.evt.buttons == 1){
                event.target.fire('mousedown');
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
    layer.batchDraw();
}