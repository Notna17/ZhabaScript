const thirdTask = (ip) => {
    let answer = 0
    const numbers = ip.split('.')
    for (let i = 0; i < numbers.length; i++) {
        answer = answer << 8
        answer += Number(numbers[i])
    }
    return answer
}
console.log(thirdTask('1.1.1.0'))

const fourthTask = (object) => {
    let answer = []
    for (let key in object) {
        let el = object[key]
        if (typeof el === 'function') {answer.push([key, el.length])}
    }
    return answer
}
const data = {
    idThing: thirdTask,
    number: 42,
    uselessAddition: true,
    what: (a, b) => null
}
console.log(fourthTask(data))