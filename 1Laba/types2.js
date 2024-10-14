const sort = (list) => {
    if (typeof list !== "object") { throw "Невірний тип данних"}
    let count = {}
    for (value of list) {
        let t = typeof value
        if (!count[t]) {count[t] = 1}
        else count[t] += 1
    } 
    return count
}
const data = ["Jack of Clubs", 10, "10", true, false, -0.1, 7n, "King of Hearts", false, "8", -8, [7, "7"], NaN, sort]
console.dir(sort(data))
