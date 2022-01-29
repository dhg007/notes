import LinkedList from "../linked-list/LinkedList.mjs";

const defaultHashTableSize = 32

export default class HashTable {
    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList())
        this.keys = {}
    }

    /**
   * Converts key string to hash number.
   *
   * @param {string} key
   * @return {number}
   */
    hash(key) {
        // For simplicity reasons we will just use character codes sum of all characters of the key
        // to calculate the hash.
        //
        // But you may also use more sophisticated approaches like polynomial string hash to reduce the
        // number of collisions:
        //
        // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
        //
        // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
        // PRIME is just any prime number like 31.
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => {
                return hashAccumulator + keySymbol.charCodeAt(0)
            },
            0,
        );

        // Reduce hash number so it would fit hash table size.
        let ret = hash % this.buckets.length;
        return ret
    }

    set(key, value) {
        let keyHash = this.hash(key)

        this.keys[key] = keyHash;

        const bucketLinkedList = this.buckets[keyHash];

        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

        if (!node) {
            // Insert new node.
            bucketLinkedList.append({ key, value });
        } else {
            // Update value of existing node.
            node.value.value = value;
        }
    }

    delete(key) {
        let keyHash = this.hash(key)

        delete this.keys[key];

        let bucketLinkedList = this.buckets[keyHash]

        let node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

        return node ? bucketLinkedList.delete(node.value) : null
    }

    get(key) {
        let bucketLinkedList = this.buckets[this.hash(key)]

        let node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

        return node ? node.value.value : undefined;
    }

    has(key) {
        return Object.hasOwnProperty.call(this.keys, key)
    }

    getKeys() {
        return Object.keys(this.keys)
    }

    getValues() {
        return this.buckets.reduce((values, bucket) => {
            let arr = bucket.toArray().map(node => node.value.value)
            return values.concat(arr)
        }, [])
    }
}

let ht = new HashTable()

ht.hash('abc')