import {} from "typeorm";
import { User } from "./User";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
const HttpError = require("../utils/http-error");
import jwt from "jsonwebtoken";

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

  // let token;
  // try {
  //   token = jwt.sign(
  //     {
  //       firstName: newUser.first_name,
  //       lastName: newUser.last_name,
  //       email: newUser.email,
  //     },
  //     "supersecret_dont_share",
  //     { expiresIn: "1h" }
  //   );
  // } catch (err) {
  //   const error = new HttpError(
  //     "Logging in failed, please try again later.",
  //     500
  //   );
  //   return next(error);
  // }
  // Might remove this section
  res.status(201).json({
    // userId: newUser.id,
    firstName: newUser.first_name,
    lastName: newUser.last_name,
    email: newUser.email,
    // token: token,
  });
};

const login = async (req: any, res: any, next: (arg0: any) => any) => {
  interface loginParams {
    email: string;
    password: string;
  }
  const { email, password }: loginParams = req.body;

  let existingUser;
  try {
    existingUser = await User.findOneBy({
      email: email,
    });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    console.log("not found");
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid password, could not log in", 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        firstName: existingUser.first_name,
        lastName: existingUser.last_name,
        email: existingUser.email,
      },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    userId: existingUser.id,
    firstName: existingUser.first_name,
    lastName: existingUser.last_name,
    email: existingUser.email,
    token: token,
  });
};

exports.signup = signup;
exports.login = login;
