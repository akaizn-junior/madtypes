const Lista = require('./src/Lista');

const arr = new Lista();

console.log('push');

//push values
for(let i = 1; i <= 10; i++) arr.push(i);

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

console.log('pop');

//remove from tail
arr.pop();
arr.pop();
arr.pop();

//get by index
for(let i = 0; i <= 6; i++) console.log(arr.at(i));

console.log('front');

//add to head
arr.front(99);
arr.front(79);
arr.front(69);

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

console.log('top');

//remove head
arr.top();
arr.top();
arr.top();

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

console.log('place');

//put in place
arr.place(198, 3);
arr.place(198, 3);
arr.place(198, 3);

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

console.log('replace');

//replace a value
arr.replace(1000, 1);
arr.replace(2000, 1);
arr.replace(4000, 5);

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

console.log('pull a tuple');
console.log(arr.pull(5));

console.log('for_of');

for(let val of arr) {
    console.log(val);
}

console.log('spread operator');
console.log(...arr);

console.log('for_each');

arr.forEach(val => {
    console.log(val + 1);
});

console.log('map');

let newArr = arr.map(val => {
    return val + 1;
});

console.log(newArr);
