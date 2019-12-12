var stageRuleset1d = new Konva.Stage({
    container: 'ruleset1d',   // id of container <div>
    width: 1500,
    height: 1500
});

var layerRuleset1d = new Konva.Layer();

var rule = getRule();

var side = 50;

for (let index = 7; index >= 0; index--) {
    var number = parseInt(index, 10).toString(2);
    numberString = "000".substr(number.length) + number;

    for (let digitIndex = 0; digitIndex < 3; digitIndex++) {
        var digit = numberString.charAt(digitIndex);
        var color = 'white';
        if (digit === '1')
            color = 'gray';

        var square = new Konva.Rect({
            id: index + digitIndex + "1d",
            x: digitIndex * side,
            y: 10 + ((7 - index) * (side + 10)),
            width: side,
            height: side,
            fill: color,
            stroke: 'black',
            strokeWidth: 4
        });

        layerRuleset1d.add(square);

    }


}

stageRuleset1d.add(layerRuleset1d);
layerRuleset1d.draw();