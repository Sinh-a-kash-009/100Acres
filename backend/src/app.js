import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Middleware
app.use(express.json());
app.use(clerkMiddleware())
app.use(cors(
    {
        origin: process.env.FRONTEND_URL ,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
));

// Routes
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JS Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)
  console.log(user);

  return res.json({ user })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});