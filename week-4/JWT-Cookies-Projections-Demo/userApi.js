import exp from 'express'
import { userModel } from "./models/userModel.js"
import {hash} from 'bcrypt'
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verifyToken } from './middleware/verifyToken.js'

// create a mini-express server
export const userApp = exp.Router()


// user-api routes
// To read user data from db
//create user api
userApp.get('/users', async (req, res) => {
    try {
        let users = await userModel.find()
        //send res
        res.status(200).json({ message: "users", users })
    } catch (err) {
        res.status(500).json({ message: "error fetching users", error: err.message })
    }
})

//read user by id
userApp.get('/users/:id', async (req, res) => {
    //get objid
    let objID = req.params.id;
    try {
        //find user in obj
        let userObj = await userModel.findById(objID)
        if (!userObj) {
            return res.status(404).json({ message: "user not found" })
        }
        //send res
        res.status(200).json({ message: "reading user by id", userObj })
    } catch (err) {
        res.status(500).json({ message: "error reading user", error: err.message })
    }
})


//user authentication(login) route

userApp.post('/auth',async (req,res)=>{
    //get user cred object from req
    let userCred= req.body;
    //check for the username
    let userofDB = await userModel.findOne({username:userCred.username})
    if(userofDB===null)
    {
        return res.status(404).json({message:"invalid username"})
    }
    //compare password
    let status = await compare(userCred.password,userofDB.password)
    //if password not matched
    if(status===false)
    {
        return res.status(404).json({message:"invalid password"})
    } 
    //res.json({message:"login successfull"})
    //create a signed token 
    let signedToken = jwt.sign(
        {username:userCred.username},
        'abcdef',
        {expiresIn:"30s"})
    //send token in res
    //res.status(200).json({message:"login successfull",token:signedToken})
    //save the token as httpOnly cookie
    res.cookie("token",signedToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax"     // none| lax | strict
    })
    res.status(200).json({message:"login successfull"})
});

//create user
userApp.post('/users', async (req, res) => {
    //get new user from req
    const newUser = req.body;
        //hash the password
        let hashedPassword = await hash(newUser.password,12)
        //replace with hashed password
        newUser.password = hashedPassword
        const doc = await userModel.create(newUser);
        res.status(201).json({ message: "user created successfully", payload: doc });
    
    
})

//update user by id
userApp.put('/users/:id', async (req, res) => {
    //get obj id from paramaeter
    let objID = req.params.id;
    //get modified user from req
    let modifiedUser = req.body;
    try {
        //make update
        let latestUser = await userModel.findByIdAndUpdate(objID, modifiedUser, { new: true })
        if (!latestUser) {
            return res.status(404).json({ message: "user not found" })
        }
        //send res
        res.status(200).json({ message: "user modified successfully", latestUser })
    } catch (err) {
        res.status(500).json({ message: "error modifying user", error: err.message })
    }
})


//delete user 
userApp.delete('/users/:id', async (req, res) => {
    //get obj id from paramaeter
    let objID = req.params.id;
    try {
        //delete user by id
        let deletedUser = await userModel.findByIdAndDelete(objID)
        if (!deletedUser) {
            return res.status(404).json({ message: "user not found" })
        }
        //send res
        res.status(200).json({ message: "user deleted successfully", payload: deletedUser })
    } catch (err) {
        res.status(500).json({ message: "error deleting user", error: err.message })
    }
});


//test route (protected route)
userApp.get("/test", verifyToken, (req, res) => {
    res.json({message: "test route", decodedToken: req.user});
});