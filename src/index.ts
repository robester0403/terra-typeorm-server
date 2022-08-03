// create connection
import { DataSource } from "typeorm";
import { Post } from "./components/posts/Post";
import { Tag } from "./components/tags/Tag";
import { User } from "./components/users/User";
import express from "express";
import cors from "cors";
const usersRoutes = require("./components/users/users-routes");

// Assign express to variable
const app = express();

// Config ports
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// Data Source Config
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Breanna0403",
  database: "terra_database",
  entities: [User, Post, Tag],
  synchronize: true,
});

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data source initialized...");

    // midddleware here
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // routes here
    app.use("/api/users", usersRoutes);

    app.listen(PORT, () => {
      console.log(`Connected to Port ${PORT}...`);
      console.log("Happy Hacking");
    });
  } catch (err) {
    console.error("Error while initializing server", err); // res.status(xx)
  }
};

// run functions in order here
main();
