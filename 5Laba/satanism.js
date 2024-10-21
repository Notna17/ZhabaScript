//задача про послідовні функції
const seq = (f) => {
    return func = (g) => {
        if (typeof g === 'number') {
            return f(g)
        }
        if (typeof g === 'function') {
            return seq(y => f(g(y)))}
    }
}
const x = seq(y => y + 5)(y => y * 3)(y => ++y)(7)
console.log(x)

//я просто сподіваюся, що код нижче мені ніколи не потрібен буде
const array = () => {
    let actualArray = []
    let see = (i) => {
        return actualArray[i]
    }
    see.push = (el) => {
        return actualArray.push(el)
    }
    see.pop = () => {
        return actualArray.pop()
    }
    return see
}
let a = array()
a.push(8)
a.push(9)
console.dir(a.pop())
console.dir(a(0))