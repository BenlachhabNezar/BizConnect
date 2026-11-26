import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
//route 
app.use("/api/auth", authRoutes);
//company route
app.use("/api/companies", companyRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to BizConnect API!");
});

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`BizConnect server running on port ${PORT}`);
  });
};

startServer();