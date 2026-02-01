import exp from "express";
// create a mini-express app
export const userApp = exp.Router();


// test local in-memory data
let users=[];

// create api(req handlers)
// GET req handler
userApp.get('/users',(req,res) => {
    // send users data in res 
    // send message and payload in res
    res.status(200).json({message:"all users",payload:users}); 
})

// POST req handler
userApp.post('/users',(req,res) => {
    // get user resource from the req
    let newUser = req.body;
    // console.log(newUser);
    // insert newUser into users array
    users.push(newUser)
    res.status(201).json({message:"User created"});
})

// PUT req handler
userApp.put('/users',(req,res) => {
    // get modified user from req
    // find if user exists with id 
    // if user not found return user not found else modify the user and send res as user modified
    let updatedUser = req.body;
    // let reqUser = users.map((user) => user.id === updatedUser.id ? Object.assign(user,updatedUser) : user);
    let reqUserIdx = users.findIndex((user) => user.id === updatedUser.id);
    if(reqUserIdx==-1){
        return res.status(404).json({message:"User not found"});
    }
    let newUser = users.splice(reqUserIdx,1,updatedUser)
    res.status(200).json({message:"User modified"});
})

// read user by id
userApp.get("/users/:id",(req,res) => {
    // read parameters from url
    let id = Number(req.params.id);
    let reqUser = users.find((user) => user.id === id)
    reqUser ? res.json({message:"User found",payload:reqUser}) : res.status(404).json({message:"user not found"});
})

// DELETE req handler
userApp.delete('/users/:id',(req,res) => {
    let id = Number(req.params.id);
    let reqUserIdx = users.findIndex(user => user.id === id);
    if(reqUserIdx!=-1){
    let deletedObj = users.splice(reqUserIdx,1)
    res.json({message:"user deleted",deletedObj,payload:users});
    }else{
        res.status(404).json({message:"user not found"});
    }
})