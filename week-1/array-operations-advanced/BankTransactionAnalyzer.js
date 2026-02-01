/*
ASSIGNMENT 5: 
-------------
Bank Transaction Analyzer
You are building a bank statement summary.
Test data:
const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];
Tasks:
    1. filter() all credit transactions
    2. map() to extract only transaction amounts
    3. reduce() to calculate final account balance
    4. find() the first debit transaction
    5. findIndex() of transaction with amount 10000
*/
let transactions = [
    { id: 1, type: "credit", amount: 5000 },
    { id: 2, type: "debit", amount: 2000 },
    { id: 3, type: "credit", amount: 10000 },
    { id: 4, type: "debit", amount: 3000 }
];
// filter() all credit transactions
let creditTransactions = transactions.filter(Obj => Obj.type === "credit");
console.log("all credit transactions:", creditTransactions);

//  map() to extract only transaction amounts
let transactionAmounts = transactions.map(Obj => Obj.amount);
console.log("transaction amounts:", transactionAmounts);

// reduce() to calculate final account balance
let finalBalance = transactions.reduce((balance, Obj) => {
    return Obj.type === "credit" ? balance + Obj.amount : balance - Obj.amount;
}, 0);
console.log("final account balance:", finalBalance);

//find() the first debit transaction
let firstDebitTransaction = transactions.find(Obj => Obj.type === "debit");
console.log("first debit transaction:", firstDebitTransaction);
// findIndex() of transaction with amount 10000
let index = transactions.findIndex(Obj => Obj.amount === 10000);
console.log("index of transaction with amount 10000:", index);