import express from "express";
import urlRoutes from "./routes/url";

const PORT = 3000;
const baseUrl = "http://localhost:3000";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${baseUrl}`);
  console.log(`API running on ${baseUrl}/api`);
});
