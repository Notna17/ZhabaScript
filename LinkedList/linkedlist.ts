class _Node<T> {
    constructor(public left: _Node<T> | null, public right: _Node<T> | null, public readonly value: T, public index: number) {
    }
}
const first = new _Node(null, null, "first", 0)
const second = new _Node(first, null, "second", 1)
first.right = second
class LinkedList<T> {
    private firstNode: _Node<T> | null
    private lastNode: _Node<T> | null
    constructor (firstNode: _Node<T> | null, lastNode: _Node<T> | null) {}
    first() {return this.firstNode?.value}
    last() {return this.lastNode?.value}
    at(n: number) {
        let a = this.firstNode
        if (a === null) {return undefined}
        while (a.index !== n) {
            if (a.right === null) {return undefined}
            a = a.right
        }
        return a.value
    }
    find(check: (data: T) => boolean) {
        if (this.firstNode === null) {return undefined}
        let a = this.firstNode
        while (true) {
            if (check(a.value)) {
            return a.value
            }
            if (a.right === null) {return undefined}
            a = a.right    
    }}
    addFirst(data: T) {
        const newNode = new _Node(null, this.firstNode, data, 0)
        if (this.firstNode === null) {
            this.firstNode = newNode
            this.lastNode = newNode
            return
        }
        let a = this.firstNode
        while (true) {
            a.index += 1
            if (a.right === null) {break}
            a = a.right
        }
        this.firstNode = newNode
    }
    addLast(data: T) {
        let newNode = new _Node(this.lastNode, null, data, 0)
        if (this.lastNode === null) {
            this.firstNode = newNode
            this.lastNode = newNode
            return
        }
        let i = this.lastNode.index
        newNode.index = i + 1
        this.lastNode = newNode
    }
    insert(n: number, ...array: Array<T>) {
        if (array.length === 0) {return}
        let a = this.firstNode
        if (a === null) {
            if (n === 0) {
                this.firstNode = new _Node(null, null, array[0], 0)
                let b = this.firstNode
                let c
                for (let i = 1; i < array.length; i++) {
                    c = new _Node(b, null, array[i], i)
                    b.right = c
                    b = c
                }
                this.lastNode = b
            }
            return
        }
        if (this.lastNode !== null && n === this.lastNode?.index + 1) {
            for (const el of array) {
                this.addLast(el)
            }
            return
        }
        while (true) {
            if (a.index === n) {
                let l = a.left
                let b = new _Node(l, null, array[0], n)
                if (l !== null) {l.right = b}
                let c
                for (let i = n + 1; i < n + array.length; i++) {
                    c = new _Node(b, null, array[i - n], i)
                    b.right = c
                    b = c
                }
                b.right = a
                a.left = b
                while (true) {
                    a.index += array.length
                    if (a.right === null) {return}
                    a = a.right
                }
            }
            if (a.right === null) {return}
            a = a.right
        }
    }
    size() {
        if (this.lastNode === null) {return 0}
        return this.lastNode.index + 1
    }
    clear() {
        this.firstNode = null
        this.lastNode = null
    }
    clone() {
        const clone = new LinkedList(this.firstNode, this.lastNode)
        return clone
    }
    toArray() {
        let array: Array<T> = []
        let a = this.firstNode
        if (a === null) {return array}
        while (a !== null) {
            array.push(a.value)
            a = a.right
        }
        return array
    }
    change(n: number, data: T) {
        let a = this.firstNode
        if (a === null) {return}
        while (a.index !== n) {
            if (a.right === null) {return}
            a = a.right
        }
        let replace = new _Node(a.left, a.right, data, a.index)
        if (a.left !== null) {a.left.right = replace}
        if (a.right !== null) {a.right.left = replace}
    }
    remove(data: T) {
        if (this.firstNode === null) {return}
        let a = this.firstNode
        while (true) {
            if (a.value === data) {
                if (a.left !== null) {a.left.right = a.right}
                if (a.right !== null) {
                    a.right.left = a.left
                    let b = a.right
                    while (true) {
                        b.index += 1
                        if (b.right === null) {return}
                        b = b.right
                    }
                }
                return
            }
            if (a.right === null) {return}
            a = a.right
    }}
    removeAt(n: number) {
        if (this.firstNode === null) {return}
        let a = this.firstNode
        while (true) {
            if (a.index === n) {
                if (a.left !== null) {a.left.right = a.right}
                if (a.right !== null) {
                    a.right.left = a.left
                    let b = a.right
                    while (true) {
                        b.index += 1
                        if (b.right === null) {return}
                        b = b.right
                    }
                }
                return
            }
            if (a.right === null) {return}
            a = a.right
        }
    }
    removeFirst() {this.removeAt(0)}
    removeLast() {this.removeAt(this.size() - 1)}
}
