
import { Schema, model } from "mongoose"

//create user schema (username,password,age)
const userSchema = new Schema({
    username:
    {
        type: String,
        required: [true, "username is required"],
        minLength: [4, "min length should be 4"],
        maxLength: [6, "max length should be 6"]
    },
    password:
    {
        type: String,
        required: [true, "password is required"],
        minLength: [6, ",in length of passsword is 6"],
        maxLength: [12, "max length of password is 12"]
    },
    age:
    {
        type: Number,
        required: [true, "age is required"],
        min: [18, "min age is 18"],
        max: [60, "max age is 60"]
    }
})

//create user model with that schema
export const userModel = model("user", userSchema)