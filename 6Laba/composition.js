const inc = (x) => {
    if (typeof x !== 'number') throw 'Should enter number'
    return ++x}
const isOdd = (x) => (x % 2 === 1)
const not = (x) => !x
// по якійсь причині unite не працює без buffer, і я не розумію чого
const unite = (...funcs) => {
    if (funcs.length === 0) {
        throw 'Expected at least 1 function'
    }
    let answer
    let buffer = (x => x)
    for (const f of funcs) {
        if (typeof f !== 'function') {throw 'Expected input is function'}
        answer = (x) => {
            return f(buffer)
        }
        buffer = answer
    }
    return answer
}
const isOddButFancy = unite(inc, isOdd, not)
console.log(isOddButFancy(8))

//тут друге завдання
const uniteArab = (...funcs) => {
    const united = (x) => {
        let answer = x
        try {
            if (funcs.length === 0) {throw 'Expected at least 1 function'}
            for (let i = funcs.length - 1; i >= 0; i--) {
                if (typeof funcs[i] !== 'function') {throw 'Expected input is function'}
                answer = funcs[i](answer)  }
            return answer
        } catch (error) {return error}
    }
    return united
}
const isOddButFancyAsHell = uniteArab(not, not, isOdd, inc, inc)
console.dir(isOddButFancyAsHell(11))
console.dir(isOddButFancyAsHell('11'))
const wrong = uniteArab(9, 5)
const bruh = uniteArab()
console.dir(wrong(7))
console.dir(bruh(null))