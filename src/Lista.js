//**********************************************
// NODE - An object with a value and neighbours
//**********************************************

class Node {
    /**
     * @constructor
     * @param {object} value The value of the node
     * @param {Node} previous The previous node
     * @param {Node} next The next node
     */
    constructor(value, previous, next) {
        this.value = value;
        this.previous = previous;
        this.next = next;
    }

    //how the node is printed
    toString() { return `<v: ${this.value}>`; }
}

/**
 * @author Simao Nziaka
 * @name LISTA
 * @version 0.2.0
 * @description An implementation of a doubly linked list ADT
 */
class Lista {
    constructor() {
        this.head = new Node(null, null, null);
        this.tail = new Node(null, this.head, null);
        this.head.next = this.tail;
        this.size = 0;
        this._refs = [];
    }

    //********************
    // HELPERS
    //********************

    /**
     * _placeBetween
     * Place a node in between two nodes
     * @param {any} v The value to insert
     * @param {Node} p_ The previous node
     * @param {Node} _n The next node
     * @param {Function} cb A callback function that takes a node as an argument
     */
    _placeBetween(v, p_, _n, cb) {
        const nu = new Node(v, p_, _n);
        p_.next = nu;
        _n.previous = nu;
        //update the size
        this.size++;
        //provide a callback with the new node
        if(typeof cb === 'function') cb(nu);
    }

    /**
     * _remove
     * Erase the node in between the nodes provided
     * @param {Node} p_ The previous node
     * @param {Node} _n The next node
     * @param {Function} cb A callback function that takes a node as an argument
     * @returns The value of the deleted node
     */
    _remove(p_, _n, cb) {
        if(this.head.next === this.tail) {
            console.trace('ERR! empty list');
            throw 'ERR! empty list';
        }
        //grab the value of the node to remove
        let ret = p_.next.value;
        //a callback with the node to delete
        if(typeof cb === 'function') cb(p_.next);
        //reattach the list
        p_.next = _n;
        _n.previous = p_;
        //update the size
        this.size--;
        return ret;
    }

    //********************
    // INSERT
    //********************

    /**
     * push
     * Add a value at the end of the list
     * @param {any} v The value to insert in the list
     */
    push(v) {
        this._placeBetween(v, this.tail.previous, this.tail, node => {
            //persist the reference to this node
            this._refs[this.size - 1] = node;
        }); 
    }

    /**
     * front
     * Add a value in front of the list 
     * @param {any} v The value to insert in the list
     */
    front(v) {
        this._placeBetween(v, this.head, this.head.next, node => {
            //add this node at the beginning slot of the refs array
            this._refs = [node, ...this._refs];
        });
    }

    //********************
    // REMOVE
    //********************

    /**
     * pop
     * Removes the last value in the list
     * @returns The value removed
     */
    pop() {
        return this._remove(this.tail.previous.previous, this.tail, () => {
            //delete the ref of the node placed at the end of the array
            this._refs.splice(this._refs.length - 1);
        });
    }

    /**
     * top
     * Removes the first value in the list
     * @returns The value removed
     */
    top() {
        return this._remove(this.head, this.head.next.next, () => {
            //delete the current head
            this._refs = this._refs.splice(1);
        });
    }

    //********************
    // COPY
    //********************    

    /**
     * pull
     * pulls a tuple from the list
     * @param {number} n The arity of the tuple
     * @returns An n-arity tuple
     * @throws Index out of bounds
     * @performance O(n)
     */
    pull(n) {
        if(n > this.size)
        {
            console.trace('ERR! index out of bounds');
            throw 'ERR! index out of bounds';
        }
        
        let i = 0;
        //the tuple to return
        let ret = [];
        //start at the head
        let tmp = this.head.next;
        if(this.size !== 0) {
            while(tmp !== this.tail && i < n) {
                ret.push(tmp.value);
                //next loop
                tmp = tmp.next;
                i++;
            }
        }
        return ret;
    }

    //***************************************************
    // ARRAY OPERATIONS - attempting an O(1) performance
    // using the underlying array
    //***************************************************

    /**
     * at
     * Gets the value of the node located at the index
     * @param {number} I The location of the node in the list
     * @returns The value of the node
     * @throws Index out of bounds
     * @returns The value of the node at the index
     */
    at(I) {
        if(I > this.size)
        {
            console.trace('ERR! index out of bounds');
            throw 'ERR! index out of bounds';
        }
        return this._refs[I].value;
    }

    /**
     * place
     * Adds a value in between two others in the list
     * @param {any} v The value to add in place
     * @param {Node} I The index to place the value in
     * @throws Index out of bounds
     */
    place(v, I) {
        if(I > this.size)
        {
            console.trace('ERR! index out of bounds');
            throw 'ERR! index out of bounds';
        }

        this._placeBetween(v, this._refs[I].previous, this._refs[I], node => {
            let tmp = this._refs.splice(I);
            this._refs = [...this._refs, node, ...tmp];
        });
    }

    /**
     * replace
     * Replace a value in a specific index
     * @param {any} v The new value
     * @param {Node} I The index of the value to replace
     * @throws Index out of bounds
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
        this._placeBetween(v, this._refs[I].previous, this._refs[I].next, node => {
            this._refs[I] = node;
        });
    }

    //**********************
    // ITERATORS
    //**********************

    /**
     * Iterator
     * Works with the for_of loop and the spread operator
     * @performance O(n)
     */
    *[Symbol.iterator]() {
        //start at the head
        let tmp = this.head.next;
        if(this.size !== 0) {
            while(tmp !== this.tail) {
                yield tmp.value;
                //move to the next node
                tmp = tmp.next;
            }            
        }
    }

    //**********************
    // MAP AND FOR_EACH
    //**********************

    /**
     * map
     * Loops through the values in the list and pass them as arguments to the callback
     * @param {Function} cb A callback function
     * @returns A new list with the values altered by the callback
     */
    map(cb) {
        //start at the head
        let tmp = this.head.next;
        //the new list to return
        const nuLista = new Lista();
        if(this.size !== 0) {
            while(tmp !== this.tail) {
                nuLista.push(cb(tmp.value));
                //move to the next node
                tmp = tmp.next;
            }
        }
        return nuLista;
    }

    /**
     * forEach
     * Loops through the values in the list and pass them as arguments to the callback
     * @param {Function} cb A callback function
     */
    forEach(cb) {
        //start at the head
        let tmp = this.head.next;
        if(this.size !== 0) {
            while(tmp !== this.tail) {
                cb(tmp.value);
                //move to the next node
                tmp = tmp.next;
            }
        }
    }

    //**********************
    // TO STRING
    //**********************

    /**
     * toString
     * Prints all the values in the list separated by commas
     * @performance O(n)
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
