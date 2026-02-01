let futurevaliable = false;
let PromiseObj = new Promise((fullfil,rejected) => {
    setTimeout(() => {
       if (futurevaliable==true) {
        fullfil("Promise is fullfilled: getting bike");
       } else {
        rejected("Promise is rejected:move on");
       }
    }, 5000);
});

//consuming the promise object
PromiseObj
.then((message) => {
    console.log("This is in the then " + message);
})
.catch((message) => {
    console.log("This is in the catch " + message);
});

//consuming the promise object using async await
// async function consumePromise() {
//     try {
//         let message = await PromiseObj;
//         console.log("This is in the try " + message);
//     } catch (message) {
//         console.log("This is in the catch " + message);
//     }
// }
//consumePromise();
