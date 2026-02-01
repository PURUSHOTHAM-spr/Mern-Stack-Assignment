// Assignment 3: Student Marks List
// --------------------------------
// Scenario : You receive marks from an exam system.

// Test data:
// const marks = [78, 92, 35, 88, 40, 67];

// Tasks:
//     1. filter() marks ≥ 40 (pass marks)
//     2. map() to add 5 grace marks to each student
//     3. reduce() to find highest mark
//     4. find() first mark below 40
//     5. findIndex() of mark 92
const marks = [78, 92, 35, 88, 40, 67];
result1=marks.filter(marObj=>marObj>=40)
console.log(result1)
result2=marks.map(marObj=>marObj+5)
console.log(result2)
result3=marks.reduce((acc,ele)=>acc>ele?acc:ele,Number.MIN_VALUE)
console.log(result3)
result4=marks.find(marObj=>marObj>40)
console.log(result4)
result5=marks.findIndex(marObj=>marObj===92)
console.log(result5)