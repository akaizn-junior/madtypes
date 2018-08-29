//***********************
// NODE - A list's node
//***********************

class Node {
    /**
     * @constructor
     * @param {object} value The value of the node
     * @param {Node} previous The previous node
     * @param {Node} next The next node
     */
    constructor(value, index, previous, next) {
        this.value = value;
        this.previous = previous;
        this.next = next;
        this.index = index;
    }

    //how the node is printed
    toString() { return `(v: ${this.value})`; }
}

/**
 * @author Simao Nziaka
 * @name LISTA
 * @version 0.1.0
 * @description An implementation of a doubly linked list ADT
 */
class Lista {
    constructor() {
        this.head = new Node(null, 0, null, null);
        this.tail = new Node(null, 0, this.head, null);
        this.head.next = this.tail;
        this.size = 0;
        this._refs = [];
    }

    /**
     * _placeBetween
     * Place a node in between two nodes
     * @param {any} v The value to insert
     * @param {Node} p_ The previous node
     * @param {Node} _n The next node
     */
    _placeBetween(v, p_, _n) {
        const nu = new Node(v, this.size, p_, _n);
        p_.next = nu;
        _n.previous = nu;
        //update the size
        this.size++;
        //persist the reference to this node
        this._refs[nu.index] = nu;
    }

    /**
     * _remove
     * Erase the node in between the nodes provided
     * @param {Node} p_ The previous node
     * @param {Node} _n The next node
     */
    _remove(p_, _n) {
        if(this.head.next === this.tail) {
            console.trace('ERR! empty list');
            throw 'ERR! empty list';
        }
        //delete also the ref for this node
        delete this.refs[p_.next.index];

        let ret = p_.next.value;
        console.log(p_.next.index);
        p_.next = _n;
        _n.previous = p_;
        //update the size
        this.size--;
        //return the value of the deleted node
        return ret;
    }

    /**
     * push
     * Add a value at the end of the list
     * @param {any} v The value to insert in the list
     */
    push(v) { this._placeBetween(v, this.tail.previous, this.tail); }

    /**
     * front
     * Add a value in front of the list 
     * @param {any} v The value to insert in the list
     */
    front(v) { this._placeBetween(v, this.head, this.head.next); }
    
    /**
     * pop
     * Removes the last value in the list
     * @returns The value removed
     */
    pop() { return this._remove(this.tail.previous.previous, this.tail); }

    /**
     * top
     * Removes the first value in the list
     * @returns The value removed
     */
    top() { return this._remove(this.head, this.head.next.next); }

    /**
     * place
     * Adds a value in between two others in the list
     * @param {any} v The value to add in place
     * @param {Node} I The index to place the value in.
     */
    place(v, I) {
        if(I > this.size)
        {
            console.trace('ERR! index out of bounds');
            throw 'ERR! index out of bounds';
        }
        this._placeBetween(v, this._refs[I].previous, this._refs[I]);
    }

    /**
     * replace
     * Replace a value in a specific index
     * @param {any} v The new value
     * @param {Node} I The index of the value to replace
     */
    replace(v, I) {
        if(I > this.size)
        {
            console.trace('ERR! index out of bounds');
            throw 'ERR! index out of bounds';
        }
        //remove current node
        this._remove(this._refs[I].previous, this._refs[I].next);
        //add new node in place
        this._placeBetween(v, this._refs[I].previous, this._refs[I].next);        
    }

    /**
     * _
     * Gets the value of the node located at the index
     * @param {number} I The location of the node in the list
     * @returns The value of the node
     */
    _(I) {
        if(I > this.size)
        {
            console.trace('ERR! index out of bounds');
            throw 'ERR! index out of bounds';
        }
        return this._refs[I].value;
    }

    /**
     * toString
     * Prints all the values in the list separated by commas
     */
    toString() {
        let res = ''
        let tmp = this.head.next;
        if(this.size !== 0) {
            while(tmp !== this.tail) {
                res += `,${tmp.value.toString()}`;
                tmp = tmp.next;
            }
            return res.slice(1).trim();
        }
        res;
    }
}

module.exports = Lista;
