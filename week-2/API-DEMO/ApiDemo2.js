//API
//javascript object notation
let student = {
    "sno": 101,
    "name": "John",
    "age": 22,
    
};
console.log(student)


//js object to json
let studentJson=JSON.stringify(student);
console.log(studentJson);
console.log(typeof studentJson);//string

//json to js object
let data=JSON.parse(studentJson);

console.log(data)
console.log(typeof data)
