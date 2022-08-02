import { User } from "./User";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
const HttpError = require("../utils/http-error");

const signup = async (req: any, res: any, next: (arg0: any) => any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Data with invalid inputs has been passed. Please try with valid inputs",
        422
      )
    );
  }

  interface SignupEntry {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  const { email, firstName, lastName, password }: SignupEntry = req.body;

  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const newUser = User.create({
    first_name: firstName,
    last_name: lastName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json(newUser);
  // need to do JWT token after
};

exports.signup = signup;
