
import { Schema, model } from "mongoose"

//create user schema (username,password,age)
const userSchema = new Schema({
    username:
    {
        type: String,
        required: [true, "username is required"],
        minLength: [3, "min length should be 3"],
        maxLength: [16, "max length should be 16"]
    },
    password:
    {
        type: String,
        required: [true, "password is required"],
        minLength: [3, ",in length of passsword is 3"],
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
