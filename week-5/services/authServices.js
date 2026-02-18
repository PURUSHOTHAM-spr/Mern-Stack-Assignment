import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserTypeModel } from "../Models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (userObj) => {
  const userDoc = new UserTypeModel(userObj);

  await userDoc.validate();

  userDoc.password = await bcrypt.hash(userDoc.password, 10);

  const createdUser = await userDoc.save();

  const newUserObj = createdUser.toObject();
  delete newUserObj.password;

  return newUserObj;
};

export const authenticate = async ({ email, password }) => {
  const user = await UserTypeModel.findOne({ email });

  if (!user) {
    const err = new Error("User not found");
    err.status = 401;
    throw err;
  }

  if (user.isActive === false) {
    const err = new Error("your Account is blocked please contact admin");
    err.status = 403;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid password");
    err.status = 401;
    throw err;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const userObj = user.toObject();
  delete userObj.password;

  return {
    token,
    user: userObj,
  };
};
