import LinkedList from '../linked-list/LinkedList.mjs'

export default class Queue {
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

    enqueue(value) {
        this.linkedList.append(value)
    }

    dequeue() {
        let node = this.linkedList.deleteHead()
        return node ? node.value : null
    }

    toString(callback) {
        return this.linkedList.toString(callback)
    }


}