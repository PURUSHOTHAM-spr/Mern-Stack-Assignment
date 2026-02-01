let date=new Date();
let date4=new Date(Date.now())

let date2=new Date(2020,11,25);
console.log(date4.toString());
console.log("date is",Date.now());
//Date.now() returns number of milliseconds passed since 1st Jan 1970
//IST=UTC+5:30
//javascript internally stores date in UTC timestamp format
//ISO format: YYYY-MM-DDTHH:mm:ss.sssZ
//default date is first day of month
let date3=new Date(2022,0);//0 to 11
//getFullYear() returns the year of the date
//getMonth() returns month from 0 to 11
//getDate() returns the date from 1 to 31
//getDay() returns the day from 0 to 6 starting from sunday
//getHours() returns hours from 0 to 23
//getMinutes() returns minutes from 0 to 59
//getSeconds() returns seconds from 0 to 59
//getMilliseconds() returns milliseconds from 0 to 999
//getTime() local timestamp in milliseconds
let date1=new Date('2021-1-12')
let datex=new Date('2022-12-13')
if (date1>datex){
   [date1,datex]=[datex,date1]
}
//find years next months further days
let years=datex.getFullYear()-date1.getFullYear();
let months=datex.getMonth()-date1.getMonth();
let days=datex.getDate()-date1.getDate();
if (months<0){
    years--;
    months+=12;
}
if (days<0){
    months--;
    let prevMonth=datex.getMonth()-1;
    if (prevMonth<0){
        prevMonth=11;
    }
    let daysInPrevMonth=new Date(datex.getFullYear(),prevMonth+1,0).getDate();
    days+=daysInPrevMonth;
}
console.log(years);
console.log(months);
