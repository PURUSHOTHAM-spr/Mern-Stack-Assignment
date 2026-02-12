   /* Assignment 1: Daily Temperature Analyzer
----------------------------------------
Scenario : You are analyzing daily temperatures recorded by a weather app.

Test data:
const temperatures = [32, 35, 28, 40, 38, 30, 42];

Tasks:
    1. filter() temperatures above 35
    2. map() to convert all temperatures from Celsius → Fahrenheit
    3. reduce() to calculate average temperature
    4. find() first temperature above 40
    5. findIndex() of temperature 28
    */
    const temperatures = [32, 35, 28, 40, 38, 30, 42];
     //filter
    let result1=temperatures.filter(tempObj=>tempObj>35);
    console.log(result1);
    //map
    let results2=temperatures.map(tempObj=>{
      return  conversion=(tempObj * 1.8) + 32;
    });
    console.log(results2);
    //reduce
    let sumOfTemps = temperatures.reduce((sum, temp) => sum + temp, 0);
    let averageTemp = sumOfTemps / temperatures.length;
    console.log(averageTemp);
    //find
    let result4=temperatures.find(tempObj=> tempObj>40)
    console.log(result4)
    //findIndex of 28
    let result5=temperatures.findIndex(tempObj=>tempObj===28)
    console.log(result5)


 




