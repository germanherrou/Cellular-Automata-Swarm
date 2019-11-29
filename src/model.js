var array = [1, 1, 0, 1, 1];

function getArray(){
    return array;
}

function update(index, value) {
    array[index] = value;
}

function transition() {
    var newArray = [];
    var value = 0;
    for (let index = 0; index < array.length; index++) {
        var blacks = 0;
        if (index == 0)
            blacks = array[index] + array[(array.length - 1)] + array[index + 1];
        else if (index == (array.length - 1))
            blacks = array[index] + array[index - 1] + array[0];
        else
            blacks = array[index] + array[index - 1] + array[index + 1];
        if (blacks == 1)
            value = 1;
        else
            value = 0;

        newArray.push(value);

    }
    array = newArray;

}