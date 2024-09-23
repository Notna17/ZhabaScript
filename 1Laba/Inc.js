//Перший тип increment
const number = 9
inc1 = (x) => ++x
let bigNumber = inc1(number)
console.dir({number, bigNumber})
//Другий тип increment
let database = { 
    nn: "distraction",
    n: 7,
    m: "distraction" }
inc2 = (obj) => {obj.n += 1}
inc2(database)
console.dir({database})