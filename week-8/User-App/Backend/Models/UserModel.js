import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "username is required"],
    minLength: [3, "min length should be 3"],
    maxLength: [16, "max length should be 16"]
  },
  email: {
    type: String,
    required: [true, "email is required"]
  },
  DOB: {
    type: Date,
    required: [true, "date of birth is required"]
  },
  mobileNumber: {
    type: Number,
    required: [true, "mobile number is required"]
  },
  isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "lax",
  },
);

const UserModel = model("user", userSchema);

export default UserModel;  