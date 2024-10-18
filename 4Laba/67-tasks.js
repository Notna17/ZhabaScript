const max = (matrix) => {
    let array = matrix.flat(Infinity)
    let answer = array[0]
    for (const i of array) {
        if (answer < i) answer = i
    }
    return answer
}
const matrix = [[-5,-4,-9],[-1,-6,-8],[-2,-4,-6]]
console.log(max(matrix))

const persons = {
    bandera: {born: 1909, died: 1959},
    petlura: {born: 1879, died: 1926},
    kravchuk: {born: 1892, died: 1942},
}
const ages = (object) => {
    let answer = {}
    let age
    for (const name in object) {  
        age = object[name].died - object[name].born 
        answer[name] = age
    }
    return answer
}

console.dir(ages(persons))