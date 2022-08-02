// create connection
import { DataSource } from "typeorm";
import { Post } from "./components/posts/Post";
import { Tag } from "./components/tags/Tag";
import { User } from "./components/users/User";
import express from "express";
import cors from "cors";
const usersRoutes = require("./components/users/users-routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

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

    //setup needed middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // use routes here
    app.use("/api/users", usersRoutes);

    app.listen(PORT, () => {
      console.log(`Connected to Port ${PORT}...`);
      console.log("Happy Hacking");
    });
  } catch (err) {
    console.log(err); // res.status(xx)
  }
  // AppDataSource.initialize()
  //   .then(() => {
  //     console.log("Connected to Postgres");
  //   })
  //   .catch((err) => {
  //     console.error("Error during Data Source initialization", err);
  //   });
};

main();
