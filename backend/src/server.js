import express from "express";
import { PORT } from "./config/serverConfig.js";
import jobRoutes from "./routers/jobRoutes.js";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  console.log(req.user);
  return res.json({ message: "pong" });
});

app.use("/api", jobRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
