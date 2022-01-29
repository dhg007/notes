import Comparator from "../../utils/Comparator.mjs";
import DoublyLinkedListNode from "./DoublyLinkedListNode.mjs";

class DoublyLinkedList {
  constructor(comparatorFn) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFn);
  }

  prepend(value) {
    let node = new DoublyLinkedListNode(value, this.head);

    if (this.head) {
      this.head.previous = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return this;
  }

  append(value) {
    let node = new DoublyLinkedListNode(value, null, this.tail);

    if (this.tail) {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    return this;
  }

  delete(value) {
    if (!this.head) return null;

    let deletedNode = null;

    if (this.head === this.tail && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.tail = null;
      return deletedNode;
    }

    let cur = this.head;
    while (cur) {
      if (this.compare.equal(cur.value, value)) {
        deletedNode = cur;
        let p = cur.previous;
        let n = cur.next;
        if (deletedNode === this.head) {
          this.head = n;
          this.head.previous = null;
        } else if (deletedNode === this.tail) {
          this.tail = p;
          this.tail.next = null;
        } else {
          p.next = n;
          n.previous = p;
        }
      }
      cur = cur.next;
    }

    return deletedNode;
  }

  find({ value, callback: cb } = {}) {
    if (!this.head) return null;

    let cur = this.head;
    while (cur) {
      if (cb && cb(cur.value)) {
        return cur;
      }

      if (this.compare.equal(cur.value, value)) {
        return cur;
      }

      cur = cur.next;
    }

    return null;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }

    let deletedNode = this.tail;

    if (this.tail.previous) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    } else {
      this.head = this.tail = null;
    }

    return deletedNode;
  }

  deleteHead() {
    let deletedNode = null;
    if (this.tail === this.head) {
      deletedNode = this.tail;
      this.tail = this.head = null;
      return deletedNode;
    }

    deletedNode = this.head;
    this.head = this.head.next;
    this.head.previous = null;
    return deletedNode;
  }

  toArray() {
    let ret = [];

    let cur = this.head;
    while (cur) {
      ret.push(cur);
      cur = cur.next;
    }

    return ret;
  }

  fromArray(values) {
    values.forEach((v) => this.append(v));
    return this;
  }

  toString(cb) {
    return this.toArray()
      .map((node) => node.toString(cb))
      .toString();
  }

  reverse() {
    let cur = this.head;
    let pre = null;
    let next = null;

    while (cur) {
      next = cur.next;
      pre = cur.previous;

      cur.next = pre;
      cur.previous = next;

      pre = cur;
      cur = next;
    }

    this.tail = this.head;
    this.head = pre;

    return this;
  }
}

let list = new DoublyLinkedList();
list
  .append({ value: 1, key: "test1" })
  .append({ value: 2, key: "test2" })
  .append({ value: 3, key: "test3" });
const node = list.find({ callback: (value) => value.key === "test2" });
