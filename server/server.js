// ─────────────────────────────────────────────────────────────
// Express entry point.
//
// Right now this server works, but its data lives on an in-memory array
// (see routes/threads.js) and vanishes on every restart.
//
// YOUR TASK: connect Prisma + PostgreSQL. Follow the TODOs below.
// You should NOT need to change routes/threads.js or anything in client/.
// ─────────────────────────────────────────────────────────────
import "dotenv/config";
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";

// TODO 1: import the PrismaClient singleton
import prisma from "./prisma/client.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = 3001;

// TODO 2: connect to database first, then start server
async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ Prisma connected");

    app.listen(PORT, () => {
      console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Prisma connection failed:", error);
    process.exit(1);
  }
}

startServer();