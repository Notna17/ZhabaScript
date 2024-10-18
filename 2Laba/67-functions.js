const average = (a,b) => {return (a+b)/2}
const square = (a) => {return a*a}
const cube = (a) => {return a*a*a}
const calculate = (start, end) => {
    let answer = []
    let x
    for (let i = start; i <= end; i++) {
        x = average(square(i),cube(i))
        answer.push(x) 
    }
    return answer
}
console.dir(calculate(0,9))
const fn = () => {
    const a = {name: ''}
    let b = {name: ''}
    a.name = 'Anton'
    b.name = 'Anton'
    // a = {WhyConstChanging: true} не працює, бо це константа
    b = {ThisShallWork: true}
    console.dir(a)
    console.dir(b)
}
fn()