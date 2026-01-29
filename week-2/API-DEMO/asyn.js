//three members ordered food
//person-1 ordered biryani
//person-2 ordered rice
//person-3 ordered bottle
console.log("Asynchronous JavaScript: Introduction");
// non blocking synchronous code
console.log("person1 ordered biryani"); 
// blocking asynchronous code
setTimeout(() =>{console.log("person1 received biryani");}, 5000) 

// non blocking synchronous code
console.log("person2 ordered pizza"); 
// blocking asynchronous code
setTimeout(() =>{console.log("person2 received pizza");}, 2000) 
// non blocking synchronous code
console.log("person3 ordered pasta");
// blocking asynchronous code
setTimeout(() =>{console.log("person3 received pasta");}, 3000)
console.log("helloo");
