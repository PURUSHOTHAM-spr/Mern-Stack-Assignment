//function can be stored in a variable
//a function can return another function
//a function can send as arg to another function
// function Summ(){
// let a=10;
// return function(){
//     let b=20;
//     return a+b;
// };
// }
// let result=sum()
// console.log(result())


function getsumm(b,...a){
return a.reduce((x,y)=>x+y)
}
getsumm(1,2)
getsumm(20,30,40)
getsumm(11,22)