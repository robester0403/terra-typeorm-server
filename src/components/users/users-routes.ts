import express from "express";
import { check } from "express-validator";
const usersController = require("./users-controllers");
// import usersController from "./users-controllers";

const router = express.Router();

router.get("/", () => {
  console.log("hello world");
});

// get the signup route
router.post(
  "/signup",
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

module.exports = router;
