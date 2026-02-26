import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import bikeRoutes from "./routes/bikes.js";
import subscriptionRoutes from "./routes/subscriptions.js";
import { initializeDatabase } from "./db/init.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("Bike Rental API is running");
});

// Initialize database and start server
(async () => {
  try {
    console.log("🔧 Initializing database...");
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to initialize database. Server startup aborted.");
    process.exit(1);
  }
})();
