//sum-но
const sum1 = (...arg) => {
    let answer = 0
    for (let i = 0; i < arg.length; i++) {
        answer += arg[i]
    }
    console.log(answer)
}

const sum2 = (...arg) => {
    let answer = 0
    for (const i of arg) {
        answer += i
    }
    console.log(answer)
}

const sum3 = (...arg) => {
    let answer = 0
    let i = 0
    while (i < arg.length) {
        answer += arg[i]
        ++i
    }
    console.log(answer)
}

const sum4 = (...arg) => {
    let answer = 0
    let i = 0
    if (arg.length === 0) {
        console.log(0)
        return
    }
    do {
        answer += arg[i]
        ++i
    } while (i < arg.length);
    console.log(answer)
}

const sum5 = (...arg) => {
    let answer = 0
    if (arg.length === 0) {
        console.log(0)
        return
    }
    answer = arg.reduce((x, element) => x+element)
    console.log(answer)
}

sum1(1, 2, 3)
sum2(-4, 4)
sum3(8, -2, 0, 4)
sum4(2)
sum5(6,8,5)