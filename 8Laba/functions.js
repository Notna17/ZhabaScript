// перше завдання
const object = {a: 1, b: 2, c: 3}


const swap = (key, value, object) => {
    let answer = {...object}
    delete answer[key]
    answer[value] = key 
    console.dir(answer)
}
iterate = (obj, f) => {
    for (const key in obj) {
       f(key, obj[key], obj)
    }
}
iterate(object, swap)
//друге завдання
const store = (x) => {
    const stored = () => {
        return x
    } 
    return stored
}
let coolString = store('I think, therefore I AM')
console.log(coolString())
//третє завдання
const isThereKey = (obj, key) => {
    return !!obj[key]
}
const contract = (f, ...types) => {
    const betterf = (...arg) => {
        for (let i = 0; i < types.length - 1; i++) {
            type = types[i]
            if (typeof arg[i] !== type.toLowerCase() ) {
                throw 'Wrong type of a argument'
            }
        }

        let finalType = types[types.length - 1]
        const answer = f(...arg)
        if (typeof answer !==  finalType.toLowerCase() ) {
            throw 'Wrong type of a answer'
        }
        return answer
    }
    return betterf
}
const check = contract(isThereKey, 'Object', 'String', 'Boolean')
console.log(check(object, 'd'))