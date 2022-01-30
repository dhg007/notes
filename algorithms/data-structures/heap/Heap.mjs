import Comparator from "../../utils/Comparator.mjs";
/**
parent(i) = floor((i - 1)/2)
left(i)   = 2i + 1
right(i)  = 2i + 2

    10
   7  2
  5 1 

[ 10, 7, 2, 5, 1 ]
  0   1  2  3  4

 */

/** */
export default class Heap {
    constructor(comparatorFn) {
        // 控制 Heap 类不能被 new， 可以使用子类 new
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }

        this.heapContainer = []
        this.compare = new Comparator(comparatorFn);
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }

    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    swap(indexOne, indexTwo) {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    heapifyUp(customStartIndex) {
        // Take the last element (last in array or the bottom left in a tree)
        // in the heap container and lift it up until it is in the correct
        // order with respect to its parent element.
        let currentIndex = customStartIndex || this.heapContainer.length - 1;

        while (
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
        ) {
            let pIndex = this.getParentIndex(currentIndex)
            this.swap(currentIndex, pIndex);
            currentIndex = pIndex;
        }
    }

    add(item) {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    }

    peek() {
        return this.heapContainer.length ? this.heapContainer[0] : null
    }

    poll() {
        if (this.heapContainer.length === 0) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];

        // Move the last element from the end to the head.
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();

        return item;
    }

    getLeftChildIndex(parentIndex) {
        return (2 * parentIndex) + 1;
    }

    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    getRightChildIndex(parentIndex) {
        return (2 * parentIndex) + 2;
    }

    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    heapifyDown(customStartIndex = 0) {
        // Compare the parent element to its children and swap parent with the appropriate
        // child (smallest child for MinHeap, largest child for MaxHeap).
        // Do the same for next children after swap.
        let currentIndex = customStartIndex;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex)
                && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex],
            )) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    find(item, comparator = this.compare) {
        const foundItemIndices = [];

        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }
        }

        return foundItemIndices;
    }

    remove(item, comparator = this.compare) {
        // Find number of items to remove.
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            // We need to find item index to remove each time after removal since
            // indices are being changed after each heapify process.
            const indexToRemove = this.find(item, comparator).pop();

            // If we need to remove last child in the heap then just remove it.
            // There is no need to heapify the heap afterwards.
            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop();
            } else {
                // Move last element in heap to the vacant (removed) position.
                this.heapContainer[indexToRemove] = this.heapContainer.pop();

                // Get parent.
                const parentItem = this.parent(indexToRemove);

                // If there is no parent or parent is in correct order with the node
                // we're going to delete then heapify down. Otherwise heapify up.
                if (
                    this.hasLeftChild(indexToRemove)
                    && (
                        !parentItem
                        || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
                    )
                ) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }

        return this;
    }

    isEmpty() {
        return !this.heapContainer.length;
    }

    toString() {
        return this.heapContainer.toString();
    }

    pairIsInCorrectOrder(firstElement, secondElement) {
        throw new Error(`
          You have to implement heap pair comparision method
          for ${firstElement} and ${secondElement} values.
        `);
    }

}

