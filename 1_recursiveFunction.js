// №1 Exponentiation function
function pow(num, e) {
    if (e === 0) return 1;
    
    if (e === 1) {
        return num;
    } else {
        return num * pow(num, e - 1);
    }
}

console.log(pow(3,2));
