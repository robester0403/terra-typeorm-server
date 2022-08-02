import { User } from "./User";

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
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

  const user = User.create({
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  });

  await user.save();

  return res.json(user);
};

exports.signup = signup;
