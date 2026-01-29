import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "./MiddleWare/authMiddleware.js"
import  restrictTo  from "./MiddleWare/roleMiddleware.js"
import {getAllStudents,getClassStudents,addStudent}  from './Controller/studentController.js'
import {prisma} from './config/prisma.js'


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.post("/api/register", async (req, res) => {
  // console.log("Your request ---> ",req.body)
  const { fullName, email, password, role, gender } = req.body;
  try {
    // console.log("----> Above exist")
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    const hashedPwd = await bcrypt.hash(password, 12);
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
    return res.status(500).json({ error: "Oops....Registration unsuccessful" });
  }
});

//LogIn End point logic
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  // find if the email exists
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("email doesnt exist.......");
      return res
        .status(401)
        .json({ success: false, error: "Email or Password error" });
    }
    // check the password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      console.log("Invalid password");
      return res
        .status(401)
        .json({ success: false, error: "Email or Password error" });
    }

    //Return the user email and user name,if the user is authenticated.
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign(
      {
        fullName: userWithoutPassword.fullName,
        role: userWithoutPassword.role,
      },
      process.env.JWT_SEC_KEY,
      { expiresIn: "7d" },
    );
    // console.log("Your token----> ")

    return res.status(200).json({
      message: "Login Successfull",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    // console.log("Error----->", err);
    return res.status(500).json({
      message: "Server fail.",
      error: "Internal server error",
    });
  }
});

// app.get("/api/admin/stats", verifyToken, async (req, res) => {
//   // EXTRA SECURITY: Check the role attached to the token
//   if (req.user.role !== "ADMIN") {
//     return res.status(403).json({ error: "Admin resource only!" });
//   }

//   try {
//     const studentCount = await prisma.student.count();
//     res.json({ totalStudents: studentCount });
//   } catch (err) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });


// ... other code ...

app.get("/api/admin/students/list", verifyToken,restrictTo("ADMIN"),getAllStudents)
app.post("/api/register/newStudent",verifyToken,restrictTo("ADMIN","REGISTRAL"),addStudent)


// Deleting the student from the database is the role of the admin
app.listen(PORT, () =>
  console.log(`Express Backend at http://localhost:${PORT} running.`),
);