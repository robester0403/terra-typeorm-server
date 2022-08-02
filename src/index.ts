// create connection
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
// Connection is now DataSource

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

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Postgres");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
