import express from "express";
import urlRoutes from "./routes/url";
import "./config/database";

const baseUrl = "http://localhost:3000";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", urlRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${baseUrl}`);
});
