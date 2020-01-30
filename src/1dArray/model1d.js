var array = [1, 1, 0, 1, 1, 0, 0, 1, 0, 0];
var rule = "00110010";

function getArray() {
    return array;
}

function getSize() {
    return array.length;
}

function update(index, value) {
    array[index] = value;
}

function getRule() {
    return rule;
}

function updateRule(value) {
    rule = value;
}

function growArray(newSize) {
    while (array.length < newSize) {
        array.push(0);
    }
}

function shrinkArray(newSize) {
    while (array.length > newSize) {
        array.pop();
    }
}

function transition() {
    var newArray = [];
    var value = 0;
    for (let index = 0; index < array.length; index++) {
        if (index == 0)
            value = evolve(array[(array.length - 1)], array[index], array[index + 1]);
        else if (index == (array.length - 1))
            value = evolve(array[index - 1], array[index], array[0]);
        else
            value = evolve(array[index - 1], array[index], array[index + 1]);

        newArray.push(value);

    }
    array = newArray;

}

function evolve(previous, current, next) {
    var configurationBinary = previous * 100 + current * 10 + next;
    var configurationDecimal = parseInt(configurationBinary, 2);
    var ruleValueChar = rule.charAt(7 - configurationDecimal);
    var ruleValue = parseInt(ruleValueChar, 10);
    return ruleValue;
}