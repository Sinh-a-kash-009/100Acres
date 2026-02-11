import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'

dotenv.config();

const app = express();
const PORT = process.env.PORT ;


app.use(clerkMiddleware())
app.use(cors(
    {
        origin: process.env.FRONTEND_URL ,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
));

app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JS Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});