const Lista = require('./src/Lista');

const arr = new Lista();
//push values
for(let i = 1; i <= 10; i++) arr.push(i);

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

//remove from tail
arr.pop();
arr.pop();
arr.pop();

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

//get by index
console.log(arr._(4));

//add to head
arr.front(99);
arr.front(79);
arr.front(69);

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

//remove head
arr.top();

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

//put in place
arr.place(198, 3);
arr.place(198, 3);
arr.place(198, 3);

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);

//replace a value
arr.replace(2034, 1);
arr.replace(2034, 1);
arr.replace(434, 5);

//the list @this point
console.log(arr.toString() + ' - size:'+ arr.size);
