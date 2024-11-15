const randomNumber = (min, max) => {
    if (!max) {
        max = min
        min = 0
    }
    return min + Math.floor(Math.random() * (max - min + 1))
}
const randomString = (n, alphabet) => {
    char = [...alphabet]
    let answer = ''
    for (let i = 0; i < n; i++) {
        let rand = Math.floor(Math.random() * char.length)
        let symbol = char[rand]
        answer = answer.concat(symbol)
    }
    return answer
}
const ukraine = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'
console.log(randomNumber(5, 10))
console.log(randomNumber(4))
console.log(randomString(10, ukraine))