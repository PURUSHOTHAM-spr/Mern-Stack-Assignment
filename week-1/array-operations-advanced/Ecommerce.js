/*ASSIGNMENT 1:
-------------
You are building a shopping cart summary for an e-commerce website.

Test Data : 
const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

Tasks:
    1. Use filter() to get only inStock products
    2. Use map() to create a new array with:  { name, totalPrice }
    3. Use reduce() to calculate grand total cart value
    4. Use find() to get details of "Mouse"
    5. Use findIndex() to find the position of "Keyboard"
    */
   const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];
result1=cart.filter(cartObj=>{
   return cartObj.inStock===true
})
console.log(result1)
//2. Use map() to create a new array with:  { name, totalPrice }
result2=cart.map(cartObj=>({name:cartObj.name,totalPrice:cartObj.price*cartObj.quantity}))
console.log(result2)
//3. Use reduce() to calculate grand total cart value
result3=cart.reduce((sum,cartObj)=>{
    return sum+(cartObj.price*cartObj.quantity)
},0)
console.log(result3)
 //4. Use find() to get details of "Mouse"
result4=cart.find(cartObj=>cartObj.name==="Mouse")
console.log(result4)
//5. Use findIndex() to find the position of "Keyboard"
result5=cart.findIndex(cartObj=>cartObj.name==="Keyboard")
console.log(result5)




    



