let headLength = 20;

let stageRuleset1d = new Konva.Stage({
    container: 'ruleset1d', // id of container <div>
    width: 250,
    height: 500
});

let layerRuleset1d = new Konva.Layer();

let results = [];

for (let index = 7; index >= 0; index--) {
    let number = parseInt(index, 10).toString(2);
    numberString = "000".substr(number.length) + number;

    for (let digitIndex = 0; digitIndex < 3; digitIndex++) {
        let digit = numberString.charAt(digitIndex);
        let color = 'white';
        if (digit === '1')
            color = 'gray';

        let square = new Konva.Rect({
            id: index + digitIndex + "1d",
            x: digitIndex * side,
            y: 10 + ((7 - index) * (side + 10)),
            width: side,
            height: side,
            fill: color,
            stroke: 'black',
            strokeWidth: 4,
            preventDefault: false
        });

        layerRuleset1d.add(square);
    }

    let arrow = new Konva.Arrow({
        x: 3.70 * side,
        y: 10 + ((7 - index) * (side + 10)) + side / 2,
        pointerLength: headLength,
        pointerWidth: 20,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4,
        preventDefault: false
    });

    layerRuleset1d.add(arrow);

    if (rule.charAt(7 - index) == '1') {
        color = 'gray';
    }
    else {
        color = 'white';
    }

    let squareResult = new Konva.Rect({
        x: 3.5 * side + headLength,
        y: 10 + ((7 - index) * (side + 10)),
        width: side,
        height: side,
        fill: color,
        stroke: 'black',
        strokeWidth: 4,
        preventDefault: false
    });

    layerRuleset1d.add(squareResult);
    results.push(squareResult);
}

stageRuleset1d.add(layerRuleset1d);
layerRuleset1d.draw();

function updateResults(rule) {
    let color = 'white';
    for (let index = 0; index < rule.length; index++) {
        if (rule.charAt(index) == '1') {
            color = 'gray';
        }
        else {
            color = 'white';
        }
        results[index].fill(color);
    }

    layerRuleset1d.draw();
}