import Comparator from "../../utils/Comparator.mjs";
import LinkedListNode from "./LinkedListNode.mjs";
/**

list = new LinkedList()
list.append(1).append(2).append(3).append(4).append(5).append(6).append(7)

 */
class LinkedList {
  constructor(comparatorFn) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparator(comparatorFn);
  }

  

  prepend(value) {
    let newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    let newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let cur = this.head;

    while (cur.next) {
      if (cur.next !== deletedTail) {
        cur = cur.next;
      } else {
        cur.next = null;
        this.tail = cur;
      }
    }
    return deletedTail;
  }

  deleteHead() {
    const deletedHead = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedHead;
    }

    this.head = this.head.next;

    return deletedHead;
  }

  fromArray(values) {
    values.forEach((v) => this.append(v));
    return this;
  }

  toArray() {
    let cur = this.head;
    let ret = [];
    while (cur) {
      ret.push(cur);
      cur = cur.next;
    }

    return ret;
  }

  toString(cb) {
    return this.toArray()
      .map((node) => node.toString(cb))
      .toString();
  }

  reverse(){
    let cur = this.head
    let pre = null
    let next

    while (cur) {
      next = cur.next
      cur.next = pre
      pre = cur
      cur= next
    }
    
    this.tail = this.head
    this.head = pre
    
    return this
  }
}

let list = new LinkedList();
list.append(1).append(2).append(3);
list.reverse();
