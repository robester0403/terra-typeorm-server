// create connection
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
// Connection is now DataSource

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "terra_database",
  entities: [User, Post],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Postgres");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
