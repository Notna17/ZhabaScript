const data = ["Jack of Clubs", 10, "10", true, false, -0.1, 7n, "King of Hearts", false, "8", -8, [7, "7"]]
const sort = (list) => {
    if (typeof list !== "object") { throw "Невірний тип данних"}
    let count = {number: 0, string: 0, boolean: 0, object: 0, bigint: 0}
    for (value of list) {
        let t = typeof value
        if (t === "string") ++count.string
        if (t === "number") ++count.number
        if (t === "boolean") ++count.boolean
        if (t === "object") ++count.object
        if (t === "bigint") ++count.bigint
    }
    return count
}

console.dir(sort(data))
