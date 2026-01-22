// server.js
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// THE REGISTRATION ENDPOINT
app.post('/api/register', async (req, res) => {
  const { fullName, email, password, role, gender } = req.body;

  try {
    // 1. Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    // 2. Hash Password (Bcrypt v6)
    const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds for extra security

    // 3. ATOMIC TRANSACTION: Create User and Profile together
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          role,
          gender,
          // Nested creation based on role
          ...(role === "STUDENT" 
            ? { student: { create: { gender } } } 
            : { teacher: { create: { gender } } }
          ),
        },
      });
      return user;
    });

    res.status(201).json({ message: "Registration successful!", userId: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed on server." });
  }
});

app.listen(5000, () => console.log('🚀 Express Backend: http://localhost:5000'));