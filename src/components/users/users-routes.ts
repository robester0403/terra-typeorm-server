import express from "express";
// import usersController from "./users-controllers";

const router = express.Router();

router.get("/", () => {
  console.log("hello world");
});

module.exports = router;
