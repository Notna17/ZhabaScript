const data = ["Jack of Clubs", 10, "10", true, false, -0.1, 7n, "King of Hearts", false, "8", -8, [7, "7"]]
const sort = (list) => {
    if (typeof list !== "object") { throw "Невірний тип данних"}
    let count = {number: 0, string: 0, boolean: 0, object: 0, bigint: 0}
    for (value of list) {
        let t = typeof value
        switch(t) {
            case 'number': ++count.number;
                break;
            case 'boolean': ++count.boolean;
                break;
            case 'object': ++count.object;
                break;
            case 'string': ++count.string;
                break;
            case 'bigint': ++count.bigint;
    }
    return count
}

console.dir(sort(data))
