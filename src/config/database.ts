import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  models: [__dirname + "/../models"],
  logging: false,
});

sequelize
  .sync()
  .then(() => {
    console.log("DB is synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

export default sequelize;
