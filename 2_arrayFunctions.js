
// №2 Map, filter, reduce

function customReduce(arr, callback, initialValue) {
    let result;
 
    for (let i = 0; i < arr.length ; i++) {
        if (initialValue) {                 // в случае, если задано начальное значение
            if (i === 0) {
                result = callback(initialValue, arr[i], i, arr);
                console.log('hello initial');
            } else {
                result = callback(result, arr[i], i, arr);
                console.log(`result ${result}`);
            }
        } else {
            if (i === 0) {
                result = callback(arr[i], arr[i + 1], i, arr);
                console.log(`result ${result} first i`);
            } else if (i !== 1) {           // здесь пропускаем одну итерацию, тк на предыдущей итерации этот элемент уже был задействован (arr[i + 1])
                result = callback(result, arr[i], i, arr);
                console.log(`result ${result}`);
            }
        }
    }
    return result;

}
console.log(customReduce([[1,1], [2, 2], [3, 3]], (acc, cur) => {
    return acc.concat(cur);
}, [4,4]));


function customFilter(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
}

// test
let someArr1 = ['dfs',23,'fd',[1,2,3,4], 'array'];

let newArr1 = customFilter(someArr1, (item, i, arr) => {
    return typeof item !== 'string' && typeof arr[i + 1] === 'string';
});

console.log(newArr1, 'newArr');



function customMap(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr));
    }
    return result;
}

// test
let someArr2 = [1,2,3,4,5];

let newArr2 = customMap(someArr2, (item, i, arr) => {
    return `${item}, next: ${arr[i + 1]}`;
});

console.log(newArr2, 'newArr');
