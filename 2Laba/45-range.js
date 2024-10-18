const range = (start, end) => {
    let answer = []
    for (let i = start; i <= end; i++) {
        answer.push(i)
    }
    console.dir(answer)
}
range(15, 30)
const rangeOdd = (start, end) => {
    let answer = []
    let firstOdd
    if (start % 2 === 1) {firstOdd = start}
    else {firstOdd = start + 1}
    for (let i = firstOdd; i <= end; i += 2) {
        answer.push(i)
    }
    console.dir(answer)
}
rangeOdd(15, 30)
rangeOdd(2, 7)