import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const app = express();
const { PrismaClient } = pkg;
const prisma = new PrismaClient({ adapter });
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post("/api/register", async (req, res) => {
  // console.log("Your request ---> ",req.body)
  const { fullName, email, password, role, gender } = req.body;
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    const hashedPwd = await bcrypt.hash(password, 12);
    // if(hashedPwd){console.log("Hashed Password--> ",hashedPwd)}
    //Now create a user and profile
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          email,
          password: hashedPwd,
          role,
          gender,
          ...(role === "STUDENT"
            ? { student: { create: { gender } } }
            : { teacher: { create: { gender } } }),
        },
      });
      return user;
    });
    res
      .status(201)
      .json({ message: "Registration Successfull", userId: result.id });
  } catch (err) {
    console.log("Error---> ", err);
    return res.status(500).json({ error: "Registration unsuccessful" });
  }
});

app.listen(PORT, () =>
  console.log(`Express Backend at http://localhost:${PORT} running.`),
);
