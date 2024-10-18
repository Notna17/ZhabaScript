const numbers1 = [1, 2, 3, 4, 5, 6, 7]
const numbers2 = [2,5,8]
const towns = ['Lutsk', 'Kovel', 'Rivne', 'Kovel']


const removeElements = (array, ...remove) => {
    let answer = []
    for (const i of array) {
        let shouldStay = true
        for (const rem of remove) {
            if (i === rem) {
                shouldStay = false
            }
        }
        if (shouldStay) {answer.push(i)}
    }
    return answer
}
console.dir(removeElements(towns, 'Kovel', 'Uzhgorod'))
console.dir(removeElements(numbers1, 3))

const unique = (array) => {
    let answer = []
    for (const i of array) {
        let shouldAdd = true
        for (const j of answer) {
            if (i === j) shouldAdd = false
        }
        if (shouldAdd) answer.push(i)
    }
    return answer
}
console.dir(unique(towns))

const difference = (array1, array2) => removeElements(array1, ...array2)
console.dir(difference(numbers1, numbers2))