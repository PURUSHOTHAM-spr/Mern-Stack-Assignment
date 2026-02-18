import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is mandatory"],
      trim: true,
    },

    lastname: {
      type: String,
      required: [true, "Lastname is mandatory"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is mandatory"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is mandatory"],
    },

    profileImageUrl: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: {
        values: ["AUTHOR", "USER", "ADMIN"],
        message: "{VALUE} is not a valid role",
      },
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  }
);

export const UserTypeModel = model("User", userSchema);
