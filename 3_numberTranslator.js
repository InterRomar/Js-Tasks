// №3 Number translator (0 - 999.999)

const textValues = {
    single: [
        'Ноль', 'Один', 'Два', 'Три', 'Четыре', 'Пять', 'Шесть', 'Семь', 'Восемь', 'Девять',
    ],
    tenths: [
        'Десять', 'Одиннадцать', 'Двенадцать', 'Тринадцать', 'Четырнадцать', 'Пятнадцать', 'Шестнадцать', 'Семнадцать', 'Восемнадцать', 'Девятнадцать',
    ],
    twoDigit: [
        'Двадцать', 'Тридцать', 'Сорок', 'Пятьдесят', 'Шестьдесят', 'Семьдесят', 'Восемьдесят', 'Девяносто'
    ],
    threeDigit: [
        'Сто', 'Двести', 'Триста', 'Четыреста', 'Пятьсот', 'Шестьсот', 'Семьсот', 'Восемьсот', 'Девятьсот'
    ],
}

function numToText(num) {       // Трансформирует переданное число в текст (принимает макс 3х-значное число)
    let strNum = String(num);
    let numLength = strNum.length;
    let result = []; 
    
    // Перевод последних двух (или одного) чисел в текст
    // ================================================================
    if (+strNum.slice(numLength - 2) < 10 && +strNum.slice(numLength - 2) !== 0) {                // Для чисел меньше 9
        result.unshift(textValues.single[+strNum.slice(numLength - 1)]);
    } else if (+strNum.slice(numLength - 2) < 20 && +strNum.slice(numLength - 2) !== 0) {  // Для чисел от 10 до 19
        result.unshift(textValues.tenths[+strNum.slice(numLength - 1)]);            
    } else {                                    // Для чисел от 20 до 99
        +strNum[numLength - 1] > 0 ? result.unshift(textValues.single[+strNum[numLength - 1]]) : true;
        result.unshift(textValues.twoDigit[+strNum.slice(numLength - 2).slice(0, 1) - 2]);            
    }
    // ================================================================
    
    // Если число 3х-значное, добавялем сотую часть (двести, триста, и тд.)
    if (numLength > 2) {           
        result.unshift(textValues.threeDigit[+strNum.slice(numLength - 3, numLength - 2) - 1]);
    }
    
    
    return result.join(' ')
}

// Главная функция
// Если передаваемое число не больше 3х символов длиной - просто возвращает результат функции numToText(num)
// Если же число длиной 4 символа и более, число разделяется на две части, для каждой из которой отдельно вызывается numToText(num)
//.. а после склеивается с добавлением слова "тысяч"
function numberTranslator(num) {   
    if (num < 0 || num > 999999) return 'Введено некорректное число! Попробуйте снова'     
    let strNum = String(num);

    if (strNum.length < 4) return numToText(num).toLowerCase();

    let leftPart = strNum.slice(0,-3),
        rightPart = strNum.slice(-3);

    let result = '';
    result += numToText(+leftPart);
    result = result.split(' ').map(word => {
        if (word === 'Один') return 'Одна';
        if (word === 'Два') return 'Две';
        return word;
    }).join(' ');

    switch (leftPart[leftPart.length - 1]) {
        case '1':
            result += ' тысяча ';
            break;
        case '2':
        case '3':
        case '4':
            result += ' тысячи ';
            break;
        default:
            result += ' тысяч ';
            break;
    }

    +rightPart !== 0 ? result += numToText(+rightPart) : result += '';

    result = result.replace(/ {1,}/g," ");  // Фикс двойных пробелов
    return result.toLowerCase();

}

console.log(numberTranslator(973081));