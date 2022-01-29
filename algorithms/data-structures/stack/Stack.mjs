import LinkedList from "../linked-list/LinkedList.mjs";

export default class Stack {
    constructor() {
        this.linkedList = new LinkedList()
    }


    isEmpty() {
        return !this.linkedList.head
    }

    peek() {
        if (this.isEmpty()) {
            return null
        }

        return this.linkedList.head.value
    }

    push(value) {
        this.linkedList.prepend(value)
    }

    pop() {
        let node = this.linkedList.deleteHead()
        return node ? node.value : null
    }

    toArray() {
        return this.linkedList.toArray().map(n => n.value)
    }

    toString(callback) {
        return this.linkedList.toString(callback)
    }

}