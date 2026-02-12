    /*Assignment 2: Online Course Name Processor
------------------------------------------
Scenario : You are preparing a course list for display on a website.
Test data:
const courses = ["javascript", "react", "node", "mongodb", "express"];
Tasks:
    1. filter() courses with name length > 5
    2. map() to convert course names to uppercase
    3. reduce() to generate a single string:
              "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"

    4. find() the course "react"
    5. findIndex() of "node"*/
const courses = ["javascript", "react", "node", "mongodb", "express"];
result1=courses.filter(courObj=>courObj.length>5)
console.log(result1)
result2=courses.map(courObj=>courObj.toUpperCase())
console.log(result2)
result3=courses.reduce(courObj=>courObj)
console.log(result3)
result4=courses.find(courObj=>courObj==='react')
console.log(result4)
result5=courses.findIndex(courObj=>courObj==='node')
console.log(result5)